//Reshab Kumar Pandey
//Profile.js

import React, { useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../component/CustomHeader';
import CustomIconTextInput from '../../component/CustomIconTextInput';
import CustomButton from '../../component/CustomButtons';


import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteData from '../../services/api/deleteProfile';
import FirstNameIcon from '../../assets/icon/FirstNameIcon';
import EmailIcon from '../../assets/icon/EmailIcon';
import DobIcon from '../../assets/icon/DobIcon';
import PhoneIcon from '../../assets/icon/PhoneIcon';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    mobileNumber: '',
    password: '',
  });
  const navigation = useNavigation();

   function convertUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const day = String(date.getUTCDate() + 1).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


  useEffect(() => {
    const fetchData = async () => {
      try {
        const firstName = await AsyncStorage.getItem('f_name');
        const lastName = await AsyncStorage.getItem('l_name');
        const email = await AsyncStorage.getItem('email_id');
        const birthDateTimestamp = await AsyncStorage.getItem('bithdate');
        const birthDate = convertUnixTimestamp(birthDateTimestamp);
        const mobileNumber = await AsyncStorage.getItem('mobile_number');

        setFormData({
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
          birthDate: birthDate || '',
          mobileNumber: mobileNumber || '',
          password: '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  // const handleDeleteAccount = async () => {
  //   Alert.alert(
  //     'Alert',
  //     'Are you sure you want to delete your account?',
  //     [
  //       { text: 'Cancel', onPress: () => null },
  //       {
  //         text: 'OK',
  //         onPress: async () => {
  //           setLoader(true);
  //           try {
  //             const response = await DeleteData(formData.email);
  //             setLoader(false);

  //             if (response) {
  //               Alert.alert('Success', 'Your account has been deleted.',
  //                 [{
  //                   text: 'OK',
  //                   onPress: async () => {
  //                     await AsyncStorage.clear();
  //                     navigation.navigate("CorporateLoginNavigator", {
  //                       screen: "CorporateSignIn",
  //                     });
  //                   }
  //                 }]
  //               );
  //             } else {
  //               Alert.alert('Error', 'Failed to delete the account. Please try again.');
  //             }
  //           } catch (error) {
  //             setLoader(false);
  //             console.error('Error deleting account:', error);
  //             Alert.alert('Error', 'Something went wrong. Please try again.');
  //           }
  //         }
  //       }
  //     ]
  //   );
  // };
  const handleDeleteAccount = async () => {
    Alert.alert(
      'Alert',
      'Are you sure you want to delete your account?',
      [
        { text: 'Cancel', onPress: () => null },
        {
          text: 'OK',
          onPress: async () => {
            setLoader(true);
            try {
              const response = await DeleteData(formData.email);
              if (response) {
                await AsyncStorage.clear();  
                setLoader(false);
                Alert.alert('Success', 'Your account has been deleted.', [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate("CorporateLoginNavigator", {
                        screen: "CorporateSignIn",
                      });
                    }
                  }
                ]);
              } else {
                setLoader(false);
                Alert.alert('Error', 'Failed to delete the account. Please try again.');
              }
            } catch (error) {
              setLoader(false);
              console.error('Error deleting account:', error);
              Alert.alert('Error', 'Something went wrong. Please try again.');
            }
          }
        }
      ]
    );
  };
  
  const handleInputChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <CustomHeader
          title="Profile"
          leftIcon={() => (
            <TouchableOpacity style={styles.headerLeftIcon} onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/ic_back_arrow_white_24.png')} style={styles.backIcon} />
            </TouchableOpacity>
          )}
        />

        {loader && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#3C3567" />
          </View>
        )}

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <CustomIconTextInput
              placeholder="First Name"
              LeftSvg={FirstNameIcon}
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomIconTextInput
              placeholder="Last Name"
              LeftSvg={FirstNameIcon}
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomIconTextInput
              placeholder="Email"
              LeftSvg={EmailIcon}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomIconTextInput
              placeholder="YYYY-MM-DD"
              LeftSvg={DobIcon}
              value={formData.birthDate}
              onChangeText={(value) => handleInputChange('birthDate', value)}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={styles.countryCodeInput}>
              <CustomIconTextInput
                placeholder="+91"
                value="+91"
                editable={false}
                style={styles.fixedCountryCode}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <CustomIconTextInput
                keyboardType="numeric"
                placeholder="Mobile Number"
                LeftSvg={PhoneIcon}
                value={formData.mobileNumber}
                onChangeText={(value) => handleInputChange('mobileNumber', value)}
              />
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <CustomIconTextInput
              placeholder="Change Password"
              icon1={require('../../assets/lock.png')}
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
            />
          </View>
        </View>

        <View style={styles.deleteButtonContainer}>
          <CustomButton
            title="Delete Account"
            onPress={handleDeleteAccount}
            borderRadius={0}
            backgroundColor="#E74C3C"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F1F1F3',
  },
  headerLeftIcon: {
    paddingHorizontal: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 24,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  countryCodeInput: {
    width: width / 4, 
  },
  fixedCountryCode: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    borderRadius: 5, 
    paddingVertical: 14, 
    paddingHorizontal: 12,
  },
  deleteButtonContainer: {
    width: '100%',
    bottom: 0,
  },
});

export default Profile;