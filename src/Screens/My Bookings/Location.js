import React, { useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  BackHandler,
} from 'react-native';
// import MapIndex from '../Map/index';

import { useSelector } from 'react-redux';
// import DirectionWidgetActivity from '../Map/DirectionWidgetActivity';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomHeader from '../../component/CustomHeader';
import GetDirection from './GetDirection';
import MapIndex from './MapIndex';

const { height, width } = Dimensions.get('screen');

const LocationScreen = (props) => {
  const navigation = useNavigation();

  const { item, dataTrackChiffer, access_token, showResult, index,eloc } =
    props?.route?.params || {};

    const coordinates = useSelector((state) => state?.coords?.coords); 
    const elocData = useSelector((state) => state?.corporate); 
  useEffect(() => {
    console.log('Location Coordinates:', coordinates);
    console.log(
      'Location Props:',
      item,
      dataTrackChiffer,
      access_token,
      showResult
    );
    console.log('Location eloc:', item?.eloc);
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
        />
        <GetDirection item={item} />
        <MapIndex item={item} />
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