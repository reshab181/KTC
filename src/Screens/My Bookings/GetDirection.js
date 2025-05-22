import React, {useState, useEffect, useRef, useCallback, useMemo,memo} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  useColorScheme,
} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import polyline from 'mappls-polyline';
import exampleIcon from '../../assets/car.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  refreshButton: {
    backgroundColor: '#ffffff',
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: 110,
    right: 20,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  refreshIcon: {
    padding: 10,
  },
  distanceInfo: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 15,
    borderRadius: 12,
    elevation: 8,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  icon: {
    iconImage: exampleIcon,
    iconAllowOverlap: true,
    iconSize: 1,
    iconAnchor: 'bottom',
    iconColor: 'red',
  },
  customerMarkerIcon: {
    iconSize: 0.7,
    iconAllowOverlap: true,
    iconAnchor: 'bottom',
  },
  lineStyle: {
    lineColor: '#007BFF',
    lineCap: 'round',
    lineWidth: 6,
    lineOpacity: 0.9,
    lineJoin: 'round',
    lineBlur: 1,
  },
  statusIndicator: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
};

const CustomerMarker = React.memo(
  ({coordinate}) => {
    if (!coordinate) return null;

    return (
      <MapplsGL.PointAnnotation id="customerMarker" coordinate={coordinate}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: '#FF4444',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: 'white',
          }}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
            📍
          </Text>
        </View>
      </MapplsGL.PointAnnotation>
    );
  },
  (prev, next) =>
    JSON.stringify(prev.coordinate) === JSON.stringify(next.coordinate),
);


const RouteShape = React.memo(
  ({route}) => {
    if (!route) return null;

    return (
      <MapplsGL.ShapeSource id="routeSource" shape={route}>
        <MapplsGL.SymbolLayer id="symbolLocationSymbols" style={styles.icon} />
        <MapplsGL.LineLayer id="routeFill" style={styles.lineStyle} />
      </MapplsGL.ShapeSource>
    );
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.route) === JSON.stringify(nextProps.route),
);

const MemoizedMap = memo(({ route, customerLocation }) => (
  <MapplsGL.MapView
    style={{ flex: 1 }}
    logoEnabled={false}
    compassEnabled={true}
    scaleBarEnabled={false}
    zoomEnabled={true}
    scrollEnabled={true}
    pitchEnabled={true}
    rotateEnabled={true}
    attributionEnabled={false}
    onDidFinishLoadingMap={() => console.log('Map Loaded')}
  >
    <MapplsGL.Camera zoomLevel={12} centerCoordinate={customerLocation} />
    <RouteShape route={route} />
    <CustomerMarker coordinate={customerLocation} />
  </MapplsGL.MapView>
));

const GetDirection = ({
  item,
  eloc,
  coordinates,
  sourceCoordinates,
  destinationCoordinates,
  autoUpdateInterval = 30000,
  enableAutoUpdate = true,
  onRouteUpdate = null,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [center, setCenter] = useState([0, 0]);
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [customerLocation, setCustomerLocation] = useState(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const cameraRef = useRef();
  const intervalRef = useRef(null);

  const mapviewRef = useRef();
  const colorScheme = useColorScheme();

  // Memoized formatCoordinates to prevent recreation on every render
  const formatCoordinates = useCallback(
    coords =>
      Array.isArray(coords) && coords.length === 2
        ? `${coords[1]},${coords[0]}`
        : coords,
    [],
  );

  const getFormattedDistance = useCallback(
    distance =>
      distance / 1000 < 1
        ? `${distance} meter`
        : `${(distance / 1000).toFixed(2)} kilometer`,
    [],
  );

  const getFormattedDuration = useCallback(duration => {
    const min = Math.floor((duration % 3600) / 60);
    const hours = Math.floor((duration % 86400) / 3600);
    const days = Math.floor(duration / 86400);
    return days > 0
      ? `${days} ${days > 1 ? 'Days' : 'Day'} ${hours} hour${
          min > 0 ? ' ' + min + ' minute' : ''
        }`
      : hours > 0
      ? `${hours} hour${min > 0 ? ' ' + min + ' minute' : ''}`
      : `${min} minute`;
  }, []);

  // Memoized camera config to prevent re-render
  const cameraConfig = useMemo(
    () => ({
      zoomLevel: 12,
      centerCoordinate: center,
    }),
    [center],
  );

  // Optimized callApi with useCallback
  const callApi = useCallback(
    async (profile = 'driving', isManualRefresh = false) => {
      if (isManualRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        let source = '';
        if (
          sourceCoordinates &&
          Array.isArray(sourceCoordinates) &&
          sourceCoordinates.length === 2
        ) {
          source = formatCoordinates(sourceCoordinates);
        } else if (
          coordinates?.coords?.coords &&
          Array.isArray(coordinates.coords.coords) &&
          coordinates.coords.coords.length === 2
        ) {
          source = formatCoordinates(coordinates.coords.coords);
        } else {
          console.error('No valid source coordinates.');
          setIsLoading(false);
          return;
        }

        let destination = '';
        let destCoords = null;

        if (
          destinationCoordinates &&
          Array.isArray(destinationCoordinates) &&
          destinationCoordinates.length === 2
        ) {
          destination = formatCoordinates(destinationCoordinates);
          destCoords = [destinationCoordinates[1], destinationCoordinates[0]];
        } else if (item?.eloc) {
          destination = item.eloc;
        } else if (eloc) {
          destination = eloc;
        } else {
          console.error('No valid destination coordinates.');
          setIsLoading(false);
          return;
        }

        if (!source || !destination) {
          console.error('Source or Destination is invalid.');
          setIsLoading(false);
          return;
        }

        const response = await MapplsGL?.RestApi?.direction({
          origin: source,
          destination: destination,
          profile: profile,
          overview: MapplsGL?.RestApi?.DirectionsCriteria?.OVERVIEW_FULL,
          geometries: 'polyline6',
        });

        if (response?.routes && response.routes[0]) {
          const routeGeometry = response.routes[0].geometry;
          const routeGeoJSON = polyline.toGeoJSON(routeGeometry, 6);

          // Only update state if route has actually changed
          setRoute(prevRoute => {
            if (JSON.stringify(prevRoute) !== JSON.stringify(routeGeoJSON)) {
              return routeGeoJSON;
            }
            return prevRoute;
          });

          if (
            routeGeoJSON?.coordinates &&
            routeGeoJSON.coordinates.length > 0
          ) {
            // Only update center if it has actually changed
            setCenter(prevCenter => {
              const newCenter = routeGeoJSON.coordinates[0];
              if (
                prevCenter[0] !== newCenter[0] ||
                prevCenter[1] !== newCenter[1]
              ) {
                return newCenter;
              }
              return prevCenter;
            });

            if (!destCoords && routeGeoJSON.coordinates.length > 1) {
              const lastCoordinate =
                routeGeoJSON.coordinates[routeGeoJSON.coordinates.length - 1];
              setCustomerLocation(prevLoc => {
                if (
                  !prevLoc ||
                  prevLoc[0] !== lastCoordinate[0] ||
                  prevLoc[1] !== lastCoordinate[1]
                ) {
                  return lastCoordinate;
                }
                return prevLoc;
              });
            } else if (destCoords) {
              setCustomerLocation(prevLoc => {
                if (
                  !prevLoc ||
                  prevLoc[0] !== destCoords[0] ||
                  prevLoc[1] !== destCoords[1]
                ) {
                  return destCoords;
                }
                return prevLoc;
              });
            }
          }

          const newDistance = getFormattedDistance(response.routes[0].distance);
          const newDuration = getFormattedDuration(response.routes[0].duration);

          // Only update if values have changed
          setDistance(prev => (prev !== newDistance ? newDistance : prev));
          setDuration(prev => (prev !== newDuration ? newDuration : prev));
          setLastUpdateTime(new Date());

          if (onRouteUpdate) {
            onRouteUpdate({
              distance: newDistance,
              duration: newDuration,
              route: routeGeoJSON,
              updateTime: new Date(),
            });
          }
        }
      } catch (error) {
        console.error('Direction API Error:', error?.message);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [
      formatCoordinates,
      getFormattedDistance,
      getFormattedDuration,
      sourceCoordinates,
      destinationCoordinates,
      coordinates,
      item?.eloc,
      eloc,
      onRouteUpdate,
    ],
  );

  const startAutoUpdate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (enableAutoUpdate) {
      intervalRef.current = setInterval(() => {
        callApi();
      }, autoUpdateInterval);
    }
  }, [enableAutoUpdate, autoUpdateInterval, callApi]);

  const stopAutoUpdate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const manualRefresh = useCallback(() => {
    callApi('driving', true);
  }, [callApi]);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }, []);

  // Initial setup - only run once
  useEffect(() => {
    const initializeComponent = async () => {
      await requestLocationPermission();
      if (sourceCoordinates?.[1] && sourceCoordinates?.[0]) {
        setCenter([sourceCoordinates[1], sourceCoordinates[0]]);
      }
      await callApi();
    };
    initializeComponent();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      callApi();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [sourceCoordinates, destinationCoordinates, item?.eloc, eloc]);

  useEffect(() => {
    if (enableAutoUpdate) {
      startAutoUpdate();
    } else {
      stopAutoUpdate();
    }
    return () => stopAutoUpdate();
  }, [enableAutoUpdate, autoUpdateInterval, startAutoUpdate, stopAutoUpdate]);

  // Memoized distance info to prevent re-render
  const distanceInfo = useMemo(
    () =>
      distance &&
      duration && (
        <View style={styles.distanceInfo}>
          <Text style={styles.infoText}>Distance: {distance}</Text>
          <Text style={styles.infoText}>Duration: {duration}</Text>
        </View>
      ),
    [distance, duration],
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <>
  <MemoizedMap route={route} customerLocation={customerLocation} />

          {lastUpdateTime && (
            <View style={styles.statusIndicator}>
              <Text
                style={[
                  styles.statusText,
                  {color: colorScheme === 'dark' ? '#000000' : '#000000'},
                ]}>
                Last updated: {lastUpdateTime.toLocaleTimeString()}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={manualRefresh}
            disabled={isRefreshing}>
            <FontAwesome
              name="refresh"
              size={30}
              color={isRefreshing ? '#ccc' : '#000'}
              style={[
                styles.refreshIcon,
                isRefreshing && {transform: [{rotate: '180deg'}]},
              ]}
            />
          </TouchableOpacity>

          {distanceInfo}
        </>
      )}
    </View>
  );
};

export default GetDirection;

// import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   ActivityIndicator,
//   Platform,
//   PermissionsAndroid,
//   useColorScheme,
//   Alert,
//   Linking,
// } from 'react-native';
// import MapplsGL from 'mappls-map-react-native';
// import polyline from 'mappls-polyline';
// import exampleIcon from '../../assets/car.png';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Geolocation from '@react-native-community/geolocation'

// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   refreshButton: {
//     backgroundColor: '#ffffff',
//     width: 55,
//     height: 55,
//     position: 'absolute',
//     bottom: 110,
//     right: 20,
//     borderRadius: 27.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 10,
//   },
//   refreshIcon: {
//     padding: 10,
//   },
//   distanceInfo: {
//     position: 'absolute',
//     bottom: 10,
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(255,255,255,0.95)',
//     padding: 15,
//     borderRadius: 12,
//     elevation: 8,
//   },
//   infoText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 5,
//   },
//   trafficText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#666',
//     marginBottom: 3,
//   },
//   icon: {
//     iconImage: exampleIcon,
//     iconAllowOverlap: true,
//     iconSize: 1,
//     iconAnchor: 'bottom',
//     iconColor: 'red',
//   },
//   customerMarkerIcon: {
//     iconSize: 0.7,
//     iconAllowOverlap: true,
//     iconAnchor: 'bottom',
//   },
//   lineStyle: {
//     lineColor: '#007BFF',
//     lineCap: 'round',
//     lineWidth: 6,
//     lineOpacity: 0.9,
//     lineJoin: 'round',
//     lineBlur: 1,
//   },
//   trafficLineStyle: {
//     lineColor: '#FF6B35',
//     lineCap: 'round',
//     lineWidth: 8,
//     lineOpacity: 0.8,
//     lineJoin: 'round',
//     lineBlur: 2,
//   },
//   statusIndicator: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 20,
//     elevation: 5,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   permissionAlert: {
//     position: 'absolute',
//     top: 100,
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(255,215,0,0.9)',
//     padding: 12,
//     borderRadius: 8,
//     elevation: 5,
//   },
//   alertText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#333',
//     textAlign: 'center',
//   },
// };

// const CustomerMarker = React.memo(({coordinate, isMoving = false}) => {
//   if (!coordinate) return null;

//   return (
//     <MapplsGL.PointAnnotation id="customerMarker" coordinate={coordinate}>
//       <View
//         style={{
//           width: 35,
//           height: 35,
//           borderRadius: 17.5,
//           backgroundColor: isMoving ? '#00FF00' : '#FF4444',
//           justifyContent: 'center',
//           alignItems: 'center',
//           borderWidth: 3,
//           borderColor: 'white',
//           shadowColor: '#000',
//           shadowOffset: {width: 0, height: 2},
//           shadowOpacity: 0.3,
//           shadowRadius: 4,
//           elevation: 5,
//         }}>
//         <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
//           {isMoving ? '🚗' : '📍'}
//         </Text>
//       </View>
//     </MapplsGL.PointAnnotation>
//   );
// });

// // Enhanced Route component with traffic support
// const RouteShape = React.memo(({route, useTrafficData = false}) => {
//   if (!route) return null;

//   return (
//     <MapplsGL.ShapeSource id="routeSource" shape={route}>
//       <MapplsGL.SymbolLayer id="symbolLocationSymbols" style={styles.icon} />
//       <MapplsGL.LineLayer
//         id="routeFill"
//         style={useTrafficData ? styles.trafficLineStyle : styles.lineStyle}
//       />
//     </MapplsGL.ShapeSource>
//   );
// });

// const GetDirection = ({
//   item,
//   eloc,
//   coordinates,
//   sourceCoordinates,
//   destinationCoordinates,
//   autoUpdateInterval = 30000,
//   enableAutoUpdate = true,
//   enableRealTimeTracking = true,
//   enableTrafficData = true,
//   onRouteUpdate = null,
//   onLocationUpdate = null,
// }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [center, setCenter] = useState([0, 0]);
//   const [route, setRoute] = useState(null);
//   const [distance, setDistance] = useState('');
//   const [duration, setDuration] = useState('');
//   const [trafficDuration, setTrafficDuration] = useState('');
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [lastUpdateTime, setLastUpdateTime] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [hasLocationPermission, setHasLocationPermission] = useState(false);
//   const [isVehicleMoving, setIsVehicleMoving] = useState(false);
//   const [previousLocation, setPreviousLocation] = useState(null);

//   const cameraRef = useRef();
//   const intervalRef = useRef(null);
//   const locationWatchId = useRef(null);
//   const mapviewRef = useRef();
//   const colorScheme = useColorScheme();

//   const openAppSettings = useCallback(() => {
//     if (Platform.OS === 'android') {
//       Linking.openSettings();
//     } else {
//       // For iOS
//       Linking.openURL('app-settings:');
//     }
//   }, []);
//   // Enhanced location permission handling
//   const requestLocationPermission = useCallback(async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//           PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//         ]);

//         const fineLocationGranted = granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED;
//         const coarseLocationGranted = granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED;

//         setHasLocationPermission(fineLocationGranted || coarseLocationGranted);

//         if (!fineLocationGranted && !coarseLocationGranted) {
//           Alert.alert(
//             'Location Permission Required',
//             'This app needs location permission to show real-time directions and track your vehicle.',
//             [
//               {text: 'Cancel', style: 'cancel'},
//               {
//                 text: 'Open Settings',
//                 onPress: openAppSettings,
//                 style: 'default'
//               },
//             ]
//           );
//         }

//         return fineLocationGranted || coarseLocationGranted;
//       } catch (err) {
//         console.warn('Permission request error:', err);
//         return false;
//       }
//     } else {
//       // iOS permission handling
//       return new Promise((resolve) => {
//         Geolocation.requestAuthorization('whenInUse').then((status) => {
//           const hasPermission = status === 'granted';
//           setHasLocationPermission(hasPermission);
//           resolve(hasPermission);
//         });
//       });
//     }
//   }, []);

//   // Calculate if vehicle is moving
//   const checkVehicleMovement = useCallback((newLocation, oldLocation) => {
//     if (!oldLocation || !newLocation) return false;

//     const distance = getDistanceBetweenCoordinates(
//       oldLocation.latitude,
//       oldLocation.longitude,
//       newLocation.latitude,
//       newLocation.longitude
//     );

//     // If moved more than 5 meters, consider as moving
//     return distance > 5;
//   }, []);

//   // Calculate distance between two coordinates
//   const getDistanceBetweenCoordinates = (lat1, lon1, lat2, lon2) => {
//     const R = 6371e3; // Earth's radius in meters
//     const φ1 = lat1 * Math.PI/180;
//     const φ2 = lat2 * Math.PI/180;
//     const Δφ = (lat2-lat1) * Math.PI/180;
//     const Δλ = (lon2-lon1) * Math.PI/180;

//     const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//             Math.cos(φ1) * Math.cos(φ2) *
//             Math.sin(Δλ/2) * Math.sin(Δλ/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

//     return R * c;
//   };

//   // Start real-time location tracking
//   const startLocationTracking = useCallback(() => {
//     if (!hasLocationPermission || !enableRealTimeTracking) return;

//     locationWatchId.current = Geolocation.watchPosition(
//       (position) => {
//         const newLocation = {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           accuracy: position.coords.accuracy,
//           timestamp: position.timestamp,
//         };

//         // Check if vehicle is moving
//         const isMoving = checkVehicleMovement(newLocation, previousLocation);
//         setIsVehicleMoving(isMoving);

//         setCurrentLocation(newLocation);
//         setPreviousLocation(newLocation);

//         if (onLocationUpdate) {
//           onLocationUpdate(newLocation, isMoving);
//         }

//         // Update route if vehicle moved significantly
//         if (isMoving) {
//           callApi('driving', false, [newLocation.longitude, newLocation.latitude]);
//         }
//       },
//       (error) => {
//         console.error('Location tracking error:', error);
//       },
//       {
//         enableHighAccuracy: true,
//         distanceFilter: 5, // Update every 5 meters
//         interval: 10000, // 10 seconds
//         fastestInterval: 5000, // 5 seconds
//         forceRequestLocation: true,
//         forceLocationManager: false,
//         showLocationDialog: true,
//         useSignificantChanges: false,
//       }
//     );
//   }, [hasLocationPermission, enableRealTimeTracking, checkVehicleMovement, previousLocation, onLocationUpdate]);

//   // Stop location tracking
//   const stopLocationTracking = useCallback(() => {
//     if (locationWatchId.current !== null) {
//       Geolocation.clearWatch(locationWatchId.current);
//       locationWatchId.current = null;
//     }
//   }, []);

//   const formatCoordinates = useCallback(
//     coords =>
//       Array.isArray(coords) && coords.length === 2
//         ? `${coords[1]},${coords[0]}`
//         : coords,
//     [],
//   );

//   const getFormattedDistance = useCallback(
//     distance =>
//       distance / 1000 < 1
//         ? `${distance} meters`
//         : `${(distance / 1000).toFixed(2)} km`,
//     [],
//   );

//   const getFormattedDuration = useCallback((duration) => {
//     const min = Math.floor((duration % 3600) / 60);
//     const hours = Math.floor((duration % 86400) / 3600);
//     const days = Math.floor(duration / 86400);
//     return days > 0
//       ? `${days} ${days > 1 ? 'days' : 'day'} ${hours}h ${min}m`
//       : hours > 0
//       ? `${hours}h ${min}m`
//       : `${min}m`;
//   }, []);

//   // Enhanced API call with traffic data
//   const callApi = useCallback(
//     async (profile = 'driving', isManualRefresh = false, overrideSource = null) => {
//       if (isManualRefresh) {
//         setIsRefreshing(true);
//       } else if (!route) {
//         setIsLoading(true);
//       }

//       try {
//         let source = '';

//         // Use override source (real-time location) if provided
//         if (overrideSource && Array.isArray(overrideSource) && overrideSource.length === 2) {
//           source = formatCoordinates(overrideSource);
//         } else if (currentLocation) {
//           // Use current tracked location
//           source = `${currentLocation.latitude},${currentLocation.longitude}`;
//         } else if (sourceCoordinates && Array.isArray(sourceCoordinates) && sourceCoordinates.length === 2) {
//           source = formatCoordinates(sourceCoordinates);
//         } else if (coordinates?.coords?.coords && Array.isArray(coordinates.coords.coords) && coordinates.coords.coords.length === 2) {
//           source = formatCoordinates(coordinates.coords.coords);
//         } else {
//           console.error('No valid source coordinates.');
//           setIsLoading(false);
//           return;
//         }

//         let destination = '';
//         let destCoords = null;

//         if (destinationCoordinates && Array.isArray(destinationCoordinates) && destinationCoordinates.length === 2) {
//           destination = formatCoordinates(destinationCoordinates);
//           destCoords = [destinationCoordinates[1], destinationCoordinates[0]];
//         } else if (item?.eloc) {
//           destination = item.eloc;
//         } else if (eloc) {
//           destination = eloc;
//         } else {
//           console.error('No valid destination coordinates.');
//           setIsLoading(false);
//           return;
//         }

//         if (!source || !destination) {
//           console.error('Source or Destination is invalid.');
//           setIsLoading(false);
//           return;
//         }

//         // Enhanced API call with traffic data
//         const apiParams = {
//           origin: source,
//           destination: destination,
//           profile: profile,
//           overview: MapplsGL?.RestApi?.DirectionsCriteria?.OVERVIEW_FULL,
//           geometries: 'polyline6',
//           steps: true,
//           // Enable traffic data if supported
//           ...(enableTrafficData && {
//             traffic: true,
//             departure_time: 'now',
//             alternatives: true,
//           }),
//         };

//         const response = await MapplsGL?.RestApi?.direction(apiParams);

//         if (response?.routes && response.routes[0]) {
//           // Choose the best route (considering traffic if available)
//           let bestRoute = response.routes[0];

//           if (enableTrafficData && response.routes.length > 1) {
//             // Find route with shortest duration considering traffic
//             bestRoute = response.routes.reduce((prev, current) => {
//               const prevDuration = prev.duration_in_traffic || prev.duration;
//               const currentDuration = current.duration_in_traffic || current.duration;
//               return currentDuration < prevDuration ? current : prev;
//             });
//           }

//           const routeGeometry = bestRoute.geometry;
//           const routeGeoJSON = polyline.toGeoJSON(routeGeometry, 6);

//           setRoute(prevRoute => {
//             if (JSON.stringify(prevRoute) !== JSON.stringify(routeGeoJSON)) {
//               return routeGeoJSON;
//             }
//             return prevRoute;
//           });

//           if (routeGeoJSON?.coordinates && routeGeoJSON.coordinates.length > 0) {
//             setCenter(prevCenter => {
//               const newCenter = routeGeoJSON.coordinates[0];
//               if (prevCenter[0] !== newCenter[0] || prevCenter[1] !== newCenter[1]) {
//                 return newCenter;
//               }
//               return prevCenter;
//             });

//             if (!destCoords && routeGeoJSON.coordinates.length > 1) {
//               const lastCoordinate = routeGeoJSON.coordinates[routeGeoJSON.coordinates.length - 1];
//               setCustomerLocation(lastCoordinate);
//             } else if (destCoords) {
//               setCustomerLocation(destCoords);
//             }
//           }

//           const newDistance = getFormattedDistance(bestRoute.distance);
//           const newDuration = getFormattedDuration(bestRoute.duration);
//           const newTrafficDuration = bestRoute.duration_in_traffic
//             ? getFormattedDuration(bestRoute.duration_in_traffic)
//             : null;

//           setDistance(newDistance);
//           setDuration(newDuration);
//           setTrafficDuration(newTrafficDuration);
//           setLastUpdateTime(new Date());

//           if (onRouteUpdate) {
//             onRouteUpdate({
//               distance: newDistance,
//               duration: newDuration,
//               trafficDuration: newTrafficDuration,
//               route: routeGeoJSON,
//               updateTime: new Date(),
//               isVehicleMoving,
//             });
//           }
//         }
//       } catch (error) {
//         console.error('Direction API Error:', error?.message);
//       } finally {
//         setIsLoading(false);
//         setIsRefreshing(false);
//       }
//     },
//     [
//       formatCoordinates,
//       getFormattedDistance,
//       getFormattedDuration,
//       sourceCoordinates,
//       destinationCoordinates,
//       coordinates,
//       currentLocation,
//       item?.eloc,
//       eloc,
//       enableTrafficData,
//       onRouteUpdate,
//       route,
//       isVehicleMoving,
//     ],
//   );

//   const startAutoUpdate = useCallback(() => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }

//     if (enableAutoUpdate) {
//       intervalRef.current = setInterval(() => {
//         callApi();
//       }, autoUpdateInterval);
//     }
//   }, [enableAutoUpdate, autoUpdateInterval, callApi]);

//   const stopAutoUpdate = useCallback(() => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   }, []);

//   const manualRefresh = useCallback(() => {
//     callApi('driving', true);
//   }, [callApi]);

//   const cameraConfig = useMemo(
//     () => ({
//       zoomLevel: 15,
//       centerCoordinate: center,
//       animationDuration: 1000,
//     }),
//     [center],
//   );

//   // Initialize component
//   useEffect(() => {
//     const initializeComponent = async () => {
//       const hasPermission = await requestLocationPermission();

//       if (hasPermission && enableRealTimeTracking) {
//         startLocationTracking();
//       }

//       if (sourceCoordinates?.[1] && sourceCoordinates?.[0]) {
//         setCenter([sourceCoordinates[1], sourceCoordinates[0]]);
//       }

//       await callApi();
//     };

//     initializeComponent();

//     // Cleanup function
//     return () => {
//       stopLocationTracking();
//       stopAutoUpdate();
//     };
//   }, []);

//   // Handle coordinate changes
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       callApi();
//     }, 1000);

//     return () => clearTimeout(timeoutId);
//   }, [sourceCoordinates, destinationCoordinates, item?.eloc, eloc]);

//   // Handle auto-update
//   useEffect(() => {
//     if (enableAutoUpdate && hasLocationPermission) {
//       startAutoUpdate();
//     } else {
//       stopAutoUpdate();
//     }
//     return () => stopAutoUpdate();
//   }, [enableAutoUpdate, autoUpdateInterval, hasLocationPermission, startAutoUpdate, stopAutoUpdate]);

//   // Enhanced distance info with traffic data
//   const distanceInfo = useMemo(() => {
//     if (!distance || !duration) return null;

//     return (
//       <View style={styles.distanceInfo}>
//         <Text style={styles.infoText}>Distance: {distance}</Text>
//         <Text style={styles.infoText}>
//           Duration: {duration}
//           {trafficDuration && trafficDuration !== duration && (
//             <Text style={styles.trafficText}> (Traffic: {trafficDuration})</Text>
//           )}
//         </Text>
//         {enableTrafficData && trafficDuration && (
//           <Text style={styles.trafficText}>
//             🚦 Live traffic data included
//           </Text>
//         )}
//         {isVehicleMoving && (
//           <Text style={[styles.trafficText, {color: '#00AA00'}]}>
//             🚗 Vehicle is moving
//           </Text>
//         )}
//       </View>
//     );
//   }, [distance, duration, trafficDuration, enableTrafficData, isVehicleMoving]);

//   return (
//     <View style={styles.container}>
//       {!hasLocationPermission && (
//         <View style={styles.permissionAlert}>
//           <Text style={styles.alertText}>
//             Location permission required for real-time tracking
//           </Text>
//         </View>
//       )}

//       {isLoading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="blue" />
//           <Text style={{marginTop: 10, fontSize: 16}}>
//             Loading route with traffic data...
//           </Text>
//         </View>
//       ) : (
//         <>
//           <MapplsGL.MapView ref={mapviewRef} style={styles.container}>
//             <MapplsGL.Camera ref={cameraRef} {...cameraConfig} />
//             <RouteShape route={route} useTrafficData={enableTrafficData} />
//             <CustomerMarker coordinate={customerLocation} isMoving={isVehicleMoving} />
//           </MapplsGL.MapView>

//           {lastUpdateTime && (
//             <View style={styles.statusIndicator}>
//               <Text style={[styles.statusText, {color: colorScheme === 'dark' ? '#000000' : '#000000'}]}>
//                 Last updated: {lastUpdateTime.toLocaleTimeString()}
//                 {enableRealTimeTracking && hasLocationPermission && (
//                   <Text style={{color: '#00AA00'}}> • Live</Text>
//                 )}
//               </Text>
//             </View>
//           )}

//           <TouchableOpacity
//             style={styles.refreshButton}
//             onPress={manualRefresh}
//             disabled={isRefreshing}>
//             <FontAwesome
//               name="refresh"
//               size={30}
//               color={isRefreshing ? '#ccc' : '#000'}
//               style={[
//                 styles.refreshIcon,
//                 isRefreshing && {transform: [{rotate: '180deg'}]},
//               ]}
//             />
//           </TouchableOpacity>

//           {distanceInfo}
//         </>
//       )}
//     </View>
//   );
// };

// export default GetDirection;

