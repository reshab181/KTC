import React, { useEffect, useCallback } from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  BackHandler,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomHeader from '../../component/CustomHeader';
import GetDirection from './GetDirection';
import MapIndex from './MapIndex';

const { height, width } = Dimensions.get('screen');

const LocationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { item, dataTrackChiffer, access_token, showResult, index, eloc } = route?.params || {};

  const driverCoordinates = useSelector((state) => state?.coords?.coords);
  const customerLocation = item?.eloc ?? eloc ?? null;

  // Unified back handler
  const handleBack = useCallback(() => {
    navigation.goBack(); 
  }, [navigation]);

  const handleMessages = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);

 
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleBack();
        return true; // Prevent default back behavior
      };
      
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [handleBack])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <CustomHeader
          title="Track Chauffeur"
          onpressBack={handleBack} 
          onpressIcon={handleMessages}
          leftIcon={() => (
            <TouchableOpacity onPress={handleBack}>
              <Image source={require('../../assets/ic_back_arrow_white_24.png')} />
            </TouchableOpacity>
          )}
        />
        
        <GetDirection
          item={item}
          coordinates={{ coords: driverCoordinates }}
          sourceCoordinates={driverCoordinates}
          destinationCoordinates={customerLocation}
        />
        
        <MapIndex 
          item={item} 
          coordinates={{ coords: driverCoordinates }}
           sourceCoordinates={driverCoordinates}
          eloc={customerLocation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    height: height / 0.86,
    width: width / 1,
  },
});

export default LocationScreen;