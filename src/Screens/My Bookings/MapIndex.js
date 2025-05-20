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
          `${coordinates?.coords[1]},${coordinates?.coords[0]}`
        );
        console.log(
          'Source Coordinates set to:',
          `${coordinates?.coords[1]},${coordinates?.coords[0]}`
        );
        console.log('Fetching direction data...');
        await fetchDirectionData('driving');
      } else {
        console.log(
          'Coordinates or eloc are missing, skipping fetchDirectionData'
        );
        setIsLoading(false);
        setError('Location data not available');
      }
    };
  
    // Call the fetch data once initially
    fetchData();
  
    // Set up interval for refreshing data
    const intervalId = setInterval(() => {
      console.log('Refreshing trip details...');
      fetchData();
    }, 30000); 
  
    return () => clearInterval(intervalId);
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

  const renderInfoItem = (icon, label, value, valueStyle = styles.value) => (
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
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
    padding: 8, // Reduced padding
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10, // Smaller border radius
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2}, // Reduced shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#4A90E2',
    paddingVertical: 6, // Reduced padding
    paddingHorizontal: 16,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16, // Reduced font size
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  errorContainer: {
    backgroundColor: '#ffe6e6',
    padding: 8, // Reduced padding
    borderBottomWidth: 1,
    borderBottomColor: '#ffcccc',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12, // Reduced font size
    textAlign: 'center',
    fontWeight: '500',
  },
  infoSection: {
    padding: 6, // Reduced padding
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4, // Reduced margin
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8, // Reduced padding
  },
  iconContainer: {
    backgroundColor: '#f0f4ff',
    padding: 8, // Reduced padding
    borderRadius: 25, // Smaller border radius
    marginBottom: 6, // Reduced margin
  },
  icon: {
    width: 20, // Smaller icon
    height: 20, // Smaller icon
    resizeMode: 'contain',
    tintColor: '#4A90E2',
  },
  label: {
    fontSize: 12, // Reduced font size
    color: '#666',
    marginBottom: 4, // Reduced margin
    fontWeight: '600',
    textAlign: 'center',
  },
  value: {
    fontSize: 14, // Reduced font size
    color: '#333',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16, // Reduced line height
  },
  valueHighlight: {
    fontSize: 14, // Reduced font size
    color: '#2E7D32',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16, // Reduced line height
  },
  valueAccent: {
    fontSize: 14, // Reduced font size
    color: '#D32F2F',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16, // Reduced line height
  },
  divider: {
    height: 1,
    backgroundColor: '#E8EAF0',
    marginVertical: 10, // Reduced margin
    marginHorizontal: 10, // Reduced margin
  },
});

export default MapIndex;