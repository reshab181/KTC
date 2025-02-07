import React, { useEffect } from "react";
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decryptData, encryptPayload } from "../../Api/Authentication";
import { useDispatch } from "react-redux";
import { setUserProfileData } from "../../Utils/userProfileUtils";

const { height, width } = Dimensions.get('screen');

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchStoredData = async () => {
    const keys = ['isLoggedInn', 'user_id', 'user_email', 'token'];
    const [isLoggedIn, userId, userEmail, token] = await Promise.all(keys.map(key => AsyncStorage.getItem(key)));
    return { isLoggedIn, userId, userEmail, token };
  };

  const handleUserProfileFetch = async (userId, token) => {
    const payload =  encryptPayload({ user_id: userId });
    const formBody = new URLSearchParams({ request_data: payload });

    const response = await fetch("https://web.gst.fleet.ktcindia.com/user_apis_encoded/view_profile.php", {
      method: "POST",
      body: formBody.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'jwt': token
      }
    });

    if (!response.ok) throw new Error('Failed to fetch user profile');

    const data = await response.json();
    return await decryptData(data?.result);
  };

  const checkLoginStatus = async () => {
    try {
      const { isLoggedIn, userId, userEmail, token } = await fetchStoredData();

      if (isLoggedIn === 'true' && userId && userEmail && token) {
        const userData = await handleUserProfileFetch(userId, token);
        setUserProfileData(dispatch, userData); // Call the utility function here

        navigation.replace("MainApp", { screen: "CorporateModule1", params: { userId, userEmail } });
      } else {
        navigation.replace("Auth", { screen: "ModuleSelectionUI" });
      }
    } catch (error) {
      // console.error('Error during login check:', error);
      navigation.replace("Auth", { screen: "ModuleSelectionUI" });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkLoginStatus();
    }, 3000);

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <Image source={require('../../assets/ktc-logo.png')} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3C3567',
  },
  txt: {
    fontSize: height / 25,
    fontWeight: 'bold',
    fontFamily: 'cochin',
    color: 'indigo',
    textDecorationLine: 'underline',
  },
});

// // Reshabh

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Image, Dimensions } from 'react-native';
// // import ModuleSelectionUI from '../Auth/ModuleSelection';
// import { useNavigation } from '@react-navigation/native';


// const { height, width } = Dimensions.get('screen');

// const Splash = props => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     setTimeout(() => {
//       navigation.replace("Auth", { screen: "ModuleSelectionUI" });
//     }, 3000);
//   }, [navigation]);

//   return (
//     <View style={styles.mainContainer}>
//       <Image
//         source={require('../../assets/ktc-logo.png')}
//       />
//     </View>
//   );
// };
// export default Splash;
// const styles = StyleSheet.create({
//   mainContainer: {
//     height: '100%',
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#3C3567',
//   },
//   txt: {
//     fontSize: height / 25,
//     fontWeight: 'bold',
//     fontFamily: 'cochin',
//     color: 'indigo',
//     textDecorationLine: 'underline',
//   },
// });
