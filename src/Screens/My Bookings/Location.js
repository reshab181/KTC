//Reshab Kumar Pandey
//Location.js


import React, { useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  BackHandler,
  TouchableOpacity,Image
} from 'react-native';


import { useSelector } from 'react-redux';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomHeader from '../../component/CustomHeader';
import GetDirection from './GetDirection';
import MapIndex from './MapIndex';

const { height, width } = Dimensions.get('screen');

const LocationScreen = (props) => {
  const navigation = useNavigation();

  const { item, dataTrackChiffer, access_token, showResult, index} =
    props?.route?.params || {};

    const coordinates = useSelector((state) => state?.coords?.coords); 
    const elocData = useSelector((state) => state?.corporate.eloc); 
  useEffect(() => {
    console.log('Location Coordinates:', coordinates);
    console.log(
      'Location Props:',
      // item,
      // dataTrackChiffer,
      // access_token,
      // showResult,
      // elocData
 
    );
    // console.log('Location eloc:', item?.eloc);
  }, [coordinates, item, dataTrackChiffer, access_token, showResult, item?.eloc]);

  const handleBack = useCallback(() => {
    navigation.navigate('Track', { item, index });
  }, [navigation, item, index]);

  const handleMessages = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [handleBack])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <CustomHeader
          title={'Track Chauffeur'}
          onpressBack={handleBack}
          onpressIcon={handleMessages}

            leftIcon={() => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Image source={require('../../assets/ic_back_arrow_white_24.png')} />
                    </TouchableOpacity>
                  )}
        />
        <GetDirection item={item}  coordinates={coordinates}/>
        <MapIndex item={item} coordinates={coordinates} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    height: height / 0.9,
    width: width / 1,
  },
});

export default LocationScreen;