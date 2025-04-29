// Reshab Kumar Pandey
//MapIndex.js

import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import MapplsGL from 'mappls-map-react-native';
import Polyline from 'mappls-polyline';

const {height, width} = Dimensions.get('screen');

const MapIndex = props => {
  const {item} = props;
  const coordinates = useSelector(state => state?.coords?.coords);
  const [destinationCoordinates, setDestinationCoordinates] = useState(
    item?.eloc,
  );
  const [sourceCoordinates, setSourceCoordinates] = useState(
    `${coordinates?.coords[1]},${coordinates?.coords[0]}`,
  );
  const [center, setcenter] = useState(
    coordinates?.coords ? coordinates?.coords[0] : null,
  );
  const [route, setroute] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    console.log('MapIndex component mounted or updated');
    console.log('Item prop:', item);
    console.log('Redux coordinates:', coordinates?.coords);

    const fetchData = async () => {
      if (coordinates?.coords && item?.eloc) {
        setSourceCoordinates(
          `${coordinates?.coords[1]},${coordinates?.coords[0]}`,
        );
        console.log(
          'Source Coordinates set to:',
          `${coordinates?.coords[1]},${coordinates?.coords[0]}`,
        );
        console.log('Fetching direction data...');
        await fetchDirectionData('driving');
      } else {
        console.log(
          'Coordinates or eloc are missing, skipping fetchDirectionData',
        );
      }
    };
    fetchData();
  }, [coordinates?.coords, item?.eloc]);

  const fetchDirectionData = async profile => {
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

  const getFormattedDistance = distance => {
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

  const getFormattedDuration = duration => {
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
      result =
        hours > 0
          ? `${hours} hour${min > 0 ? ` ${min} minute` : ''}`
          : `${min} minute`;
    }
    console.log('Formatted duration:', result);
    return result;
  };

  const onCallCLick = async () => {
    console.log('onCallCLick called');
    let phone = null;
  
    if (item.call_masking === 'Yes' && item.drdNumber) {
      phone = item.drdNumber;
      console.log('Call masking active. Calling via masked number:', phone);
    } else {
      Alert.alert('NUMBER NOT AVAILABLE');
      console.log('No phone number available.');
      return;
    }

    phone = phone.replace(/\s+/g, '');
    
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
          {
            title: 'Phone Call Permission',
            message: 'App needs access to make calls',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Cannot make calls without permission');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  
    
    let phoneNumber = Platform.OS === 'android' ? `tel:${phone}` : `telprompt:${phone}`;
  
    // Open phone app
    Linking.openURL(phoneNumber)
      .then(() => console.log('Phone app opened successfully'))
      .catch(err => {
        console.error('Error opening phone app:', err);
        Alert.alert('Error', 'Could not open phone app');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoCard}>
     
        
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Image
                style={styles.icon}
                source={require('../../assets/route.png')}
              />
              <Text style={styles.label}>Distance</Text>
              <Text style={styles.value}>{distance || "Calculating..."}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Image
                style={styles.icon}
                source={require('../../assets/mapcar.png')}
              />
              <Text style={styles.label}>Vehicle Type</Text>
              <Text style={styles.valueHighlight}>{item?.vehiclerequested || "N/A"}</Text>
            </View>
          </View>

          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Image
                style={styles.icon}
                source={require('../../assets/clock.png')}
              />
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>{duration || "Calculating..."}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Image
                style={styles.icon}
                source={require('../../assets/dl.png')}
              />
              <Text style={styles.label}>Vehicle Number</Text>
              <Text style={styles.valueAccent}>{item?.vehicle_no || "N/A"}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.callButtonContainer}
          onPress={onCallCLick}
          activeOpacity={0.8}>
          <View style={styles.callButton}>
            <Text style={styles.callButtonText}>Call Driver</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingVertical: 20,
    backgroundColor: '#f7f8fa',
    marginBottom: 80, // Added bottom margin
    // marginTop: 10, 
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    // marginHorizontal: 4, // Give some horizontal breathing room
  },

  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoSection: {
    padding: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 6,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  valueHighlight: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  valueAccent: {
    fontSize: 16,
    color: '#FF5733',
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  callButtonContainer: {
    paddingHorizontal: 26,
    paddingVertical: 8,
  },
  callButton: {
    backgroundColor: '#7E57C2',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7E57C2',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MapIndex;