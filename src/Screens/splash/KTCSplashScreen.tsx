import React, { useEffect } from 'react';
import { View, Image, Alert } from 'react-native';
import splashStyle from './SplashStyle';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import JailMonkey from 'jail-monkey';
import RNExit from 'react-native-exit-app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KTCSplashScreen = () => {
    const navigation = useNavigation<any>();

    const moveToNextScreen = async () => {
        const isCheckEmulator = await DeviceInfo.isEmulator();
        
        if (false) {
            Alert.alert("Alert", "App cannot run on an Emulator", [
                { text: 'OK', onPress: () => RNExit.exitApp() }
            ]);
            return;
        }

        const isRootedDevice = JailMonkey.isJailBroken();
        if (isRootedDevice) {
            Alert.alert("Alert", "App cannot run on a Rooted Device", [
                { text: 'OK', onPress: () => RNExit.exitApp() }
            ]);
            return;
        }

        setTimeout(async () => {
            const value = await AsyncStorage.getItem('isLoggedInn');
            console.log("Stored Value:", value);
            if (value === 'true') {
                navigation.replace('CorporateNavigator', {
                    screen: 'CorporateHomeScreen',
                });
            } else {
                navigation.replace("ModuleSelection");
            }
        }, 3000);
    };

    useEffect(() => {
        moveToNextScreen();
    }, []);

    return (
        <View style={splashStyle.mainContainer}>
            <Image source={require('../../assets/ktc-logo.png')} />
        </View>
    );
};

export default KTCSplashScreen;
