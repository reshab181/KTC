// Reshab Kumar Pandey
//MapIndex.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import MapplsGL from 'mappls-map-react-native';
import Polyline from 'mappls-polyline';


const { height, width } = Dimensions.get('screen');

const MapIndex = (props) => {
  const { item } = props;
  const coordinates = useSelector((state) => state?.coords?.coords);
  const [destinationCoordinates, setDestinationCoordinates] = useState(item?.eloc);
    // const [destinationCoordinates, setDestinationCoordinates] = useState('77.3910,28.5355');
  const [sourceCoordinates, setSourceCoordinates] = useState(
    `${coordinates?.coords[1]},${coordinates?.coords[0]}`
  );
  const [center, setcenter] = useState(coordinates?.coords ? coordinates?.coords[0] : null);
  const [route, setroute] = useState("");
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    console.log('MapIndex component mounted or updated');
    console.log('Item prop:', item);
    console.log('Redux coordinates:', coordinates?.coords);

    const fetchData = async () => {
      if (coordinates?.coords && item?.eloc) {
        // if (coordinates?.coords) {
        setSourceCoordinates(
          `${coordinates?.coords[1]},${coordinates?.coords[0]}`
        );
        console.log('Source Coordinates set to:', `${coordinates?.coords[1]},${coordinates?.coords[0]}`);
        console.log('Fetching direction data...');
        await fetchDirectionData('driving');
      } else {
        console.log('Coordinates or eloc are missing, skipping fetchDirectionData');
      }
    };
    fetchData();
  }, [coordinates?.coords,item?.eloc]);

  const fetchDirectionData = async (profile) => {
    console.log('fetchDirectionData called with profile:', profile);
    console.log('Source:', sourceCoordinates);
    console.log('Destination:', destinationCoordinates);
    try {
      const data = await MapplsGL?.RestApi?.direction({
        origin: sourceCoordinates,
        destination: destinationCoordinates,
        profile,
        overview: MapplsGL.RestApi.DirectionsCriteria.OVERVIEW_FULL,
        geometries: 'polyline6',
      });
      console.log('Direction API Response:', data);
      if (data?.routes && data?.routes.length > 0) {
        let routeGeoJSON = Polyline?.toGeoJSON(data?.routes[0]?.geometry, 6);
        setDistance(getFormattedDistance(data?.routes[0]?.distance));
        setDuration(getFormattedDuration(data?.routes[0]?.duration));
        setroute(routeGeoJSON);
        console.log('Route GeoJSON:', routeGeoJSON);
        if (routeGeoJSON?.coordinates && routeGeoJSON?.coordinates.length > 0) {
          setcenter(routeGeoJSON?.coordinates[0]);
          console.log('Center set to:', routeGeoJSON?.coordinates[0]);
        } else {
          console.log('Route GeoJSON coordinates are empty.');
          setcenter(coordinates?.coords ? coordinates?.coords[0] : null);
        }
      } else {
        console.log('No routes found in the direction API response.');
        setDistance('');
        setDuration('');
        setroute('');
        setcenter(coordinates?.coords ? coordinates?.coords[0] : null);
      }
    } catch (error) {
      console.error('Direction API Error:', error?.message);
    }
  };

  const getFormattedDistance = (distance) => {
    console.log('getFormattedDistance called with distance:', distance);
    if (distance / 1000 < 1) {
      const result = distance + ' meter';
      console.log('Formatted distance:', result);
      return result;
    }
    const dis = (distance / 1000).toFixed(2);
    const result = dis + ' kilometer';
    console.log('Formatted distance:', result);
    return result;
  };

  const getFormattedDuration = (duration) => {
    console.log('getFormattedDuration called with duration:', duration);
    const min = parseInt((duration % 3600) / 60);
    const hours = parseInt((duration % 86400) / 3600);
    const days = parseInt(duration / 86400);
    let result = '';

    if (days > 0) {
      result = `${days} ${days > 1 ? 'Days' : 'Day'} ${hours} hour${
        min > 0 ? ` ${min} minute` : ''
      }`;
    } else {
      result = hours > 0
        ? `${hours} hour${min > 0 ? ` ${min} minute` : ''}`
        : `${min} minute`;
    }
    console.log('Formatted duration:', result);
    return result;
  };

  const onCallCLick = () => {
    console.log('onCallCLick called');
    let phone = item.Drivernumber;
    console.log('Guest contact number:', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('NUMBER NOT AVAILABLE');
          console.log('Cannot open URL:', phoneNumber);
        } else {
          console.log('Opening URL:', phoneNumber);
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => {
        console.error('Error opening URL:', err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
        <View style={styles.iconRow}>
          <Image style={styles.routeIcon} source={require('../../assets/route.png')} />
          <Image style={styles.carIcon} source={require('../../assets/mapcar.png')} />
        </View>
        <View style={styles.textRow}>
          <Text style={styles.distanceText}>{distance}</Text>
          <Text style={styles.vehicleText}>{item.vehiclerequested}</Text>
        </View>
        <View style={styles.iconRow}>
          <Image style={styles.clockIcon} source={require('../../assets/clock.png')} />
          <Image style={styles.dlIcon} source={require('../../assets/dl.png')} />
        </View>
        <View style={styles.textRow}>
          <Text style={styles.durationText}>{duration}</Text>
          <Text style={styles.vehicleNumberText}>{item?.vehicle_no}</Text>
        </View>
        {/* <View style={styles.callButtonContainer}>
  <Text style={styles.callButton} onPress={onCallCLick}>
    Call Driver
  </Text>
</View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 165,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  infoCard: {
    height: height / 3.2,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  carIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  routeIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  clockIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  dlIcon: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },
  distanceText: {
    color: '#333',
    fontWeight: '700',
    fontSize: 18,
  },
  vehicleText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
  durationText: {
    color: '#333',
    fontWeight: '700',
    fontSize: 18,
  },
  vehicleNumberText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
  callButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  
  callButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});


export default MapIndex;