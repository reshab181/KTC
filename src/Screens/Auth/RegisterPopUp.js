import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import CryptoJS from 'crypto-js';
import CustomTextInpt from '../../ReusableBtn/CustomTextInpt';
import CustomButton from '../../ReusableBtn/CustomButtons';
import Api from '../../Services/Api';
import Static from '../../Services/Static';

const { height } = Dimensions.get('screen');

const RegisterPOPUP = () => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState('');
  const [loader, setLoader] = useState(false);
  const [userType, setUserType] = useState('corporate'); 
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


  useEffect(() => {
    getJwtAccess();
  }, []);


  const getJwtAccess = async () => {
    try {
      const headers = new Headers();
      headers.append('jwt', '');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      const body = `access_codename_jwt=${Static.ACCESS_CODE_NAME}&access_codepass_jwt=${Static.ACCESS_CODE_PASS}`;
      const url = `${Api.BASE_URL}${Api.Jwt_TOKEN}`;

      const response = await fetch(url, {
        method: 'POST',
        body,
        headers
      });

      const data = await response.text();
      const res = JSON.parse(data)?.jwt;
      if (res) {
        setAccessToken(res);
      }
    } catch (error) {
      console.error('JWT Fetch Error:', error);
      Alert.alert('Error', 'Failed to retrieve access token.');
    }
  };

 
  const encryptData = async (data) => {
    const ClientID = '!IV@_$2123456789';
    const Clientkey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
    const CryptoJsCI = CryptoJS.enc.Utf8.parse(ClientID);
    const CryptoJsCK = CryptoJS.enc.Utf8.parse(Clientkey);
    
    const EncryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      CryptoJsCK,
      {
        iv: CryptoJsCI,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    
    return EncryptedData.toString();
  };

  const navigateToOTP = () => {
    navigation.navigate('OTP');
  };

  const registrationHandler = async (email) => {
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    setLoader(true);
    try {
      const payload = {
        email_id: email,
        verify: userType === 'corporate' ? 'KTCMMI' : 'PERSONAL',
      };

      const encryptedPayload = await encryptData(payload);
      const requestData = { request_data: encryptedPayload };
      const formBody = Object.entries(requestData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

      const response = await fetch(`${Api.USER_REGISTRATION}`, {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          jwt: accessToken,
        },
      });

      const data = await response.json();
      handleApiResponse(data, email);
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  const handleApiResponse = (data, email) => {
    if (data?.message === 'Invalid Domain Name.') {
      Alert.alert(
        'Invalid Domain!',
        'Please contact KTC Admin',
        [
          { text: 'OK', onPress: () => navigation.navigate('ModuleSelectionUI') }
        ]
      );
    } else if (data?.newuser === 'No') {
      navigation.navigate('SignInCorporate', { email });
    } else if (data?.newuser === 'Yes') {
      navigateToOTP();
    }
  };
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Formik
          initialValues={{ email: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (!emailRegex.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values) => registrationHandler(values.email)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.formContainer}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Register</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ModuleSelectionUI')}>
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
                borderRadius={5} 
                loading={loader}
              />
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPOPUP;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F9FAFB',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  formContainer: {
    width: '100%',
    padding: 15,
    marginVertical: height / 4,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3C3567',
    padding: 10,
    borderRadius: 5,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
  instruction: {
    color: '#212121',
    fontSize: 17,
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 20,
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});