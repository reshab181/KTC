// import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback, useMemo, memo} from 'react';
import {useSelector} from 'react-redux';
import MapplsGL from 'mappls-map-react-native';
import Polyline from 'mappls-polyline';

const {height, width} = Dimensions.get('screen');

const MapIndex = props => {
  const {item, autoUpdateInterval = 30000, enableAutoUpdate = true} = props;
  const coordinates = useSelector(state => state?.coords?.coords);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  
  const intervalRef = useRef(null);
  const isFirstLoad = useRef(true);

  // Memoized and stabilized coordinates to prevent unnecessary API calls
  const stableSourceCoords = useMemo(() => {
    if (coordinates?.coords && Array.isArray(coordinates.coords) && coordinates.coords.length === 2) {
      return coordinates.coords;
    }
    return null;
  }, [coordinates?.coords]);

  const stableDestination = useMemo(() => {
    return item?.eloc || null;
  }, [item?.eloc]);

  const sourceCoordinates = useMemo(() => {
    if (stableSourceCoords) {
      return `${stableSourceCoords[1]},${stableSourceCoords[0]}`;
    }
    return null;
  }, [stableSourceCoords]);

  // Optimized formatting functions
  const getFormattedDistance = useCallback(distance => {
    if (!distance || distance === 0) return 'N/A';

    if (distance / 1000 < 1) {
      return `${Math.round(distance)} m`;
    }
    const dis = (distance / 1000).toFixed(1);
    return `${dis} km`;
  }, []);

  const getFormattedDuration = useCallback(duration => {
    if (!duration || duration === 0) return 'N/A';

    const min = Math.round((duration % 3600) / 60);
    const hours = Math.floor(duration / 3600);

    if (hours > 0) {
      return min > 0 ? `${hours}h ${min}m` : `${hours}h`;
    }
    return `${min}m`;
  }, []);

  // Main API call function with error handling and optimization
  const fetchDirectionData = useCallback(async (profile = 'driving', isManualRefresh = false) => {
    if (!sourceCoordinates || !stableDestination) {
      console.log('Source coordinates or destination not available');
      setIsLoading(false);
      setError('Location data not available');
      return;
    }

    if (isFirstLoad.current) {
      setIsLoading(true);
    }
    setError(null);

    try {
      console.log('Fetching direction data...');
      console.log('Source:', sourceCoordinates);
      console.log('Destination:', stableDestination);

      const response = await MapplsGL?.RestApi?.direction({
        origin: sourceCoordinates,
        destination: stableDestination,
        profile,
        resource: 'route_eta',
        traffic: true,
        overview: MapplsGL?.RestApi?.DirectionsCriteria?.OVERVIEW_FULL,
        geometries: 'polyline6',
      });

      console.log('Direction API Response:', response);

      if (response?.routes && response.routes.length > 0) {
        const route = response.routes[0];
        
        const newDistance = getFormattedDistance(route.distance);
        const newDuration = getFormattedDuration(route.duration);

        // Only update state if values have changed
        setDistance(prev => prev !== newDistance ? newDistance : prev);
        setDuration(prev => prev !== newDuration ? newDuration : prev);
        setLastUpdateTime(new Date());
        
        console.log('Route data updated successfully');
      } else {
        console.log('No routes found in the direction API response.');
        setDistance('Not available');
        setDuration('Not available');
        setError('No route found');
      }
    } catch (error) {
      console.error('Direction API Error:', error?.message);
      setError('Unable to fetch route information');
      setDistance('Error');
      setDuration('Error');
    } finally {
      setIsLoading(false);
      isFirstLoad.current = false;
    }
  }, [sourceCoordinates, stableDestination, getFormattedDistance, getFormattedDuration]);

  // Auto-update functionality
  const startAutoUpdate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (enableAutoUpdate) {
      intervalRef.current = setInterval(() => {
        console.log('Auto-refreshing trip details...');
        fetchDirectionData();
      }, autoUpdateInterval);
    }
  }, [enableAutoUpdate, autoUpdateInterval, fetchDirectionData]);

  const stopAutoUpdate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Initial fetch effect
  useEffect(() => {
    if (sourceCoordinates && stableDestination) {
      console.log('MapIndex: Initial data fetch');
      fetchDirectionData();
    } else {
      console.log('MapIndex: Missing coordinates or destination');
      setIsLoading(false);
      if (!sourceCoordinates) {
        setError('Driver location not available');
      } else if (!stableDestination) {
        setError('Destination not available');
      }
    }
  }, []); // Only run once on mount

  // Auto-update effect
  useEffect(() => {
    if (enableAutoUpdate && !isLoading && !error) {
      startAutoUpdate();
    } else {
      stopAutoUpdate();
    }

    return () => stopAutoUpdate();
  }, [enableAutoUpdate, autoUpdateInterval, startAutoUpdate, stopAutoUpdate, isLoading, error]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoUpdate();
    };
  }, [stopAutoUpdate]);

  // Memoized render functions to prevent unnecessary re-renders
  const renderInfoItem = useCallback((icon, label, value, valueStyle = styles.value) => (
    <View style={styles.infoItem}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={icon} />
      </View>
      <Text style={styles.label}>{label}</Text>
      {isLoading && (label === 'Distance' || label === 'Duration') ? (
        <ActivityIndicator size="small" color="#4A90E2" />
      ) : (
        <Text style={valueStyle} numberOfLines={1} ellipsizeMode="tail">
          {value}
        </Text>
      )}
    </View>
  ), [isLoading]);

  // Memoized error display
  const errorDisplay = useMemo(() => {
    if (!error) return null;
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
      </View>
    );
  }, [error]);

  // Memoized last update time display
  const lastUpdateDisplay = useMemo(() => {
    if (!lastUpdateTime) return null;
    return (
      <View style={styles.updateTimeContainer}>
        <Text style={styles.updateTimeText}>
          Last updated: {lastUpdateTime.toLocaleTimeString()}
        </Text>
      </View>
    );
  }, [lastUpdateTime]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Trip Details</Text>
          </View>

          {errorDisplay}
          {/* {lastUpdateDisplay} */}

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              {renderInfoItem(
                require('../../assets/route.png'),
                'Distance',
                distance || 'Calculating...',
              )}

              {renderInfoItem(
                require('../../assets/mapcar.png'),
                'Vehicle Type',
                item?.vehiclerequested || 'Not specified',
                styles.valueHighlight,
              )}
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              {renderInfoItem(
                require('../../assets/clock.png'),
                'Duration',
                duration || 'Calculating...',
              )}

              {renderInfoItem(
                require('../../assets/dl.png'),
                'Vehicle Number',
                item?.vehicle_no || 'Not assigned',
                styles.valueAccent,
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  container: {
    flex: 1,
    padding: 8, 
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2}, 
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#3C3567',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16, 
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  errorContainer: {
    backgroundColor: '#ffe6e6',
    padding: 8, 
    borderBottomWidth: 1,
    borderBottomColor: '#ffcccc',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  updateTimeContainer: {
    backgroundColor: '#f0f8ff',
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e8f0',
  },
  updateTimeText: {
    color: '#4A90E2',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
  },
  infoSection: {
    padding: 6, 
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4, 
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  iconContainer: {
    backgroundColor: '#f0f4ff',
    padding: 8,
    borderRadius: 25, 
    marginBottom: 6, 
  },
  icon: {
    width: 20,
    height: 20, 
    resizeMode: 'contain',
    tintColor: '#4A90E2',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
    textAlign: 'center',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16, 
  },
  valueHighlight: {
    fontSize: 14, 
    color: '#2E7D32',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16,
  },
  valueAccent: {
    fontSize: 14, 
    color: '#D32F2F',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16,
   },
  divider: {
    height: 1,
    backgroundColor: '#E8EAF0',
    marginVertical: 10,
    marginHorizontal: 10, 
  },
});

export default MapIndex;