import React, { useEffect, useCallback,useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  BackHandler,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
  StatusBar
} from 'react-native';
import { useSelector } from 'react-redux';
import {INTOUCH_URL, GET_DEVICES} from '../../config/api-config';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomHeader from '../../component/CustomHeader';
import GetDirection from './GetDirection';
import { setCoords } from '../../Redux/slice/CoordsSlice';
import MapIndex from './MapIndex';
import {useDispatch} from 'react-redux';

const { height, width } = Dimensions.get('screen');

const LocationScreen = ({ route }) => {
    const colorScheme = useColorScheme();
            const isDarkMode = colorScheme === 'dark';
            
            const backgroundStyle = {
              backgroundColor: isDarkMode ? '#121212' : '#ffffff',
            };
    const dispatch = useDispatch();
  const navigation = useNavigation();
  const { item, dataTrackChiffer, access_token, showResult, index, eloc } = route?.params || {};
   const [deviceId] = useState(dataTrackChiffer?.id);

  const driverCoordinates = useSelector((state) => state?.coords?.coords);
  const positionAge = useSelector((state) => state.coords.positionAge);
  const customerLocation = item?.eloc ?? eloc ?? null;

  useEffect(() => {
  console.log('📍 Updated driverCoordinates:', driverCoordinates);
}, [driverCoordinates]);

const fetchLocationData = useCallback(async () => {
  try {
    const headers = {
      Accept: '*/*',
      Authorization: `Bearer ${access_token}`,
    };

    const now = Date.now();
    const twoMinutesAgo = now - 2 * 60 * 1000;

    const startTime = Math.floor(twoMinutesAgo / 1000);
    const endTime = Math.floor(now / 1000);

    console.log(
      `📡 Fetching location data from ${new Date(twoMinutesAgo).toLocaleString()} to ${new Date(now).toLocaleString()}`
    );

    const response = await fetch(
      `${INTOUCH_URL}${GET_DEVICES}/${deviceId}/events?startTime=${startTime}&endTime=${endTime}`,
      { method: 'GET', headers }
    );

    const result = await response.json();
    const positionList = Array.isArray(result?.data?.positionList)
      ? result.data.positionList
      : [];

    const validPositions = positionList.filter(
      pos =>
        typeof pos.latitude === 'number' &&
        typeof pos.longitude === 'number' &&
        pos.latitude !== 0 &&
        pos.longitude !== 0
    );

    const latestPosition = validPositions[validPositions.length - 1]; // Oldest first, latest last

    if (latestPosition) {
      const coords = [latestPosition.latitude, latestPosition.longitude];
      const positionAge = latestPosition.timestamp
        ? Math.floor((now - latestPosition.timestamp * 1000) / 1000)
        : 0;

      dispatch(setCoords({ coords, positionAge }));
      console.log('🛰️ Updated coords from positionList:', coords);
    } else {
      console.warn('⚠️ No valid coordinates found in positionList');
    }
  } catch (error) {
    console.error(' Error polling location from positionList:', error);
    Alert.alert('Tracking Error', 'Unable to fetch updated location.');
  }
}, [access_token, deviceId, dispatch]);


    useEffect(() => {
    const intervalId = setInterval(() => {
      fetchLocationData();
    }, 15000); // every 15 seconds

    return () => clearInterval(intervalId);
  }, [fetchLocationData]);

  // Unified back handler
  const handleBack = useCallback(() => {
    navigation.goBack(); 
  }, [navigation]);

  const handleMessages = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);
useEffect(() => {
  console.log('📍 LocationScreen updated with new coordinates:', driverCoordinates, 'Age:', positionAge);
}, [driverCoordinates, positionAge]);
 
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleBack();
        return true; // Prevent default back behavior
      };
      
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [handleBack])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
         <StatusBar
                          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                          backgroundColor={backgroundStyle.backgroundColor}
                        />
      <View style={styles.mainContainer}>
        <CustomHeader
          title="Track Chauffeur"
          onpressBack={handleBack} 
          onpressIcon={handleMessages}
          leftIcon={() => (
            <TouchableOpacity onPress={handleBack}>
              <Image source={require('../../assets/ic_back_arrow_white_24.png')} />
            </TouchableOpacity>
          )}
        />
        
        <GetDirection
          item={item}
          coordinates={{ coords: driverCoordinates }}
          sourceCoordinates={driverCoordinates}
          destinationCoordinates={customerLocation}
        />
        
        {/* <MapIndex 
          item={item} 
          coordinates={{ coords: driverCoordinates }}
           sourceCoordinates={driverCoordinates}
          eloc={customerLocation}
        /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    height: height /1,
    width: width / 1,
  },
});

export default LocationScreen;