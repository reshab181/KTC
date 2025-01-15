//**Author---- Reshab Kumar Pandey
// Component----SignIn.js */

import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CryptoJS from 'crypto-js';
import { useNavigation } from '@react-navigation/native';
import RegisterPOPUP from './RegisterPopUp';
import Api from '../../Services/Api';
import { fetchJwtAccess } from '../../Utils/JwtHelper';


const SignInCorporate = ({ route }) => {
  const { email } = route.params;
  const navigation = useNavigation();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisModalVisible(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const validationSchema = Yup.object().shape({
    // email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });




  useEffect(() => {
    const getAccessToken = async () => {
      const token = await fetchJwtAccess();
      if (token) {
        setAccessToken(token);
      }
    };

    getAccessToken();
  }, []);

  const encryptPayload = (data) => {
    const ClientID = '!IV@_$2123456789';
    const ClientKey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
    const CryptoJsCI = CryptoJS.enc.Utf8.parse(ClientID);
    const CryptoJsCK = CryptoJS.enc.Utf8.parse(ClientKey);
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJsCK, {
      iv: CryptoJsCI,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encryptedData.ciphertext.toString(CryptoJS.enc.Base64);
  };

  const handleSignIn = async (values) => {
    setLoading(true);
    try {
      const payload = {
        email_id: email,
        password: values.password,
        type: Platform.OS === 'android' ? 'GSM' : 'FCM',
        tokenid: await AsyncStorage.getItem('fcmToken') || 'dummy-token',
      };

      const encryptedPayload = encryptPayload(payload);
      const formBody = new URLSearchParams({ request_data: encryptedPayload }).toString();

      console.log("Access Token:", accessToken);
      console.log("Request Payload:", formBody);

      const response = await fetch(Api.USER_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          jwt: accessToken,
        },
        body: formBody,
      });

      if (!response.ok) {
        const data = await response.json();
        console.log("API Response Data:", data);
        if (data?.message === 'Password Not Match') {
          Alert.alert('Error', 'Password Not Match');
        } else {
          Alert.alert('Error', 'Failed to sign in. Please try again.');
        }
        return;
      }

      const data = await response.json();
      if (data?.jwt) {
        await AsyncStorage.setItem('token', data.jwt);
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate("CorporateModule1");
      } else {
        Alert.alert('Error', 'Unexpected response from server.');
      }
    } catch (error) {
      console.error('Error in handleSignIn:', error);
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleNavigate = (module) => {
    if (navigation.isFocused()) {
      navigation.navigate('SignInCorporate', {
        screen: 'RegisterPOPUP',
        params: { presentation: 'modal', module },
      });
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Sign In</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {isModalVisible && <RegisterPOPUP onClose={() => setisModalVisible(false)} />}


      <Formik
        initialValues={{ email: email || '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>

            <View style={styles.Email1}>
              <View style={styles.Email2}>
                <TextInput
                  style={styles.Text1}
                  placeholder="Official Email ID "
                  placeholderTextColor="#000"
                  keyboardType="email-address"
                  maxLength={80}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={email}
                  editable={false}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.password1}>
              <View style={styles.password2}>
                <TextInput
                  style={styles.Text2}
                  secureTextEntry
                  placeholder="Password"
                  placeholderTextColor="#212121"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity onPress={handleSubmit} disabled={loading}>
              <View style={styles.buttonContainer}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Sign In</Text>
                )}
              </View>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View style={styles.forgot}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword", { email })}>
          <Text style={styles.Text4}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity onPress={() => handleNavigate('Corporate')}>
        <View style={styles.Create}>
          <Text style={styles.Text5}>Create New Account</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default SignInCorporate;
const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: '#F1F1F3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3C3567',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  skipText: {
    fontSize: 16,
    color: '#FFF',
  },
  Email1: {
    marginTop: 30,
    alignSelf: 'center',
  },
  Email2: {
    height: Dimensions.get('screen').height / 15,
    width: Dimensions.get('screen').width / 1.1,
    backgroundColor: '#FFF',

    marginBottom: 10,
    elevation: 2,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  Text1: {
    height: Dimensions.get('screen').height / 15,
    color: '#212121',
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  password1: {
    marginTop: 20,
    alignSelf: 'center',
  },
  password2: {
    height: Dimensions.get('screen').height / 15,
    width: Dimensions.get('screen').width / 1.1,
    backgroundColor: '#FFF',

    elevation: 2,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  Text2: {
    height: Dimensions.get('screen').height / 15,
    color: '#212121',
    fontSize: 16,
  },
  eye: {
    position: 'absolute',
    top: '50%',
    right: '8%',
    transform: [{ translateY: -10 }],
  },
  buttonContainer: {
    height: Dimensions.get('screen').height / 15,
    width: Dimensions.get('screen').width / 1.1,
    backgroundColor: '#3C3567',
    // borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgot: {
    marginTop: 20,
    alignItems: 'center',
  },
  Text4: {
    color: '#3C3567',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 20,
  },
  orText: {
    width: 50,
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
  },
  Create: {
    height: Dimensions.get('screen').height / 13,
    width: Dimensions.get('screen').width / 1.1,
    backgroundColor: '#FFFFFF00',
    borderRadius: 7,
    marginTop: 20,
    alignSelf: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  Text5: {
    alignSelf: 'center',
    color: '#3C3567',
    fontSize: 17,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 25,
    marginTop: 5,
  },
});



