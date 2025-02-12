import React, { useEffect, useState } from 'react';
import { View, Image, Alert } from 'react-native';
import splashStyle from './SplashStyle';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import JailMonkey from 'jail-monkey';
import RNExit from 'react-native-exit-app';

const KTCSplashScreen = () => {

    const navigation = useNavigation()

   const moveToNextScreen = async () => {
    const isCheckEmulator = await DeviceInfo.isEmulator();
    if (isCheckEmulator) {
        Alert.alert("Alert", "App can not run in Emulator Phone", [
          { text: 'OK', onPress: () => RNExit.exitApp() }
        ]);
    }
    else {
        const isRootedDevice = await JailMonkey.isJailBroken();
        if(isRootedDevice) {
            Alert.alert("Alert", "App can not run in Rooted Device", [
                { text: 'OK', onPress: () => RNExit.exitApp() }
              ]);
        } else {
            setTimeout(() => {
                navigation.replace("ModuleSelection");
            }, 3000);
        }
    }
   }
  

    useEffect(() => {
        moveToNextScreen()
    }, [])


    return(
        <View style={splashStyle.mainContainer}>
              <Image 
              source={require('../../assets/ktc-logo.png')}
              />
        </View>
    )

}

export default KTCSplashScreen;