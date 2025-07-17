import React, {useState, useEffect, useRef, useCallback, useMemo,memo} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  useColorScheme,SafeAreaView
} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import polyline from 'mappls-polyline';
import exampleIcon from '../../assets/car.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = {
  safeArea:{
    flex:1
  },
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
    bottom: 170,
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
    bottom: 70,
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

const MemoizedMap = memo(({ route, customerLocation, driverLocation }) => (
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
    <MapplsGL.Camera zoomLevel={12} centerCoordinate={driverLocation} />
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
  const [driverLocation, setDriverLocation] = useState([0, 0]); 
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

  // Memoized camera config to prevent re-render - now uses driverLocation
  const cameraConfig = useMemo(
    () => ({
      zoomLevel: 12,
      centerCoordinate: driverLocation,
    }),
    [driverLocation],
  );


  const callApi = useCallback(
    async (profile = 'driving', isManualRefresh = false) => {
      if (isManualRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        let source = '';
        let sourceCoords = null;
        if (
          sourceCoordinates &&
          Array.isArray(sourceCoordinates) &&
          sourceCoordinates.length === 2
        ) {
          source = formatCoordinates(sourceCoordinates);
          sourceCoords = [sourceCoordinates[1], sourceCoordinates[0]]; // Driver location coordinates
        } else if (
          coordinates?.coords?.coords &&
          Array.isArray(coordinates.coords.coords) &&
          coordinates.coords.coords.length === 2
        ) {
          source = formatCoordinates(coordinates.coords.coords);
          sourceCoords = [coordinates.coords.coords[1], coordinates.coords.coords[0]]; // Driver location coordinates
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
          resource: 'route_eta',
          traffic: true,
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

          // Set driver location (source coordinates) for camera focus
          if (sourceCoords) {
            setDriverLocation(prevLoc => {
              if (
                !prevLoc ||
                prevLoc[0] !== sourceCoords[0] ||
                prevLoc[1] !== sourceCoords[1]
              ) {
                return sourceCoords;
              }
              return prevLoc;
            });
          }

          // Set customer location (destination)
          if (destCoords) {
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
          } else if (
            routeGeoJSON?.coordinates &&
            routeGeoJSON.coordinates.length > 1
          ) {
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
      // Set initial driver location for camera
      if (sourceCoordinates?.[1] && sourceCoordinates?.[0]) {
        setDriverLocation([sourceCoordinates[1], sourceCoordinates[0]]);
      }
      await callApi();
    };
    initializeComponent();
  }, []);

  
  useEffect(() => {
  if (
    coordinates?.coords?.coords &&
    Array.isArray(coordinates.coords.coords) &&
    coordinates.coords.coords.length === 2
  ) {
    callApi(); 
  }
}, [coordinates]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      callApi();
    }, 3000);

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
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <>
          <MemoizedMap 
            route={route} 
            customerLocation={customerLocation} 
            driverLocation={driverLocation} 
          />
{/* 
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
          )} */}

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
    </SafeAreaView>
  );
};

export default GetDirection;



