//**Author---Reshab Kumar Pandey
// Component---RegisterPopUp.js */


import React, { useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import CryptoJS from 'crypto-js';
import debounce from 'lodash.debounce';
import CustomTextInpt from '../../ReusableBtn/CustomTextInpt';
import CustomButton from '../../ReusableBtn/CustomButtons';
import Api from '../../Services/Api';

import { fetchJwtAccess } from '../../Utils/JwtHelper';

const { height } = Dimensions.get('screen');

const RegisterPOPUP = ({ onClose }) => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState('');
  const [loader, setLoader] = useState(false);
  const [userType, setUserType] = useState('corporate');
  const [visible, setVisible] = useState(true);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

 
  useEffect(() => {
    const getAccessToken = async () => {
      const token = await fetchJwtAccess(); 
      if (token) {
        setAccessToken(token);
      }
    };

    getAccessToken();
  }, []);



  const encryptData = (data) => {
    const ClientID = '!IV@_$2123456789';
    const ClientKey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
    const CryptoJsCI = CryptoJS.enc.Utf8.parse(ClientID);
    const CryptoJsCK = CryptoJS.enc.Utf8.parse(ClientKey);

    return CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJsCK, {
      iv: CryptoJsCI,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  };

  const registrationHandler = debounce(async (email) => {
    setLoader(true);
    try {
      const payload = {
        email_id: email,
        verify: userType === 'corporate' ? 'KTCMMI' : 'PERSONAL',
      };

      const encryptedPayload = encryptData(payload);
      const response = await fetch(Api.USER_REGISTRATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          jwt: accessToken,
        },
        body: `request_data=${encodeURIComponent(encryptedPayload)}`,
      });

      const data = await response.json();
      handleApiResponse(data, email);
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    } finally {
      setLoader(false);
    }
  }, 300);

  const handleApiResponse = (data, email) => {
    if (!data) return Alert.alert('Error', 'No data received from the server.');

    switch (data.message) {
      case 'success':
        if (data.newuser === 'No') {
            Alert.alert('Success', 'Registered in successfully!');
          setVisible(false);
          navigation.navigate('SignInCorporate', { email: email });
        } else {
          navigateToOTP();
        }
        break;
      case 'Invalid Domain Name.':
        Alert.alert(
          'Invalid Domain!',
          'Please contact KTC Admin',
          [{ text: 'OK', onPress: () => navigation.navigate('ModuleSelectionUI') }],
        );
        break;
      default:
        Alert.alert('Error', data.message || 'Unknown error occurred.');
    }
  };

  const navigateToOTP = () => {
    navigation.navigate('OTPRegister');
  };

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Formik
            initialValues={{ email: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) errors.email = 'Email is required';
              else if (!emailRegex.test(values.email)) errors.email = 'Invalid email address';
              return errors;
            }}
            onSubmit={({ email }) => registrationHandler(email)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={styles.formContainer}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Register</Text>
                  <TouchableOpacity onPress={onClose}>
                    <Image source={require('../../Assets/close.png')} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.instruction}>Please enter your official email ID</Text>
                <CustomTextInpt
                  placeholder="Email ID"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  keyboardType="email-address"
                  secureTextEntry={false}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                <CustomButton
                  title="Submit"
                  onPress={handleSubmit}
                  widthSize="100%"
                  borderRadius={0}
                  loading={loader}
                />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default React.memo(RegisterPOPUP);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.9)', 
  },
  modalContainer: {
    width: '100%', 
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, 
  },
  formContainer: {
    margin: 10, 
    backgroundColor: '#F2F2F2',
    borderRadius: 8
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3C3567',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18, 
    fontWeight: '600',
    textAlign: 'center',
  },
  instruction: {
    color: '#212121',
    fontSize: 16, 
    marginTop: 20,
    marginLeft: 18,
    lineHeight: 24, 
  },
  errorText: {
    color: 'red',
    fontSize: 14, 
    marginTop: 5,
    marginLeft: 18, 
    fontWeight: '500', 
  },
}); 
