import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import CryptoJsCI from 'crypto-js'; // Make sure to import this for encryption

const { height } = Dimensions.get('screen');

const RegisterPOPUP = () => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState('');

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Get the JWT access token
  const getJwtAccess = async () => {
    const headers = new Headers();
    headers.append('jwt', '');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'access_codename_jwt=GciOiJIUzI1NiJ9&access_codepass_jwt=bGciOiJIkUzI1NiJ9eyJpc3MiOiJrdGNhZG1pbiIsImF1ZCI62Fkb';
    const url = `${API.BASE_URL}${API.Jwt_TOKEN}`;

    const response = await fetch(url, {
      method: 'POST',
      body,
      headers,
    });

    const data = await response.text();
    const res = JSON.parse(data)?.jwt;
    if (res) {
      setAccessToken(res);
    }
  };

  // Encrypt data using AES
  const encryptData = async (data) => {
    const ClientID = '!IV@_$2123456789';
    const ClientKey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
    const CryptoJsCI = CryptoJsCI.enc.Utf8.parse(ClientID);
    const CryptoJsCK = CryptoJsCI.enc.Utf8.parse(ClientKey);

    const encryptedData = CryptoJsCI.AES.encrypt(JSON.stringify(data), CryptoJsCK, {
      iv: CryptoJsCI,
      mode: CryptoJsCI.mode.CBC,
      padding: CryptoJsCI.pad.Pkcs7,
    });

    return encryptedData.ciphertext.toString(CryptoJsCI.enc.Base64);
  };

  // Handle registration logic
  const registrationHandler = async (email, userType) => {
    const payload = {
      email_id: email,
      verify: userType === 'corporate' ? 'KTCMMI' : 'PERSONAL',
    };

    const encryptedPayload = await encryptData(payload);

    const requestData = {
      request_data: encryptedPayload,
    };

    let formBody = [];
    for (const property in requestData) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(requestData[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }

    formBody = formBody.join('&');

    const response = await fetch('https://web.gst.fleet.ktcindia.com/user_apis_encoded/user_registration.php', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        jwt: accessToken,
      },
    });

    const data = await response?.json();
    if (data?.message === 'Invalid Domain Name.') {
      Alert.alert('Invalid Domain!', 'Please contact KTC Admin', [
        { text: 'OK', onPress: () => navigation.navigate("ModuleSelectionUI") },
      ]);
    }

    if (data && data.newuser === 'No') {
      navigation.navigate(SCREENS.SIGN_IN_CORPORATE, {
        [KEYS.EMAIL_ID]: email,
        from: SCREENS.REGISTER_POPUP,
      });
    } else if (data && data?.newuser === 'Yes') {
      const otpPayload = { email_id: email };
      const encryptedOtpPayload = await encryptData(otpPayload);
      const mmiToken = await tokenFromMMI();
      const headersList = {
        Authorization: `Bearer ${mmiToken?.access_token}`,
      };

      const responseRef = await fetch(`https://anchor.mapmyindia.com/api/users/authenticate?handle=${email}&autoMigrate`, {
        method: 'POST',
        headers: headersList,
      });

      if (responseRef.status > 200 && responseRef.status < 300) {
        navigation.navigate(SCREENS.OTPRegister, {
          [KEYS.EMAIL_ID]: email,
          client_id: data?.client_id,
          url: responseRef?.headers?.map?.location,
        });
      }
    }
  };

  useEffect(() => {
    getJwtAccess();
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          backgroundColor: '#F5F5F5',
          borderWidth: 1,
          borderColor: '#ddd',
       
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <Formik
          initialValues={{ email: '' }}
          validateOnBlur={false}
          validateOnChange={false}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (!emailRegex.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values) => {
            // Handle form submission
            registrationHandler(values.email, 'corporate'); // or 'personal'
            console.log('Form submitted with email:', values.email);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={{ width: '100%', padding: 15, marginVertical: height / 4 }}>
              <View
                style={{
                  width: '100%',
                  height: 270,
                  backgroundColor: '#fff',
                
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: '25%',
                    backgroundColor: '#3C3567',
                    justifyContent: 'center',
                    alignItems: 'center',
              
                  }}
                >
                  <Text style={styles.CorporateText}>Register</Text>
                  <TouchableOpacity onPress={() => navigation.navigate("ModuleSelectionUI")}>
                    <Image source={require('../../Assets/close.png')} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.resend}>Please enter your official email ID</Text>

                <View style={{ width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={styles.Email}>
                    <TextInput
                      style={styles.emailText}
                      placeholder="Email ID"
                      // placeholderTextColor="#212121"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                  </View>
                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

                <View style={styles.button}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View
                      style={{
                        width: '100%',
                        height: '55%',
                        backgroundColor: '#3C3567',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                   
                      }}
                    >
                      <Text style={styles.CorporateText}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPOPUP;

const styles = StyleSheet.create({
  CorporateText: {
    color: '#FFFFFF',
    fontSize: 20,
    width: '80%',
    textAlign: 'center',
  },
  resend: {
    color: '#212121',
    fontSize: 17,
    marginTop: 20,
    marginLeft: 20,
  },
  Email: {
    marginTop: 20,
    borderWidth: 0.5,
   
    width: '90%',

  },
  
  emailText: {
    fontSize:17,
    color: '#212121',
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 20,
  },
});
