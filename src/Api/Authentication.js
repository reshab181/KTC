import { Alert, Platform } from 'react-native';
import { tokenFromMMI } from '../services/ServiceRequest';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash.debounce';
import { ANCHOR_URL } from '@env';
import Api from '../services/Api';

export const encryptPayload = (data) => {
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
export const decryptData = (encryptedData) => {
  const ClientID = '!IV@_$2123456789';
  const ClientKey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
  const rawData = CryptoJS.enc.Base64.parse(encryptedData);
  const key = CryptoJS.enc.Latin1.parse(ClientKey);
  const iv = CryptoJS.enc.Latin1.parse(ClientID);

  const decryptedData = CryptoJS.AES.decrypt(
    {
      ciphertext: rawData
    },
    key,
    { iv: iv }
  );

  return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
};

export const registrationHandler = debounce(
  async (email, userType, accessToken, navigation, setLoader) => {
    setLoader(true);

    try {
      const payload = {
        email_id: email,
        verify: userType === 'corporate' ? 'KTCMMI' : 'PERSONAL',
      };

      const encryptedPayload = encryptPayload(payload);

      const response = await axios.post(
        Api.USER_REGISTRATION,
        `request_data=${encodeURIComponent(encryptedPayload)}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            jwt: accessToken,
          },
        }
      );

      const data = response.data;
      console.log(data, "Response from USER_REGISTRATION");

      if (data?.message === 'Invalid Domain Name.') {
        Alert.alert('Invalid Domain!', 'Please contact KTC Admin', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ModuleSelectionUI'),
          },
        ]);
        return;
      }

      if (data?.newuser === 'No') {
        navigation.navigate('SignInCorporate', {
          email,
          from: 'RegisterPOPUP',
        });
      } else if (data?.newuser === 'Yes') {
        const mmiToken = await tokenFromMMI();

        // const otpUrl = `https://anchor.mapmyindia.com/api/users/authenticate?handle=${email}&autoMigrate`;
        const otpUrl = `https://anchor.mapmyindia.com/api/users/authenticate?handle=${email}`;
        const otpResponse = await axios.post(
          otpUrl,
          {},
          {
            headers: {
              Authorization: `Bearer ${mmiToken?.access_token}`,
            },
          }
        );
        console.log('====================================');
        console.log(otpResponse?.headers?.location, " URL FROM OTP REGISTER");
        console.log('====================================');
        if (otpResponse.status >= 200 && otpResponse.status < 300) {
          const otpScreen = userType === 'corporate' ? 'OTPRegister' : null;
          navigation.navigate(otpScreen, {
            emailId: email,
            client_id: userType === 'corporate' ? data?.client_id : 'PERSONAL',
            url: otpResponse?.headers?.location,
          });
        }
      }
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    } finally {
      setLoader(false);
    }
  },
  300
);

export const registerUser = async (userData, accessToken) => {
  try {
    const encryptedPayload = encryptPayload(userData);

    const formBody = new URLSearchParams({
      request_data: encryptedPayload
    }).toString();

    const response = await fetch(Api.USER_REGISTRATION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'jwt': accessToken
      },
      body: formBody
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error('Registration failed. Please try again.');
  }
};



export const handleSignIn = async (email, password, accessToken, navigation, setLoading) => {
  setLoading(true);

  try {
    const payload = {
      email_id: email,
      password,
      type: Platform.OS === 'android' ? 'GSM' : 'FCM',
      tokenid: await AsyncStorage.getItem('fcmToken') || 'dummy-token',
    };

    const encryptedPayload = encryptPayload(payload);
    const formBody = new URLSearchParams({ request_data: encryptedPayload }).toString();

    const response = await axios.post(Api.USER_LOGIN, formBody, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        jwt: accessToken,
      },
    });

    const data = response.data;
    console.log('====================================');
    console.log(data , "RESPONSE DATA");
    console.log('====================================');
 

    console.log(data, "login data");
    if (data.status === 200) {
      console.log('====================================');
      console.log("Logged In");
      console.log('====================================');
      AsyncStorage.setItem('isLoggedInn', 'true');
      var result = decryptData(data.result);

      // return result ; 
    }else if(data.status === 204){
      Alert.alert('OOPs', data?.message)
      return ; 
    }
    // console.log(result, "Descrypted DAta ");
    if (data?.jwt) {
      await AsyncStorage.setItem('token', data.jwt);
      // Alert.alert('Success', 'Logged in successfully!');
      navigation.replace('MainApp', {
        screen: 'CorporateModule1',
      });
    } else {
      Alert.alert('OOPs!', 'Login Failed Try sAgain');
    }
    return result; 
  } catch (error) {
    console.error('Error in handleSignIn:',);
    Alert.alert('Error', 'Failed to sign in. Please try again.');
  } finally {
    setLoading(false);
  }

};
export const emailsms = async (email, accessToken, navigation, setLoading) => {
  if (!accessToken) {
    Alert.alert('Error', 'Access token is not available.');
    return null;
  }

  try {
    setLoading(true);
    const mmiToken = await tokenFromMMI();
    if (!mmiToken?.access_token) {
      throw new Error('Failed to retrieve MMI access token.');
    }
    // const apiUrl = `${ANCHOR_URL}?handle=${email}&autoMigrate`;
    const apiUrl = `${ANCHOR_URL}?handle=${email.toString()}`;
    let headersList = {
      "Authorization": `Bearer ${mmiToken?.access_token}`
    }
    const response = await fetch(apiUrl,
      {
        method: "POST",
        headers: headersList
      }
    );


    const locationUrl = response?.headers?.map?.location;
    console.log('====================================');
    console.log(locationUrl);
    console.log('====================================');
    if (locationUrl) {
      navigation.replace('OTP', {
        url: locationUrl,
        email,
        from: 'ForgotPassword',
        accessToken,
      });

      // console.log(locationUrl, 'URL retrieved successfully.');
      // return locationUrl;
    } else {
      throw new Error('Location header is missing in the response.');
    }
  } catch (error) {
    console.error('Error in emailsms:', error.message);
    Alert.alert('Error', error.message || 'An unexpected error occurred.');
    return null;
  } finally {
    setLoading(false);
  }
};
export const resetPassword = async (email, newPassword, confirmPassword, accessToken, setLoading) => {
  setLoading(true);

  if (newPassword !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match.');
    setLoading(false);
    return;
  }

  try {
    const payload = {
      email_id: email,
      type: 'UPDATE',
      password: newPassword,
    };

    const encryptedPayload = encryptPayload(payload);
    const formBody = new URLSearchParams({ request_data: encryptedPayload }).toString();

    const response = await axios.post(Api.USER_RESETPASSWORD,
      formBody,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          jwt: accessToken,
        },
      });

    const data = response.data;
    // console.log('====================================');
    // console.log(data, "DATA RESETING PASSWORD");
    // console.log('====================================');
    // if (data?.status === '200') {
    //   Alert.alert('Success', 'Password reset successfully.');
    // } else {
    //   Alert.alert('Error', 'Failed to reset password. Please try again.');
    // }
    return data;

  } catch (error) {
    console.error('Error in resetPassword:', error);
    Alert.alert('Error', 'Failed to reset password. Please try again.');
  } finally {
    setLoading(false);
  }
};

export const verifyOTP = async (url, passPhrase, processs) => {
  try {
    const mmiToken = await tokenFromMMI();

    if (mmiToken?.access_token) {
      const fullUrl = `${url}?passPhrase=${passPhrase}&${processs}`;
      console.log('====================================');
      console.log("FULL URL ", fullUrl);
      console.log('====================================');
      const response = await axios.get(fullUrl, {
        headers: {
          Authorization: `Bearer ${mmiToken?.access_token}`,
        },
      });
      console.log('====================================');
      console.log("repsonse", response);
      console.log('====================================');
      return response;
    } else {
      throw new Error('Access token is missing.');
    }
  } catch (error) {
    Alert.alert('Error', error.message || 'An unexpected error occurred.');
    console.error('verifyOTP error:', error);
    return null;
  }
};


// import { Alert, Platform } from 'react-native';
// import { tokenFromMMI } from '../services/ServiceRequest';
// import Api from '../services/Api';
// import CryptoJS from 'crypto-js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import debounce from 'lodash.debounce';
// import {ANCHOR_URL} from '@env'

// const encryptPayload = (data) => {
//   const ClientID = '!IV@_$2123456789';
//   const ClientKey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
//   const CryptoJsCI = CryptoJS.enc.Utf8.parse(ClientID);
//   const CryptoJsCK = CryptoJS.enc.Utf8.parse(ClientKey);
//   const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJsCK, {
//     iv: CryptoJsCI,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });

//   return encryptedData.ciphertext.toString(CryptoJS.enc.Base64);
// };




// export const registrationHandler = debounce(
//   async (email, userType, accessToken, navigation, setLoader) => {
//     setLoader(true);

//     try {

//       const payload = {
//         email_id: email,
//         verify: userType === 'corporate' ? 'KTCMMI' : 'PERSONAL',
//       };

//       const encryptedPayload = encryptPayload(payload);


//       const response = await fetch(Api.USER_REGISTRATION, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//           jwt: accessToken,
//         },
//         body: `request_data=${encodeURIComponent(encryptedPayload)}`,
//       });

//       const data = await response.json();
//       console.log(data,"oo hello ye kya h");



//       if (data?.message === 'Invalid Domain Name.') {
//         Alert.alert('Invalid Domain!', 'Please contact KTC Admin', [
//           {
//             text: 'OK',
//             onPress: () => navigation.navigate('ModuleSelectionUI'),
//           },
//         ]);
//         return;
//       }


//       if (data?.newuser === 'No') {
//         navigation.navigate('SignInCorporate', {
//           email,
//           from: 'RegisterPOPUP',
//         });
//       } else if (data?.newuser === 'Yes') {

//         const otpPayload = { email_id: email };
//         const encryptedOtpPayload = encryptPayload(otpPayload);

//         const mmiToken = await tokenFromMMI();
//         const headersList = {
//           Authorization: `Bearer ${mmiToken?.access_token}`,
//         };


//         const otpUrl = `https://anchor.mapmyindia.com/api/users/authenticate?handle=${email}&autoMigrate`;
//         const responseRef = await fetch(otpUrl, {
//           method: 'POST',
//           headers: headersList,
//         });


//         if (responseRef.status >= 200 && responseRef.status < 300) {
//           const otpScreen = userType === 'corporate' ? 'OTPRegister' : null;
//           navigation.navigate(otpScreen, {
//             emailId: email,
//             client_id: userType === 'corporate' ? data?.client_id : 'PERSONAL',
//             url: responseRef?.headers?.map?.location,
//           });
//         }
//       }
//     } catch (error) {
//       console.error('Registration Error:', error);
//       Alert.alert('Error', 'Failed to register. Please try again.');
//     } finally {
//       setLoader(false);
//     }
//   },
//   300
// );


// export const NewUser = async (accessToken, details) => {
//     try {
//       const formBody = [];
//       for (const property in details) {
//         const encodedKey = encodeURIComponent(property);
//         const encodedValue = encodeURIComponent(details[property]);
//         formBody.push(`${encodedKey}=${encodedValue}`);
//       }
//       const body = formBody.join('&');

//       const response = await fetch(
//         "https://web.gst.fleet.ktcindia.com/user_apis_encoded/user_registration.php",
//         {
//           method: "POST",
//           body,
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//             'jwt': accessToken,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();



//       return data;

//     } catch (error) {
//       console.error('Registration Error:', error);
//       Alert.alert('Error', 'Failed to register. Please try again.');
//       throw error;
//     }
//   };
// export const handleSignIn = async (email, password, accessToken, navigation, setLoading) => {
//   setLoading(true);
//   try {
//     const payload = {
//       email_id: email,
//       password,
//       type: Platform.OS === 'android' ? 'GSM' : 'FCM',
//       tokenid: await AsyncStorage.getItem('fcmToken') || 'dummy-token',
//     };

//     const encryptedPayload = encryptPayload(payload);
//     console.log(encryptedPayload);
//     const formBody = new URLSearchParams({ request_data: encryptedPayload }).toString();

//     const response = await fetch(Api.USER_LOGIN, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//         jwt: accessToken,
//       },
//       body: formBody,
//     });

//     const data = await response.json();
//     if (data?.jwt) {
//       await AsyncStorage.setItem('token', data.jwt);
//       Alert.alert('Success', 'Logged in successfully!');
//       navigation.replace('MainApp', {
//       screen: 'CorporateModule1',
//     });
//     } else {
//       Alert.alert('OOPs!', 'Login Failed Try Again');
//     }
//   } catch (error) {
//     console.error('Error in handleSignIn:', error);
//     Alert.alert('Error', 'Failed to sign in. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };


// export const emailsms = async (email, accessToken, navigation, setLoading) => {
//   if (!accessToken) {
//     Alert.alert('Error', 'Access token is not available.');
//     return null;
//   }

//   try {
//     setLoading(true);

//     const mmiToken = await tokenFromMMI();
//     if (!mmiToken?.access_token) {
//       throw new Error("Failed to retrieve MMI access token.");
//     }

//     const headersList = {
//       Authorization: `Bearer ${mmiToken.access_token}`,
//     };

//     const apiUrl = `${ANCHOR_URL}?handle=${email}&autoMigrate`;

//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: headersList,
//     });

//     if (response?.ok) {
//       const locationUrl = response.headers.get('location');
//       if (!locationUrl) {
//         throw new Error("Location header is missing in the response.");
//       }

//       navigation.navigate('OTP', {
//         url: locationUrl,
//         email,
//         from: 'ForgotPassword',
//         accessToken,
//       });

//       console.log(locationUrl, "URL retrieved successfully.");
//       console.log(accessToken,"aa gya token chalo ghumne");

//       return locationUrl;
//     } else {
//       const errorData = await response.json();
//       Alert.alert('Error', 'Failed to send OTP. Please try again.');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error in emailsms:', error.message);
//     Alert.alert('Error', error.message || 'An unexpected error occurred.');
//     return null;
//   } finally {
//     setLoading(false);
//   }
// };




// export const resetPassword = async (email, newPassword, confirmPassword, accessToken, setLoading) => {
//   setLoading(true);

//   if (newPassword !== confirmPassword) {
//     Alert.alert('Error', 'Passwords do not match.');
//     setLoading(false);
//     return;
//   }

//   try {
//     const payload = {
//       "email_id": email,
//        "type":'UPDATE',
//        "password": newPassword,
//     };

//     const encryptedPayload = encryptPayload(payload);
//     const formBody = new URLSearchParams({ request_data: encryptedPayload }).toString();

//     const response = await fetch(Api.USER_RESETPASSWORD, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//         jwt: accessToken,
//       },
//       body: formBody,
//     });

//     const data = await response.json();

//     if (data?.status === 'success') {
//       Alert.alert('Success', 'Password reset successfully.');
//     } else {
//       Alert.alert('Error', 'Failed to reset password. Please try again.');
//     }
//   } catch (error) {
//     console.error('Error in resetPassword:', error);
//     Alert.alert('Error', 'Failed to reset password. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };


// export const verifyOTP = async (url,passPhrase) => {
//   try {
//     const makeApiCall = await tokenFromMMI();

//     if (makeApiCall?.access_token) {
//       const fullUrl = `${url}?passPhrase=${passPhrase}`;
//       console.log(fullUrl,"url");


//       const apiResp = await fetch(fullUrl, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${makeApiCall?.access_token}`,
//         },
//       });

//       const responseText = await apiResp.text();

//       if (apiResp.ok) {
//         if (responseText.trim() === '') {
//           throw new Error('Empty response from server');
//         }
//         const responseData = JSON.parse(responseText);
//         return responseData;
//       } else {
//         if (responseText.trim() === '') {
//           throw new Error('Empty response from server');
//         }
//         const errorData = JSON.parse(responseText);
//         throw new Error(errorData?.message || 'Failed to verify OTP.');
//       }
//     } else {
//       throw new Error('Access token is missing.');
//     }
//   } catch (error) {
//     Alert.alert('Error', error.message || 'An unexpected error occurred.');
//     console.error('verifyOTP error:', error);
//     return null;
//   }
// };


// // export const verifyOTP = async (passPhrase, url) => {
// //   const makeApiCall = await tokenFromMMI()
// //   if (makeApiCall?.access_token) {
// //     try {

// //       const apiResp = await fetch(`${url}?passPhrase=${passPhrase}`, {
// //         method: 'GET',
// //         headers: {
// //           'Authorization': `Bearer ${makeApiCall?.access_token}`
// //         }
// //       }).then(async response => {
// //         const res =  response

// //         return res;
// //       }).catch(err => {
// //         Alert.alert('Error:', err.message)
// //         return err
// //       })
// //       console.log(apiResp,"full url");
// //       console.log(makeApiCall.access_token,"tochan");


// //       return apiResp;
// //     } catch (error) {
// //       Alert.alert("Error", "Error" + error)
// //       return error;
// //     }

// //   } else {
// //     return null;
// //   }
// // }
