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
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setIsLoading(false);
        setError('Location data not available');
      }
    };
    fetchData();
  }, [coordinates?.coords, item?.eloc]);

  const fetchDirectionData = async profile => {
    console.log('fetchDirectionData called with profile:', profile);
    console.log('Source:', sourceCoordinates);
    console.log('Destination:', destinationCoordinates);
    setIsLoading(true);
    setError(null);
    
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
        setDistance('Not available');
        setDuration('Not available');
        setroute('');
        setcenter(coordinates?.coords ? coordinates?.coords[0] : null);
      }
    } catch (error) {
      console.error('Direction API Error:', error?.message);
      setError('Unable to fetch route information');
      setDistance('Error');
      setDuration('Error');
    } finally {
      setIsLoading(false);
    }
  };

  const getFormattedDistance = distance => {
    console.log('getFormattedDistance called with distance:', distance);
    if (!distance || distance === 0) return 'N/A';
    
    if (distance / 1000 < 1) {
      const result = `${Math.round(distance)} m`;
      console.log('Formatted distance:', result);
      return result;
    }
    const dis = (distance / 1000).toFixed(1);
    const result = `${dis} km`;
    console.log('Formatted distance:', result);
    return result;
  };

  const getFormattedDuration = duration => {
    console.log('getFormattedDuration called with duration:', duration);
    if (!duration || duration === 0) return 'N/A';
    
    const min = Math.round((duration % 3600) / 60);
    const hours = Math.floor(duration / 3600);

    if (hours > 0) {
      return min > 0 ? `${hours}h ${min}m` : `${hours}h`;
    }
    return `${min}m`;
  };

  // const onCallClick = async () => {
  //   console.log('onCallClick called');
  //   let phone = null;
  
  //   if (item?.drdNumber) {
  //     phone = item.drdNumber;
  //     console.log('Calling via number:', phone);
  //   } else {
  //     Alert.alert('Notice', 'Phone number not available');
  //     console.log('No phone number available.');
  //     return;
  //   }

  //   phone = phone.replace(/\s+/g, '');
    
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CALL_PHONE,
  //         {
  //           title: 'Phone Call Permission',
  //           message: 'App needs access to make calls',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
        
  //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //         Alert.alert('Permission Denied', 'Cannot make calls without permission');
  //         return;
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //       return;
  //     }
  //   }
  
  //   let phoneNumber = Platform.OS === 'android' ? `tel:${phone}` : `telprompt:${phone}`;
  
  //   Linking.openURL(phoneNumber)
  //     .then(() => console.log('Phone app opened successfully'))
  //     .catch(err => {
  //       console.error('Error opening phone app:', err);
  //       Alert.alert('Error', 'Could not open phone app');
  //     });
  // };

  const renderInfoItem = (icon, label, value, valueStyle = styles.value) => (
    <View style={styles.infoItem}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={icon} />
      </View>
      <Text style={styles.label}>{label}</Text>
      {isLoading && (label === 'Distance' || label === 'Duration') ? (
        <ActivityIndicator size="small" color="#4A90E2" />
      ) : (
        <Text style={valueStyle} numberOfLines={2}>{value}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Trip Details</Text>
            </View>
            
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
              </View>
            )}
            
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                {renderInfoItem(
                  require('../../assets/route.png'),
                  'Distance',
                  distance || "Calculating...",
                )}
                
                {renderInfoItem(
                  require('../../assets/mapcar.png'),
                  'Vehicle Type',
                  item?.vehiclerequested || "Not specified",
                  styles.valueHighlight,
                )}
              </View>

              <View style={styles.divider} />
              
              <View style={styles.infoRow}>
                {renderInfoItem(
                  require('../../assets/clock.png'),
                  'Duration',
                  duration || "Calculating...",
                )}
                
                {renderInfoItem(
                  require('../../assets/dl.png'),
                  'Vehicle Number',
                  item?.vehicle_no || "Not assigned",
                  styles.valueAccent,
                )}
              </View>
            </View>
            
            {/* {item?.drdNumber && (
              <TouchableOpacity
                style={styles.callButtonContainer}
                onPress={onCallClick}
                activeOpacity={0.8}>
                <View style={styles.callButton}>
                  <Text style={styles.callButtonText}>📞 Call Driver</Text>
                </View>
              </TouchableOpacity>
            )} */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingTop: 16,
    // paddingBottom: 24,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  errorContainer: {
    backgroundColor: '#ffe6e6',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ffcccc',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  infoSection: {
    padding: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  iconContainer: {
    backgroundColor: '#f0f4ff',
    padding: 12,
    borderRadius: 50,
    marginBottom: 12,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    tintColor: '#4A90E2',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 20,
  },
  valueHighlight: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
  },
  valueAccent: {
    fontSize: 16,
    color: '#D32F2F',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8EAF0',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  // callButtonContainer: {
  //   paddingHorizontal: 20,
  //   paddingBottom: 20,
  // },
  // callButton: {
  //   backgroundColor: '#4A90E2',
  //   paddingVertical: 16,
  //   borderRadius: 30,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   shadowColor: '#4A90E2',
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 8,
  //   elevation: 6,
  // },
  // callButtonText: {
  //   color: '#fff',
  //   fontSize: 18,
  //   fontWeight: '700',
  //   letterSpacing: 0.5,
  // },
});
export default MapIndex;

// Reshab Kumar Pandey
//MapIndex.js

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Image,
//   Dimensions,
//   Text,
//   StyleSheet,
//   Linking,
//   Alert,
//   Platform,
//   PermissionsAndroid,
//   TouchableOpacity,
//   SafeAreaView
// } from 'react-native';
// import {useSelector} from 'react-redux';
// import MapplsGL from 'mappls-map-react-native';
// import Polyline from 'mappls-polyline';

// const {height, width} = Dimensions.get('screen');

// const MapIndex = props => {
//   const {item, eloc} = props;
  
//   // Driver's current location (source)
//   const driverCoordinates = useSelector(state => state?.coords?.coords);
  
//   // Customer's location (destination)
//   const [destinationCoordinates, setDestinationCoordinates] = useState(
//     item?.eloc || eloc,
//   );
  
//   // Format coordinates for API call
//   const [sourceCoordinates, setSourceCoordinates] = useState('');
  
//   const [center, setcenter] = useState(
//     driverCoordinates ? [driverCoordinates[1], driverCoordinates[0]] : null,
//   );
//   const [route, setroute] = useState('');
//   const [distance, setDistance] = useState('');
//   const [duration, setDuration] = useState('');

//   useEffect(() => {
//     console.log('=== MapIndex Component ===');
//     console.log('Driver Coordinates (Source):', driverCoordinates);
//     console.log('Customer Location (Destination):', destinationCoordinates);
//     console.log('Item eloc:', item?.eloc);
//     console.log('Eloc prop:', eloc);

//     const fetchData = async () => {
//       if (driverCoordinates && destinationCoordinates) {
//         // Convert driver coordinates from [lat, lng] to 'lng,lat' string format
//         const sourceCoords = `${driverCoordinates[1]},${driverCoordinates[0]}`;
//         setSourceCoordinates(sourceCoords);
        
//         console.log('Formatted Source Coordinates:', sourceCoords);
//         console.log('Destination Coordinates:', destinationCoordinates);
//         console.log('Fetching direction data...');
        
//         await fetchDirectionData('driving');
//       } else {
//         console.log('Missing coordinates - Driver:', driverCoordinates, 'Customer:', destinationCoordinates);
//       }
//     };
//     fetchData();
//   }, [driverCoordinates, destinationCoordinates, item?.eloc, eloc]);

//   const fetchDirectionData = async profile => {
//     console.log('fetchDirectionData called with profile:', profile);
//     console.log('Source:', sourceCoordinates);
//     console.log('Destination:', destinationCoordinates);
//     try {
//       const data = await MapplsGL?.RestApi?.direction({
//         origin: sourceCoordinates,
//         destination: destinationCoordinates,
//         profile,
//         overview: MapplsGL.RestApi.DirectionsCriteria.OVERVIEW_FULL,
//         geometries: 'polyline6',
//       });
  
//       console.log('Direction API Response:', data);
//       if (data?.routes && data?.routes.length > 0) {
//         let routeGeoJSON = Polyline?.toGeoJSON(data?.routes[0]?.geometry, 6);
//         setDistance(getFormattedDistance(data?.routes[0]?.distance));
//         setDuration(getFormattedDuration(data?.routes[0]?.duration));
//         setroute(routeGeoJSON);
//         console.log('Route GeoJSON:', routeGeoJSON);
//         if (routeGeoJSON?.coordinates && routeGeoJSON?.coordinates.length > 0) {
//           setcenter(routeGeoJSON?.coordinates[0]);
//           console.log('Center set to:', routeGeoJSON?.coordinates[0]);
//         } else {
//           console.log('Route GeoJSON coordinates are empty.');
//           setcenter(coordinates?.coords ? coordinates?.coords[0] : null);
//         }
//       } else {
//         console.log('No routes found in the direction API response.');
//         setDistance('');
//         setDuration('');
//         setroute('');
//         setcenter(coordinates?.coords ? coordinates?.coords[0] : null);
//       }
//     } catch (error) {
//       console.error('Direction API Error:', error?.message);
//       Alert.alert('Error', 'Failed to fetch directions. Please try again.');
//     }
//   };
  
//   const getFormattedDistance = distance => {
//     console.log('getFormattedDistance called with distance:', distance);
//     if (distance / 1000 < 1) {
//       const result = distance + ' meter';
//       console.log('Formatted distance:', result);
//       return result;
//     }
//     const dis = (distance / 1000).toFixed(2);
//     const result = dis + ' kilometer';
//     console.log('Formatted distance:', result);
//     return result;
//   };

//   const getFormattedDuration = duration => {
//     console.log('getFormattedDuration called with duration:', duration);
//     const min = parseInt((duration % 3600) / 60);
//     const hours = parseInt((duration % 86400) / 3600);
//     const days = parseInt(duration / 86400);
//     let result = '';

//     if (days > 0) {
//       result = `${days} ${days > 1 ? 'Days' : 'Day'} ${hours} hour${
//         min > 0 ? ` ${min} minute` : ''
//       }`;
//     } else {
//       result =
//         hours > 0
//           ? `${hours} hour${min > 0 ? ` ${min} minute` : ''}`
//           : `${min} minute`;
//     }
//     console.log('Formatted duration:', result);
//     return result;
//   };

//   // Uncomment if you need call functionality
//   // const onCallCLick = async () => {
//   //   console.log('onCallCLick called');
//   //   let phone = null;
  
//   //   if (item.call_masking === 'Yes' && item.drdNumber) {
//   //     phone = item.drdNumber;
//   //     console.log('Call masking active. Calling via masked number:', phone);
//   //   } else {
//   //     Alert.alert('NUMBER NOT AVAILABLE');
//   //     console.log('No phone number available.');
//   //     return;
//   //   }

//   //   phone = phone.replace(/\s+/g, '');
    
//   //   if (Platform.OS === 'android') {
//   //     try {
//   //       const granted = await PermissionsAndroid.request(
//   //         PermissionsAndroid.PERMISSIONS.CALL_PHONE,
//   //         {
//   //           title: 'Phone Call Permission',
//   //           message: 'App needs access to make calls',
//   //           buttonNeutral: 'Ask Me Later',
//   //           buttonNegative: 'Cancel',
//   //           buttonPositive: 'OK',
//   //         },
//   //       );
        
//   //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//   //         Alert.alert('Permission Denied', 'Cannot make calls without permission');
//   //         return;
//   //       }
//   //     } catch (err) {
//   //       console.warn(err);
//   //       return;
//   //     }
//   //   }
  
//   //   let phoneNumber = Platform.OS === 'android' ? `tel:${phone}` : `telprompt:${phone}`;
  
//   //   Linking.openURL(phoneNumber)
//   //     .then(() => console.log('Phone app opened successfully'))
//   //     .catch(err => {
//   //       console.error('Error opening phone app:', err);
//   //       Alert.alert('Error', 'Could not open phone app');
//   //     });
//   // };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//     <View style={styles.container}>
//       <View style={styles.infoCard}>
//         <View style={styles.infoSection}>
//           <View style={styles.infoRow}>
//             <View style={styles.infoItem}>
//               <Image
//                 style={styles.icon}
//                 source={require('../../assets/route.png')}
//               />
//               <Text style={styles.label}>Distance</Text>
//               <Text style={styles.value}>{distance || "Calculating..."}</Text>
//             </View>
            
//             <View style={styles.infoItem}>
//               <Image
//                 style={styles.icon}
//                 source={require('../../assets/mapcar.png')}
//               />
//               <Text style={styles.label}>Vehicle Type</Text>
//               <Text style={styles.valueHighlight}>{item?.vehiclerequested || "N/A"}</Text>
//             </View>
//           </View>

//           <View style={styles.divider} />
          
//           <View style={styles.infoRow}>
//             <View style={styles.infoItem}>
//               <Image
//                 style={styles.icon}
//                 source={require('../../assets/clock.png')}
//               />
//               <Text style={styles.label}>Duration</Text>
//               <Text style={styles.value}>{duration || "Calculating..."}</Text>
//             </View>
            
//             <View style={styles.infoItem}>
//               <Image
//                 style={styles.icon}
//                 source={require('../../assets/dl.png')}
//               />
//               <Text style={styles.label}>Vehicle Number</Text>
//               <Text style={styles.valueAccent}>{item?.vehicle_no || "N/A"}</Text>
//             </View>
//           </View>
//         </View>
        
//         {/* Uncomment if you need call functionality
//         <TouchableOpacity
//           style={styles.callButtonContainer}
//           onPress={onCallCLick}
//           activeOpacity={0.8}>
//           <View style={styles.callButton}>
//             <Text style={styles.callButtonText}>Call Driver</Text>
//           </View>
//         </TouchableOpacity> */}
//       </View>
//     </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: '#f7f8fa',
//     marginTop: 8, 
//   },
//   infoCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//     overflow: 'hidden',
//     marginHorizontal: 8,
//     marginBottom: 8,
//   },
//   cardTitle: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//     textAlign: 'center',
//     paddingVertical: 12,
//   },
//   infoSection: {
//     padding: 8,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   infoItem: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 8,
//   },
//   icon: {
//     width: 36,
//     height: 36,
//     resizeMode: 'contain',
//     marginBottom: 8,
//   },
//   label: {
//     fontSize: 14,
//     color: '#757575',
//     marginBottom: 4,
//     fontWeight: '500',
//   },
//   value: {
//     fontSize: 16,
//     color: '#333',
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   valueHighlight: {
//     fontSize: 16,
//     color: '#007AFF',
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   valueAccent: {
//     fontSize: 16,
//     color: '#FF5733',
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#E0E0E0',
//     marginVertical: 8,
//     marginHorizontal: 8,
//   },
//   callButtonContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   callButton: {
//     backgroundColor: '#7E57C2',
//     paddingVertical: 12,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#7E57C2',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 2,
//   },
//   callButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default MapIndex;