// //Reshab Kumar Pandey
// //Location.js


// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   SafeAreaView,
//   View,
//   BackHandler,
//   TouchableOpacity,Image
// } from 'react-native';


// import { useSelector } from 'react-redux';

// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import CustomHeader from '../../component/CustomHeader';
// import GetDirection from './GetDirection';
// import MapIndex from './MapIndex';

// const { height, width } = Dimensions.get('screen');

// const LocationScreen = (props) => {
//   const navigation = useNavigation();

//   const { item, dataTrackChiffer, access_token, showResult, index} =
//     props?.route?.params || {};

//     const coordinates = useSelector((state) => state?.coords?.coords); 
//     const elocData = useSelector((state) => state?.reviewBooking.eloc); 
//   useEffect(() => {
//     console.log('Location Coordinates:', coordinates);
//     console.log(
//       'Location Props:',
//       // item,
//       // dataTrackChiffer,
//       // access_token,
//       // showResult,
//       // elocData
 
//     );
//     // console.log('Location eloc:', item?.eloc);
//   }, [coordinates, item, dataTrackChiffer, access_token, showResult, item?.eloc]);

//   const handleBack = useCallback(() => {
//     navigation.navigate('Track', { item, index });
//   }, [navigation, item, index]);

//   const handleMessages = useCallback(() => {
//     navigation.navigate('Notifications');
//   }, [navigation]);

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => {
//         handleBack();
//         return true;
//       };

//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () =>
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//     }, [handleBack])
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.mainContainer}>
//         <CustomHeader
//           title={'Track Chauffeur'}
//           onpressBack={handleBack}
//           onpressIcon={handleMessages}

//             leftIcon={() => (
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                       <Image source={require('../../assets/ic_back_arrow_white_24.png')} />
//                     </TouchableOpacity>
//                   )}
//         />
//         <GetDirection item={item}  coordinates={coordinates}/>
//         <MapIndex item={item} coordinates={coordinates} />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//   },
//   mainContainer: {
//     height: height / 0.86,
//     width: width / 1,
//   },
// });

// export default LocationScreen;

//Reshab Kumar Pandey
//Location.js

import React, { useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,

  TouchableOpacity,
  Image,StyleSheet,height,width
} from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomHeader from '../../component/CustomHeader';
import GetDirection from './GetDirection';
import MapIndex from './MapIndex';

const LocationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { item, dataTrackChiffer, access_token, showResult, index, eloc } = route.params || {};

  // Driver's current location from Redux (tracked position)
  const driverCoordinates = useSelector((state) => state?.coords?.coords);

  const customerLocation = item?.eloc ?? eloc ?? null;

  useEffect(() => {
    console.log('=== Location Screen Props ===');
    console.log('Driver Coordinates (Source):', driverCoordinates);
    console.log('Customer Location (Destination):', customerLocation);
    console.log('Item eloc:', item?.eloc ?? 'Not Provided');
    console.log('Eloc param:', eloc ?? 'Not Provided');
    console.log('Data Track Chauffeur:', dataTrackChiffer);
    console.log('Show Result:', showResult);
  }, [driverCoordinates, customerLocation, item, dataTrackChiffer, showResult]);

  const handleBack = useCallback(() => {
    navigation.navigate('Track', { item, index });
  }, [navigation, item, index]);

  const handleMessages = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);

  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       handleBack();
  //       return true;
  //     };
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //     return () => BackHandler.remove('hardwareBackPress', onBackPress);
  //   }, [handleBack])
  // );

  // Icon component for cleaner usage
  const BackIcon = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={require('../../assets/ic_back_arrow_white_24.png')} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <CustomHeader
          title="Track Chauffeur"
          onpressBack={handleBack}
          onpressIcon={handleMessages}
          leftIcon={BackIcon}
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
    height: height / 0.9,
    width: width / 1,
  },
});

export default LocationScreen;