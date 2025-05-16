// **Author--- Reshab Kumar Pandey
// Component--- Track.js

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import StepIndicator from '../../component/StepIndicator';
import {oauthApi} from '../../services/api/oauthToken';
import {INTOUCH_URL, GET_DEVICES} from '../../config/api-config';
import UpcomingApi from '../../services/api/upcoming';
import CustomHeader from '../../component/CustomHeader';
import {setCoords} from '../../Redux/slice/CoordsSlice';

const {width, height} = Dimensions.get('window');

const Track = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {index, pageName, status, feedback_arr, item, eloc} =
    props?.route?.params;
  console.log(item.eloc, '123');

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  const fetchUpcomingBookings = useCallback(async () => {
    setLoading(true);
    try {
      const bookingType = pageName === 'HIS' ? 'history' : 'upcoming';
      const fetchedBookings = await UpcomingApi(bookingType, 1, 100);
      setBookings(fetchedBookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      Alert.alert('Error', 'Failed to fetch bookings.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [pageName]);

  const fetchOAuthToken = useCallback(async () => {
    try {
      const tokenResponse = await oauthApi();
      if (tokenResponse?.data?.access_token) {
        setAccessToken(tokenResponse.data.access_token);
      } else {
        Alert.alert(
          'Authentication Error',
          'Unable to authenticate. Please try again.',
        );
        return null;
      }
      return tokenResponse.data.access_token;
    } catch (err) {
      console.error('Error fetching OAuth token:', err);
      Alert.alert('Authentication Error', 'Failed to authenticate.');
      return null;
    }
  }, []);

  const fetchLocationData = useCallback(
    async (deviceId, token) => {
      try {
        const headers = {Accept: '*/*', Authorization: `Bearer ${token}`};

        // ⏱ Time range: last 24 hours
        const now = Date.now();
        const oneDayAgo = now - 24 * 60 * 60 * 1000;
        const startTime = Math.floor(oneDayAgo / 1000);
        const endTime = Math.floor(now / 1000);

        console.log(
          `📡 Fetching location data from ${new Date(
            oneDayAgo,
          ).toLocaleString()} to ${new Date(now).toLocaleString()}`,
        );

        const response = await fetch(
          `${INTOUCH_URL}${GET_DEVICES}/${deviceId}/events?startTime=${startTime}&endTime=${endTime}`,
          {method: 'GET', headers},
        );

        const res = await response.json();
        console.log('📦 API Response:', JSON.stringify(res?.data));

        if (res?.error === 'Daily Limit Expired') {
          Alert.alert('Alert!', 'Daily Limit Expired', [
            {text: 'OK', onPress: () => navigation.navigate('Upcoming')},
          ]);
          return;
        }

        const positionList = Array.isArray(res?.data?.positionList)
          ? res.data.positionList
          : [];
        console.log(` Found ${positionList.length} positions`);

        positionList.forEach((pos, i) => {
          console.log(
            `  → Position ${i}: lat=${pos.latitude}, lng=${
              pos.longitude
            }, time=${new Date(pos.timestamp * 1000).toLocaleString()}`,
          );
        });

        const validPosition = positionList.find(
          pos =>
            typeof pos.latitude === 'number' &&
            typeof pos.longitude === 'number' &&
            pos.latitude !== 0 &&
            pos.longitude !== 0,
        );

        if (validPosition) {
          console.log(
            `Using valid position: Lat ${validPosition.latitude}, Long ${validPosition.longitude}`,
          );

          dispatch(
            setCoords({
              coords: [validPosition.latitude, validPosition.longitude],
            }),
          );

          navigation.navigate('Location', {
            item,
            dataTrackChiffer: deviceData,
            access_token: token,
            showResult: res.data,
            index,
            eloc,
          });
          return;
        }

        console.warn(
          ' Position data exists but all coordinates are invalid or zero.',
        );

        const fallbackLocation = deviceData?.location;
        console.log(
          ' Checking fallback deviceData.location:',
          fallbackLocation,
        );

        if (
          fallbackLocation?.latitude &&
          fallbackLocation?.longitude &&
          fallbackLocation.latitude !== 0 &&
          fallbackLocation.longitude !== 0
        ) {
          console.log(
            `Using fallback device location: Lat ${fallbackLocation.latitude}, Long ${fallbackLocation.longitude}`,
          );
          dispatch(
            setCoords({
              coords: [fallbackLocation.latitude, fallbackLocation.longitude],
            }),
          );

          navigation.navigate('Location', {
            item,
            dataTrackChiffer: deviceData,
            access_token: token,
            showResult: {data: {positionList: []}},
            index,
            eloc,
          });
          return;
        }

        console.warn('⚠️ Fallback deviceData.location is missing or invalid.');

        Alert.alert(
          'Alert!',
          'No recent location data available for this vehicle',
          [{text: 'OK', onPress: () => navigation.navigate('Upcoming')}],
          {cancelable: false},
        );
      } catch (error) {
        console.error('❌ Error fetching location data:', error);
        Alert.alert(
          'Alert!',
          'This vehicle cannot be tracked',
          [{text: 'OK', onPress: () => navigation.navigate('Upcoming')}],
          {cancelable: false},
        );
      }
    },
    [dispatch, deviceData, item, navigation, index, eloc],
  );

  const fetchDeviceAndLocation = useCallback(async () => {
    setLoading(true);
    try {
      let token = accessToken;
      if (!token) {
        token = await fetchOAuthToken();
        if (!token) return;
      }

      const response = await fetch(`${INTOUCH_URL}${GET_DEVICES}`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      });

      const responseData = await response.json();
      const devices = responseData?.data || [];

      console.log(
        'Available devices:',
        devices.map(d => d.deviceDetails?.registrationNumber),
      );
      console.log('Looking for vehicle:', item?.Drivernumber);

      const matchedDevice = devices?.find(
        dev => dev?.deviceDetails?.registrationNumber === item?.Drivernumber,
      );

      if (!matchedDevice) {
        Alert.alert('Tracking Error', 'This vehicle cannot be tracked.');
        setLoading(false);
        return;
      }

      console.log('Found device:', matchedDevice.id);
      setDeviceData(matchedDevice);

      await fetchLocationData(matchedDevice.id, token);
      console.log(deviceData, 'abc');
    } catch (err) {
      console.error('Error fetching device data:', err);
      Alert.alert(
        'Tracking Error',
        'Something went wrong while tracking the vehicle.',
      );
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchOAuthToken, item?.Drivernumber, fetchLocationData]);

  useEffect(() => {
    fetchUpcomingBookings();
  }, [fetchUpcomingBookings]);

  const home = useCallback(() => navigation.navigate('Upcoming'), [navigation]);
  const stephistroy = useCallback(currentitem => {
    if (currentitem?.Bookingstatus !== 'Confirmed') return 1;
    if (currentitem?.Bookingstatus === 'Confirmed')
      return currentitem?.vehicle_no
        ? currentitem?.Track_chauffeur === 'Yes'
          ? 4
          : 3
        : 2;
    return 1;
  }, []);
  const icons = useCallback(
    () => navigation.navigate('Notifications'),
    [navigation],
  );
  const formatDate = timestamp => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <SafeAreaView style={pageName === 'HIS' && {flex: 1}}>
      <CustomHeader
        title={'My Bookings'}
        handleLeftIcon={home}
        onpressIcon={icons}
        leftIcon={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/ic_back_arrow_white_24.png')}
            />
          </TouchableOpacity>
        )}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchUpcomingBookings}
          />
        }>
        {pageName !== 'HIS' && (
          <StepIndicator activeNumber={stephistroy(item)} />
        )}
        <View>
          <View style={styles.cardContainer}>
            {/* Booking Details Card */}
            <View style={styles.rowBetween}>
              <View style={{width: '50%'}}>
                <Text style={styles.name}>{item.vehiclerequested}</Text>
              </View>
              <View style={styles.centeredRight}>
                <Text style={styles.bookId}>
                  {'Booking ID :' + item.booking_id}
                </Text>
              </View>
            </View>
            {(item?.startotp || item?.endotp) && (
              <View style={styles.otpContainer}>
                {item?.startotp && (
                  <Text style={styles.otpText}>
                    Start OTP : {item?.startotp}
                  </Text>
                )}
                {item?.endotp && (
                  <Text style={styles.otpText}>End OTP : {item?.endotp}</Text>
                )}
              </View>
            )}
            <View
              style={[
                styles.santosh,
                {marginTop: item?.startotp && item?.endotp ? 15 : 10},
              ]}>
              <Text style={styles.name1}>{item.Guestname}</Text>
              <Text style={styles.infoText}>
                Vehicle number : {item.vehicle_no}
              </Text>
              <Text style={styles.infoText}>
                Booking for : {formatDate(item.start_date)}
              </Text>
              <Text style={styles.infoText}>Time : {item.Reporingtime}</Text>
              <Text style={styles.infoText}>
                Reporting place : {item.Reportingplace}
              </Text>
            </View>
            {stephistroy(item) > 0 && (
              <TouchableOpacity
                style={styles.trackBtnContainer}
                disabled={loading}
                onPress={fetchDeviceAndLocation}>
                <View
                  style={[
                    styles.SignIn1,
                    loading && {backgroundColor: 'grey'},
                  ]}>
                  {loading ? (
                    <ActivityIndicator color={'white'} size={20} />
                  ) : (
                    <Text style={styles.trackBtnText}>Track Chauffeur</Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
            {pageName === 'HIS' && (
              <View style={styles.feedbackBtnWrapper}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Feedback', {
                      item,
                      Booking: item.booking_id,
                      feedback_arr,
                      status,
                    })
                  }
                  style={styles.feedbackBtn}>
                  <Text style={styles.trackBtnText}>
                    {status === 0 ? 'Feedback' : 'View Feedback'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Track;

const styles = StyleSheet.create({
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  bookId: {
    fontSize: 12,
    marginRight: 10,
    color: '#000',
  },
  name1: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#000',
    marginTop: 10,
  },
  otpText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 13,
  },
  infoText: {
    marginLeft: 20,
    color: '#000',
    marginTop: 8,
  },
  cardContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingTop: 9,
    width: '90%',
    marginBottom: 90,
    paddingBottom: 30,
    marginTop: 50,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '100%',
  },
  centeredRight: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  santosh: {
    alignSelf: 'center',
    backgroundColor: '#FAFAFA',
    width: '85%',
  },
  trackBtnContainer: {
    backgroundColor: '#3C3567',
    borderRadius: 10,
    width: '94%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 20,
  },
  SignIn1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackBtnText: {
    color: '#fff',
    fontSize: 14,
  },
  feedbackBtnWrapper: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 5,
  },
  feedbackBtn: {
    backgroundColor: '#3C3567',
    borderRadius: 10,
    width: 130,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Dimensions,
//   TouchableOpacity,
//   ScrollView,
//   RefreshControl,
//   Alert,
//   ActivityIndicator,
//   Image,
// } from 'react-native';
// import React, { useEffect, useState, useCallback, useMemo, memo, useRef } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';

// import StepIndicator from '../../component/StepIndicator';
// import { oauthApi } from '../../services/api/oauthToken';
// import { INTOUCH_URL, GET_DEVICES } from '../../config/api-config';
// import UpcomingApi from '../../services/api/upcoming';
// import CustomHeader from '../../component/CustomHeader';
// import { setCoords } from '../../Redux/slice/CoordsSlice';
