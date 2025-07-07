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
  StatusBar,
  useColorScheme,
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
import Static from '../../services/Static';

const {width, height} = Dimensions.get('window');

const Track = props => {
    const colorScheme = useColorScheme();
            const isDarkMode = colorScheme === 'dark';
            
            const backgroundStyle = {
              backgroundColor: isDarkMode ? '#121212' : '#ffffff',
            };
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

  const [isTrackingActive, setIsTrackingActive] = useState(false);


  const fetchLocationData = useCallback(
  async (deviceId, token, shouldNavigate = false) => {
    try {
      const headers = {Accept: '*/*', Authorization: `Bearer ${token}`};
    
      
      
      
      let response = await fetch(
        `${INTOUCH_URL}${GET_DEVICES}/${deviceId}/position`,
        {method: 'GET', headers},
      );
      
      let currentPosition = null;
      if (response.ok) {
        const currentRes = await response.json();
        currentPosition = currentRes?.data;
        console.log(' Current Position:', currentPosition);
      }
  const now = Date.now();
      console.log(now ,"now time");
   
      const fiveMinutesAgo = now - 5 * 60 * 1000; 
      const startTime = Math.floor(fiveMinutesAgo / 1000);
      const endTime = Math.floor(now / 1000);

      console.log(
        `📡 Fetching events from ${new Date(
          fiveMinutesAgo,
        ).toLocaleString()} to ${new Date(now).toLocaleString()}`,
      );

      response = await fetch(
        `${INTOUCH_URL}${GET_DEVICES}/${deviceId}/events?startTime=${startTime}&endTime=${endTime}`,
        {method: 'GET', headers},
      );

      const res = await response.json();
      console.log(' Events Response:', JSON.stringify(res?.data));

      if (res?.error === 'Daily Limit Expired') {
        Alert.alert('Alert!', 'Daily Limit Expired', [
          {text: 'OK', onPress: () => navigation.navigate('Upcoming')},
        ]);
        return;
      }

     
      let validPosition = null;
      
      // First check current position
      if (currentPosition && 
          typeof currentPosition.latitude === 'number' &&
          typeof currentPosition.longitude === 'number' &&
          currentPosition.latitude !== 0 &&
          currentPosition.longitude !== 0) {
        validPosition = currentPosition;
        console.log(' Using current position:', validPosition);
      } else {
        // Then check recent events
        const positionList = Array.isArray(res?.data?.positionList)
          ? res.data.positionList
          : [];
        
    
        const sortedPositions = positionList
          .filter(pos =>
            typeof pos.latitude === 'number' &&
            typeof pos.longitude === 'number' &&
            pos.latitude !== 0 &&
            pos.longitude !== 0
          )
          // .sort((a, b) => b.timestamp - a.timestamp);

        validPosition = sortedPositions[sortedPositions.length-1];
        
        if (validPosition) {
          console.log(' Using most recent valid position from events:', validPosition);
          console.log(` Position age: ${Math.floor((now - validPosition.timestamp * 1000) / 1000)} seconds`);
        }
      }

      if (validPosition) {
        const coords = [validPosition.latitude, validPosition.longitude];
     
      console.log("🛰️ Dispatching coords to Redux:", coords);
        // Calculate position age for user feedback
        const positionAge = validPosition.timestamp 
          ? Math.floor((now - validPosition.timestamp * 1000) / 1000)
          : 0;
            dispatch(setCoords({ coords: [...coords], positionAge }));

        if (shouldNavigate) {
          setIsTrackingActive(false);
          navigation.navigate('Location', {
            item,
            dataTrackChiffer: deviceData,
            access_token: token,
            showResult: res.data || { data: { positionList: [validPosition] } },
            index,
            eloc,
            positionAge, // Pass age to Location screen for user info
          });
        }
        return;
      }

      // Strategy 4: Fallback to device's last known location
      const fallbackLocation = deviceData?.location;
      console.log('🔄 Checking fallback deviceData.location:', fallbackLocation);

      if (
        fallbackLocation?.latitude &&
        fallbackLocation?.longitude &&
        fallbackLocation.latitude !== 0 &&
        fallbackLocation.longitude !== 0
      ) {
        console.log('🔄 Using fallback device location');
        dispatch(
          setCoords({
            coords: [fallbackLocation.latitude, fallbackLocation.longitude],
          }),
        );

        if (shouldNavigate) {
          setIsTrackingActive(false);
          navigation.navigate('Location', {
            item,
            dataTrackChiffer: deviceData,
            access_token: token,
            showResult: { data: { positionList: [fallbackLocation] } },
            index,
            eloc,
            isStaleData: true, // Flag for stale data
          });
        }
        return;
      }

      console.warn('No valid location data found');
      if (shouldNavigate) {
        Alert.alert(
          'Alert!',
          'No recent location data available for this vehicle. The device might be offline or GPS signal is weak.',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.error(' Error fetching location data:', error);
      if (shouldNavigate) {
        Alert.alert(
          'Alert!',
          'Unable to track vehicle. Please check your internet connection.',
          [{text: 'OK', onPress: () => navigation.navigate('Upcoming')}],
          {cancelable: false},
        );
      }
    }
  },
  [dispatch, deviceData, item, navigation, index, eloc],
);

  // Modified useEffect for polling - only polls but doesn't navigate
  // useEffect(() => {
  //   let isMounted = true;
  //   let intervalId;

  //   const pollLocation = async () => {
  //     if (!isMounted) return;
  //     if (!deviceData?.id || !accessToken) {
  //       console.log('⏭️ Skipping poll - missing deviceId or token');
  //       return;
  //     }
  //     if (!isTrackingActive) {
  //       console.log('⏭️ Skipping poll - tracking not active');
  //       return;
  //     }
  //     console.log('🔄 Polling location for device:', deviceData.id);
  //     // Pass false for shouldNavigate - just update data, don't navigate
  //     // await fetchDeviceAndLocation()
  //     await fetchLocationData(deviceData.id, accessToken, false);
  //   };

  //   if (deviceData?.id && accessToken && isTrackingActive) {
  //     intervalId = setInterval(() => {
  //       pollLocation(); 
  //     }, 30000); // 30,000 ms = 30 seconds
  //   }
  //   console.log("🔁 Polling triggered at:", new Date().toLocaleTimeString());

  //   return () => {
  //     isMounted = false;
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [deviceData?.id, accessToken, fetchLocationData, isTrackingActive]);


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
        console.log('✅ OAuth token fetched successfully');
      } else {
        Alert.alert(
          'Authentication Error',
          'Unable to authenticate. Please try again.',
        );
        return null;
      }
      return tokenResponse.data.access_token;
    } catch (err) {
      console.error('❌ Error fetching OAuth token:', err);
      Alert.alert('Authentication Error', 'Failed to authenticate.');
      return null;
    }
  }, []);

  const fetchDeviceAndLocation = useCallback(async () => {
    setLoading(true);
    setIsTrackingActive(true); 
    try {
      let token = accessToken;
      if (!token) {
        token = await fetchOAuthToken();
        if (!token) {
          setIsTrackingActive(false);
          return;
        }
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
        devices.map(d => d.deviceDetails?.name),
        devices.map(d => d.deviceDetails?.id),
      );
      console.log('Looking for vehicle:', item?.Drivernumber);

      const matchedDevice = devices?.find(
        dev =>
          dev?.deviceDetails?.registrationNumber === item?.Drivernumber ||
          dev?.deviceDetails?.name === item?.Drivernumber,
      );

      if (!matchedDevice) {
        Alert.alert('Tracking Error', 'This vehicle cannot be tracked.');
        setLoading(false);
        setIsTrackingActive(false);
        return;
      }

      console.log(' Found device:', matchedDevice.id);
      setDeviceData(matchedDevice);

      // Pass true for shouldNavigate since user clicked track button
      await fetchLocationData(matchedDevice.id, token, true);
    } catch (err) {
      console.error(' Error fetching device data:', err);
      Alert.alert(
        'Tracking Error',
        'Something went wrong while tracking the vehicle.',
      );
      setIsTrackingActive(false);
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchOAuthToken, item?.Drivernumber, fetchLocationData]);

  // Reset tracking state when component unmounts or user navigates away
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset tracking when screen comes into focus (user returns)
      setIsTrackingActive(false);
    });

    return unsubscribe;
  }, [navigation]);

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

  const renderInfoRow = (icon, label, value) => (
    <View style={styles.infoRow}>
      <View style={styles.iconWrapper}>
        <Image source={icon} style={styles.infoIcon} />
      </View>
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, pageName === 'HIS' && {flex: 1}]}>
         <StatusBar
                          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                          backgroundColor={backgroundStyle.backgroundColor}
                        />
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
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchUpcomingBookings}
          />
        }>
        {pageName !== 'HIS' && (
          <StepIndicator activeNumber={stephistroy(item)} />
        )}
        <View style={styles.contentContainer}>
          {/* Modern Booking Card */}
          <View style={styles.card}>
            {/* Header with Booking ID */}
            <View style={styles.cardHeader}>
              <View style={styles.vehicleTypeContainer}>
                <Image
                  source={require('../../assets/mapcar.png')}
                  style={styles.vehicleIcon}
                />
                <Text style={styles.vehicleType}>{item.vehiclerequested}</Text>
              </View>
              <View style={styles.bookingIdContainer}>
                <Text style={styles.bookingIdLabel}>BOOKING ID</Text>
                <Text style={styles.bookingIdValue}>{item.booking_id}</Text>
              </View>
            </View>

            {/* OTP Section */}
            {(item?.startotp || item?.endotp) && (
              <View style={styles.otpSection}>
                {item?.startotp && (
                  <View style={styles.otpItem}>
                    <Text style={styles.otpLabel}>START OTP</Text>
                    <Text style={styles.otpValue}>{item?.startotp}</Text>
                  </View>
                )}
                {item?.endotp && (
                  <View style={styles.otpItem}>
                    <Text style={styles.otpLabel}>END OTP</Text>
                    <Text style={styles.otpValue}>{item?.endotp}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Guest Information */}
            <View style={styles.guestSection}>
              <Text style={styles.guestName}>{item.Guestname}</Text>
              <View style={styles.divider} />
            </View>

            {/* Booking Details */}
            <View style={styles.detailsSection}>
              {renderInfoRow(
                require('../../assets/dl.png'),
                'Vehicle Number',
                item.vehicle_no || 'Not assigned',
              )}

              {renderInfoRow(
                require('../../assets/calendar.png'),
                'Booking Date',
                formatDate(item.start_date),
              )}

              {renderInfoRow(
                require('../../assets/clock.png'),
                'Reporting Time',
                item.Reporingtime,
              )}

              {renderInfoRow(
                require('../../assets/place.png'),
                'Reporting Place',
                item.Reportingplace,
              )}
            </View>

            {/* Track Button */}
            {stephistroy(item) > 0 && (
              <TouchableOpacity
                style={[
                  styles.trackButton,
                  loading && styles.trackButtonDisabled,
                ]}
                disabled={loading}
                onPress={fetchDeviceAndLocation}>
                {loading ? (
                  <ActivityIndicator color={'white'} size={20} />
                ) : (
                  <>
                    <Image
                      source={require('../../assets/route.png')}
                      style={styles.trackIcon}
                    />
                    <Text style={styles.trackButtonText}>Track Chauffeur</Text>
                  </>
                )}
              </TouchableOpacity>
            )}

            {/* Feedback Button */}
            {pageName === 'HIS' && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Feedback', {
                    item,
                    Booking: item.booking_id,
                    feedback_arr,
                    status,
                  })
                }
                style={styles.feedbackButton}>
                <Text style={styles.feedbackButtonText}>
                  {status === 0 ? 'Give Feedback' : 'View Feedback'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Track;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3C3567',
  },
  vehicleTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleIcon: {
    width: 66,
    height: 28,
    tintColor: '#ffffff',
    marginRight: 8,
  },
  vehicleType: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  bookingIdContainer: {
    alignItems: 'flex-end',
  },
  bookingIdLabel: {
    fontSize: 10,
    color: '#E0E6ED',
    fontWeight: '600',
  },
  bookingIdValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  otpSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f0f4ff',
  },
  otpItem: {
    flex: 1,
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  otpLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  otpValue: {
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  guestSection: {
    padding: 16,
  },
  guestName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 8,
  },
  detailsSection: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    backgroundColor: '#E5E7EB',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoIcon: {
    width: 18,
    height: 18,
    tintColor: '#4B5563',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  trackButton: {
    flexDirection: 'row',
    backgroundColor: '#3C3567',
    borderRadius: 8,
    padding: 14,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  trackButtonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  trackIcon: {
    width: 16,
    height: 16,
    tintColor: '#ffffff',
    marginRight: 8,
  },
  trackButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  feedbackButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  feedbackButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});