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
import  Polyline from 'mappls-polyline';


const { height, width } = Dimensions.get('screen');

const MapIndex = (props) => {
  const { item } = props;
  const coordinates = useSelector((state) => state?.coords?.coords);
  const [destinationCoordinates, setDestinationCoordinates] = useState(item?.eloc);
  const [sourceCoordinates, setSourceCoordinates] = useState(
    `${coordinates?.coords[1]},${coordinates?.coords[0]}`
  );
  const [center, setcenter] = useState(coordinates?.coords[0], coordinates?.coords[1])
  const [route, setroute] = useState("")
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (coordinates?.coords && item?.eloc) {
        setSourceCoordinates(
          `${coordinates?.coords[1]},${coordinates?.coords[0]}`
        );
        await fetchDirectionData('driving');
      }
    };
    fetchData();
  }, [coordinates?.coords, item?.eloc]);

  const fetchDirectionData = async (profile) => {
    try {
      const data = await MapplsGL.RestApi.direction({
        origin: sourceCoordinates,
        destination: destinationCoordinates,
        profile,
        overview: MapplsGL.RestApi.DirectionsCriteria.OVERVIEW_FULL,
        geometries: 'polyline6',
      });
      let routeGeoJSON = Polyline?.toGeoJSON(data?.routes[0]?.geometry, 6);
      setDistance(getFormattedDistance(data?.routes[0]?.distance));
      setDuration(getFormattedDuration(data?.routes[0]?.duration));
      setroute(routeGeoJSON)
      setcenter(routeGeoJSON?.coordinates[0])
    } catch (error) {
      console.error('Direction API Error:', error?.message);
    }
  };

  const getFormattedDistance = (distance) => {
    if (distance / 1000 < 1) {
      return distance + ' meter';
    }
    const dis = (distance / 1000).toFixed(2);
    return dis + ' kilometer';
  };

  const getFormattedDuration = (duration) => {
    const min = parseInt((duration % 3600) / 60);
    const hours = parseInt((duration % 86400) / 3600);
    const days = parseInt(duration / 86400);

    if (days > 0) {
      return `${days} ${days > 1 ? 'Days' : 'Day'} ${hours} hour${
        min > 0 ? ` ${min} minute` : ''
      }`;
    }
    return hours > 0
      ? `${hours} hour${min > 0 ? ` ${min} minute` : ''}`
      : `${min} minute`;
  };

  const onCallCLick = () => {
    let phone = item.Guestcontacto;
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
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => {});
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 165,
  },
  infoCard: {
    height: height / 3.2,
    width: width / 1,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 50,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  carIcon: {
    width: '35%',
    resizeMode: 'contain',
    height: 80,
  },
  routeIcon: {
    width: '18%',
    resizeMode: 'contain',
    height: 80,
  },
  clockIcon: {
    width: '18%',
    resizeMode: 'contain',
    height: 80,
  },
  dlIcon: {
    width: '50%',
    resizeMode: 'contain',
    height: 80,
    marginRight: -30,
  },
  distanceText: {
    color: '#000',
    marginRight: 90,
    fontWeight: 'bold',
  },
  vehicleText: {
    color: '#000',
    fontWeight: 'bold',
  },
  durationText: {
    color: '#000',
    marginRight: 85,
    fontWeight: 'bold',
  },
  vehicleNumberText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default MapIndex;