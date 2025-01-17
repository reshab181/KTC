//**Author---Reshab Kumar Pandey
// Component---RegisterPopUp.js */


import React, { useState, useEffect } from 'react';
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
import CustomTextInpt from '../../Reusables/CustomTextInpt';
import CustomButton from '../../Reusables/CustomButtons';
import Api from '../../Services/Api';

import { fetchJwtAccess } from '../../Utils/JwtHelper';
import { registrationHandler } from '../../Api/Authentication';

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
    <Modal  propagateSwipe={true} animationType="slide" transparent visible={visible}>
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
            onSubmit={({ email }) =>registrationHandler(email, userType, accessToken, handleApiResponse, setLoader)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={styles.formContainer}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Register</Text>
                  <TouchableOpacity onPress={onClose}>
                    <Image source={require('../../Assets/close.png')} />
                  </TouchableOpacity>
                </View>
                <View style={{marginHorizontal: 16 , marginTop: 14 , marginBottom: 19}}>
                  <Text style={styles.instruction}>Enter your official Email ID</Text>
                  <CustomTextInpt
                    placeholder="Official Email ID"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    keyboardType="email-address"
                    secureTextEntry={false}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                <CustomButton
                  title="Submit"
                  onPress={handleSubmit}
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
export default RegisterPOPUP

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalContainer: {
    width: '99%',
    shadowColor: '#000',
  },
  formContainer: {
    margin: 10,
    backgroundColor: '#F2F2F2',
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
    marginLeft: '35%',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  instruction: {
    color: '#212121',
    fontSize: 16,
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
