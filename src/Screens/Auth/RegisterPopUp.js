import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import CryptoJS from 'crypto-js';
import CustomTextInpt from '../../ReusableBtn/CustomTextInpt';
import CustomButton from '../../ReusableBtn/CustomButtons';
import Api from '../../Services/Api';
import Static from '../../Services/Static';


const { height } = Dimensions.get('screen');

const RegisterPOPUP = ({ onClose }) => {
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
      console.log('Response Data:', data); 
  
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
    navigation.navigate('OTPRegister');
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
      console.log("API Response Data:", data);
      handleApiResponse(data, email); 
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    } finally {
      setLoader(false);
    }
  };
  
  const handleApiResponse = (data, email) => {
    if (!data) {
      console.error('Error: No data received from API');
      return;
    }
  
    console.log('API Response:', data);  
  
   
    if (data?.message === 'success') {
      if (data?.newuser === 'No') {
        setTimeout(() => {
          navigation.navigate('SignInCorporate', { email });
        }, 0);
      } else if (data?.newuser === 'Yes') {
      
        navigateToOTP();
      }
    } else if (data?.message === 'Invalid Domain Name.') {
     
      Alert.alert(
        'Invalid Domain!',
        'Please contact KTC Admin',
        [
          { text: 'OK', onPress: () => navigation.navigate('ModuleSelectionUI') }
        ]
      );
    } else {
     
      Alert.alert('Error', data?.message || 'Unknown error occurred');
    }
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true} 
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.modalContainer}>
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

export default RegisterPOPUP;

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
