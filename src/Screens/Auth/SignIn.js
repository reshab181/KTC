import React, { useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Platform,
} from 'react-native';
// import { useNavigation, useIsFocused } from '@react-navigation/native';
// import CONSTANTS from '../../services/Constants';
// import API from '../../services/Api';
// import KEYS from '../../services/Keys';
// import SERVICE_REQUEST from '../../services/ServiceRequest';
// import SCREENS from '../../Routers/Screens';
// import ButtonHeader from '../../Component/Button';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux';
// import { updateUserDetails } from '../../Redux/reducer/userReducer';
// import { requestUserPermission } from '../../utils/notificationservice';
// import { useSelector } from 'react-redux';
// import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const { height, width } = Dimensions.get('screen');

const SignInCorporate = (props) => {
//   const { userType } = useSelector((state) => state.userReducer);
  const [errorEmail, setErrorEmail] = useState(null);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(null);
  const [securePassword, setSecurePassword] = useState();
  const [email, setEmail] = useState('');
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState('');
//   const render = useIsFocused();

//   const fun = useCallback(async () => {
//     return await requestUserPermission();
//   }, [render]);

//   console.log("token a rha hai ky login per================>", fun());

  const _emailvalidate = (mail) => {
    if (mail === '') {
      setErrorEmail('*Please enter email.');
    } else {
      setErrorEmail(null);
    }
  };

  const _PasswordValidate = (lname) => {
    var PasswordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!lname) {
      setErrorPassword('*Please enter password.');
    } else {
      setErrorPassword(null);
    }
  };

  const validate = () => {
    let flag = true;
    if (email === '') {
      flag = false;
      setErrorEmail('*Please enter email.');
    } else {
      setErrorEmail(null);
    }
    if (password === '') {
      flag = false;
      setErrorPassword('*Please enter password.');
    } else {
      setErrorPassword(null);
    }
    return flag;
  };

//   const getJwtAcces = async () => {
//     try {
//       const response = await fetch(API.BASE_URL + API.Jwt_TOKEN, {
//         method: "POST",
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         body: 'access_codename_jwt=GciOiJIUzI1NiJ9&access_codepass_jwt=bGciOiJIkUzI1NiJ9eyJpc3MiOiJrdGNhZG1pbiIsImF1ZCI62Fkb',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch JWT');
//       }

//       const data = await response.json();
//       if (data?.jwt) {
//         setAccessToken(data.jwt);
//       }
//     } catch (error) {
//       console.error('Error fetching JWT:', error);
//     }
//   };

//   useEffect(() => {
//     getJwtAcces();
//   }, []);

//   const encryption = async (data) => {
//     var CryptoJS = require("crypto-js");
//     const ClientID = '!IV@_$2123456789';
//     const Clientkey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
//     const CryptoJsCI = CryptoJS.enc.Utf8.parse(ClientID);
//     const CryptoJsCK = CryptoJS.enc.Utf8.parse(Clientkey);
//     const EncryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJsCK, {
//       iv: CryptoJsCI,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });
//     const Result = EncryptedData.ciphertext.toString(CryptoJS.enc.Base64);
//     return Result;
//   };

//   const Submit = async () => {
//     if (validate()) {
//       const MyPayLod = {
//         "email_id": email,
//         "password": password,
//         "type": Platform.OS === 'android' ? "GSM" : "FCM",
//         "tokenid": await fun(),
//       };
//       console.log("hello-----------email========gjjhkhkhkhh=======", MyPayLod);
//       const MyPayLoad = await encryption(MyPayLod);
//       var details = {
//         'request_data': MyPayLoad,
//       };
//       var formBody = [];
//       for (var property in details) {
//         var encodedKey = encodeURIComponent(property);
//         var encodedValue = encodeURIComponent(details[property]);
//         formBody.push(encodedKey + "=" + encodedValue);
//       }
//       formBody = formBody.join("&");

//       let response = await fetch("https://web.gst.fleet.ktcindia.com/user_apis_encoded/userlogin.php", {
//         method: "POST",
//         body: formBody,
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//           'jwt': accessToken,
//         },
//       });

//       let data = await response?.json();
//       console.log("fdgddhgdkjd===============", data);
//       if (data?.message === 'Password Not Match') {
//         Toast.show({
//           type: ALERT_TYPE.DANGER,
//           title: data?.message,
//         });
//       }

//       var CryptoJS = require("crypto-js");
//       var data1 = data?.result;
//       var rawData = CryptoJS.enc.Base64.parse(data1);
//       var key1 = CryptoJS.enc.Latin1.parse("*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh");
//       var iv1 = CryptoJS.enc.Latin1.parse("!IV@_$2123456789");
//       var plaintextData = CryptoJS.AES.decrypt({ ciphertext: rawData }, key1, { iv: iv1 });
//       var plaintext = plaintextData.toString(CryptoJS.enc.Utf8);
//       var ValueText = JSON.parse(plaintext);
//       console.log("plaintext==================", ValueText);

//       if (data?.jwt) {
//         setTimeout(async () => {
//           await AsyncStorage.setItem('token', data?.jwt);
//           dispatch(updateUserDetails({ isLoggedIn: ValueText?.status == 1, role: ValueText?.user_type }));
//           console.log("ggggggg===========================", data?.jwt);
//         }, 0);

//         if (ValueText?.status == 0) {
//           Alert.alert("Your Account Is Deactivated !", "Please Contact to KTC Admin", [
//             { text: "OK", onPress: () => { navigation.navigate(SCREENS.MODULE_SELECTION) } },
//           ]);
//         }
//       }

//       if (response[KEYS.STATUS] === 200) {
//         await SERVICE_REQUEST.setItem(KEYS.USER_ID, ValueText?.user_id);
//         await SERVICE_REQUEST.setItem(KEYS.DATA, JSON.stringify(ValueText));
//         navigation.navigate(SCREENS.HOME);
//       } else {
//         console.error("bvdfhbdfjkgrkthlpt================", response?.message);
//       }
//     }
//   };

//   const getToken = async () => {
//     const token = await AsyncStorage.getItem("token");
//   };

//   useEffect(() => {
//     getToken();
//   }, []);

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.Email1}>
          <View style={styles.Email2}>
            <TextInput
              style={styles.Text1}
              editable={true}
              value={email}
              onChangeText={setEmail}
              placeholder=" Email ID & Mobile no"
              placeholderTextColor="#000"
              keyboardType='email-address'
              maxLength={80}
            />
          </View>
        </View>

        <View style={styles.password1}>
          <View style={styles.password2}>
            <TextInput
              style={styles.Text2}
              value={password}
              secureTextEntry={securePassword ? false : true}
              placeholder="Password"
              placeholderTextColor="#212121"
              onChangeText={(txt) => {
                setPassword(txt), _PasswordValidate(txt);
              }}
            />
            <View style={styles.eye}>
              <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
                <View>
                  {/* {securePassword ? (
                    // <Image source={require('../../Assets/eye1.jpeg')} style={{ marginTop: 1, width: width / 15, height: 18 }} />
                  ) : (
                    // <Image source={require('../../Assets/eye1.jpeg')} style={{ marginTop: 1, width: width / 15, height: 18 }} />
                  )} */}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {errorPassword != null ? (
            <View style={{ height: height * 0.03, width: width / 1.19, justifyContent: 'center', alignSelf: 'center' }}>
              <Text style={{ color: 'red', fontSize: 12 }}>{errorPassword}</Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity>
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>SIGN IN</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Email1: {
    marginBottom: 20,
  },
  Email2: {
    width: width - 30,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    padding: 10,
  },
  Text1: {
    fontSize: 16,
    color: '#212121',
  },
  password1: {
    marginBottom: 20,
  },
  password2: {
    width: width - 30,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    padding: 10,
    position: 'relative',
  },
  Text2: {
    fontSize: 16,
    color: '#212121',
  },
  eye: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SignInCorporate;
