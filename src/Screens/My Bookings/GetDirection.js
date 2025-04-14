import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
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
    backdropFilter: 'blur(10px)', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6.27,
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
  lineStyle: {
    lineColor: '#007BFF', 
    lineCap: 'round',
    lineWidth: 6,
    lineOpacity: 0.9,
    lineJoin: 'round',
    lineBlur: 1,
  },
};


const GetDirection = (props) => {
  const { item, eloc, coordinates } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [destinationCoordinates, setDestinationCoordinates] = useState(item?.eloc);
  const [sourceCoordinates, setSourceCoordinates] = useState('');
  const [center, setCenter] = useState([0, 0]);
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const cameraRef = useRef();

  const getFormattedDistance = (distance) => {
    if (distance / 1000 < 1) {
      return distance + ' meter';
    }
    let dis = distance / 1000;
    dis = dis.toFixed(2);
    return dis + ' kilometer';
  };

  const getFormattedDuration = (duration) => {
    let min = parseInt((duration % 3600) / 60);
    let hours = parseInt((duration % 86400) / 3600);
    let days = parseInt(duration / 86400);

    if (days > 0) {
      return (
        days +
        ' ' +
        (days > 1 ? 'Days' : 'Day') +
        ' ' +
        hours +
        ' hour' +
        (min > 0 ? ' ' + min + ' minute' : '')
      );
    } else {
      return hours > 0
        ? hours + ' hour' + (min > 0 ? ' ' + min + ' minute' : '')
        : min + ' minute';
    }
  };

  const callApi = async (profile = 'driving') => {
    setIsLoading(true);

    try {
      if (!sourceCoordinates || !destinationCoordinates) {
        console.log('Source or destination coordinates missing');
        setIsLoading(false);
        return;
      }

      const response = await MapplsGL.RestApi.direction({
        origin: sourceCoordinates,
        destination: destinationCoordinates,
        profile: profile,
        overview: MapplsGL?.RestApi?.DirectionsCriteria?.OVERVIEW_FULL,
        geometries: 'polyline6',
      });

      if (response?.routes && response.routes[0]) {
        const routeGeometry = response.routes[0].geometry;
        const routeGeoJSON = polyline.toGeoJSON(routeGeometry, 6);

        setRoute(routeGeoJSON);

        if (routeGeoJSON?.coordinates && routeGeoJSON.coordinates.length > 0) {
          setCenter(routeGeoJSON.coordinates[0]);
        }

        setDistance(getFormattedDistance(response.routes[0].distance));
        setDuration(getFormattedDuration(response.routes[0].duration));
      } else {
        console.log('No routes found in response');
      }
    } catch (error) {
      console.log('Direction API error:', error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeComponent = async () => {
      if (coordinates?.coords) {
        const sourceCoords = `${coordinates.coords[1]},${coordinates.coords[0]}`;
        setSourceCoordinates(sourceCoords);
        setCenter([coordinates.coords[1], coordinates.coords[0]]);

        const destination = item?.eloc;
        if (destination) {
          setDestinationCoordinates(destination);
          await callApi('driving');
        }
      }
    };

    initializeComponent();
  }, [coordinates]);

  return (
    <View style={styles.container}>
      {isLoading && !route ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <>
          <MapplsGL.MapView style={styles.container}>
            <MapplsGL.Camera
              zoomLevel={16}
              minZoomLevel={10}
              maxZoomLevel={30}
              ref={cameraRef}
              centerCoordinate={center}
            />

            {route && (
              <MapplsGL.ShapeSource id="routeSource" shape={route}>
                <MapplsGL.SymbolLayer
                  id="symbolLocationSymbols"
                  minZoomLevel={1}
                  style={styles.icon}
                />
                <MapplsGL.LineLayer id="routeFill" style={styles.lineStyle} />
              </MapplsGL.ShapeSource>
            )}
          </MapplsGL.MapView>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => callApi('driving')}
          >
            <FontAwesome
              name="refresh"
              size={30}
              color={'#000'}
              style={styles.refreshIcon}
            />
          </TouchableOpacity>

          {distance && duration && (
            <View style={styles.distanceInfo}>
              <Text style={styles.infoText}>Distance: {distance}</Text>
              <Text style={styles.infoText}>Duration: {duration}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default GetDirection;
