import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import MapplsGL from 'mappls-map-react-native';
import KEYS from '../../services/Keys';
// import MapComponent from './CurrentLoction';
import DirectionWidgetActivity from './DirectionWidgetActivity';
const { height, width } = Dimensions.get('screen');
import Polyline from 'mappls-polyline';
import { useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapIndex =  props  => {
  const item = props?.item;
  const [deviceID, setDeviceID] = useState('')
  console.warn('mapitem-----------------------------', props)
  // const gettoken = async () => {
  //   const accesstoken = await AsyncStorage.getItem("access_token", data.access_token)
  // }
  const getCordinatees = useSelector(state => state?.userReducer?.cordinates)
  console.log("eloc ============= direction====gg====", item?.eloc)

  const [destinationCoordinates, setdestinationCoordinates] = useState(item?.eloc)
  const [sourceCoordinates, setsourceCoordinates] = useState(`${getCordinatees?.coords[1]},${getCordinatees?.coords[0]}`)
  const [center, setcenter] = useState(getCordinatees?.coords[0], getCordinatees?.coords[1])
  const [isVisible, setisVisible] = useState(false)
  const [backB, setbackB] = useState('blue')
  const [backD, setbackD] = useState('blue')
  const [backW, setbackW] = useState('blue')
  const [route, setroute] = useState("")
  const [distance, setdistance] = useState("")
  const [duration, setduration] = useState("")

  const callApi = async (setProfile) => {
    console.log("this is going to api", destinationCoordinates);
    MapplsGL.RestApi.direction({
      origin: sourceCoordinates,
      destination: destinationCoordinates,
      profile: setProfile,
      overview: MapplsGL.RestApi.DirectionsCriteria.OVERVIEW_FULL,
      geometries: 'polyline6',
    })
      .then(data => {
        console.log(JSON.stringify(data));
        let routeGeoJSON = Polyline?.toGeoJSON(data?.routes[0]?.geometry, 6);
        setdistance(getFormattedDistance(data?.routes[0]?.distance))
        setduration(getFormattedDuration(data?.routes[0]?.duration))
        setroute(routeGeoJSON)
        setcenter(routeGeoJSON?.coordinates[0])
      })
      .catch(error => {
        console.log("this is map error", error?.message);
      });
  }
  console.log("this is the current coords", getCordinatees);

  useEffect(() => {
    const effect = async () => {
      setsourceCoordinates(`${getCordinatees.coords[1]},${getCordinatees.coords[0]}`)
      setcenter([getCordinatees.coords[0], getCordinatees.coords[1]])
      setdestinationCoordinates(`${item.eloc}`)
      await callApi("driving")
      setbackD("white")
    }
    effect()
  }, [])
  const getFormattedDistance = (distance) => {
    if (distance / 1000 < 1) {
      return distance + ' meter';
    }
    let dis = distance / 1000;
    dis = dis.toFixed(2);
    return dis + ' kilometer';
  }
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
        ' ' +
        'hour' +
        (min > 0 ? ' ' + min + ' ' + ' minute' : '')
      );
    } else {
      return hours > 0
        ? hours + ' ' + 'hour' + (min > 0 ? ' ' + min + ' ' + ' minute' : '')
        : min + ' ' + ' minute';
    }
  }

  const onCallCLick = () => {
    let phone = item.Guestcontacto;
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('NUMBER NOT AVAILABLE');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => { });
  };

  return (
    <View>
      <View
        style={{
          height: height / 3.2,
          width: width / 1,
          alignSelf: 'center',
          backgroundColor: '#fff',
          borderRadius: 7,
          marginBottom: 165,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 50 }}>
          <Image style={styles.imageroute}
            source={require('../../Assets/route.png')}
          />
          <Image style={styles.image}
            source={require('../../Assets/mapcar.png')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center', marginHorizontal: 30
          }}>
          <Text
            style={{
              color: '#000',
              marginRight: 90,
              fontWeight: 'bold'
            }}>
            {distance}
          </Text>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold'
            }}>
            {item[KEYS.VEHICAL_REQUESTED]}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 50 }}>
          <Image style={styles.imageroute}
            source={require('../../Assets/clock.png')}
          />
          <Image style={styles.imagedl}
            source={require('../../Assets/dl.png')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginHorizontal: 30
          }}>
          <Text
            style={{
              color: '#000',
              marginRight: 85,
              fontWeight: 'bold'
            }}>
            {duration}
            {/* 15 hour 30 minute */}
          </Text>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold'
            }}>
            {item?.vehicle_no}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default MapIndex;
const styles = StyleSheet.create({
  image: {
    width: '35%',
    resizeMode: 'contain',
    height: 80
  },
  imageroute: {
    width: '18%',
    resizeMode: 'contain',
    height: 80
  },
  imagedl: {
    width: '50%',
    resizeMode: 'contain',
    height: 80,
    marginRight: -30,
  }
});
