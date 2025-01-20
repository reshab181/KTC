
// import { Alert,Platform } from 'react-native';
// import { tokenFromMMI } from '../Services/ServiceRequest';
// import Api from '../Services/Api';
// import CryptoJS from 'crypto-js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import debounce from 'lodash.debounce';


// const encryptPayload = (data) => {
//     const ClientID = '!IV@_$2123456789';
//     const ClientKey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
//     const CryptoJsCI = CryptoJS.enc.Utf8.parse(ClientID);
//     const CryptoJsCK = CryptoJS.enc.Utf8.parse(ClientKey);
//     const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJsCK, {
//       iv: CryptoJsCI,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });
  
//     return encryptedData.ciphertext.toString(CryptoJS.enc.Base64);
//   };

//  export const registrationHandler = debounce(async (email, userType, accessToken, handleApiResponse, setLoader) => {
//     setLoader(true);
//     try {
//       const payload = {
//         email_id: email,
//         verify: userType === 'corporate' ? 'KTCMMI' : 'PERSONAL',
//       };
  
//       const encryptedPayload = encryptData(payload);
//       const response = await fetch(Api.USER_REGISTRATION, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//           jwt: accessToken,
//         },
//         body: `request_data=${encodeURIComponent(encryptedPayload)}`,
//       });
  
//       const data = await response.json();
//       handleApiResponse(data, email);
//     } catch (error) {
//       console.error('Registration Error:', error);
//       Alert.alert('Error', 'Failed to register. Please try again.');
//     } finally {
//       setLoader(false);
//     }
//   }, 300);

// export const handleSignIn = async (email, password, accessToken, navigation, setLoading) => {
//     setLoading(true);
//     try {
//       const payload = {
//         email_id: email,
//         password,
//         type: Platform.OS === 'android' ? 'GSM' : 'FCM',
//         tokenid: await AsyncStorage.getItem('fcmToken') || 'dummy-token',
//       };
  
//       const encryptedPayload = encryptPayload(payload);
//       const formBody = new URLSearchParams({ request_data: encryptedPayload }).toString();
  
//       console.log("Access Token:", accessToken);
//       console.log("Request Payload:", formBody);
  
//       const response = await fetch(Api.USER_LOGIN, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//           jwt: accessToken,
//         },
//         body: formBody,
//       });
  
//       if (!response.ok) {
//         const data = await response.json();
//         console.log("API Response Data:", data);
//         if (data?.message === 'Password Not Match') {
//           Alert.alert('Error', 'Password Not Match');
//         } else {
//           Alert.alert('Error', 'Failed to sign in. Please try again.');
//         }
//         return;
//       }
  
//       const data = await response.json();
//       if (data?.jwt) {
//         await AsyncStorage.setItem('token', data.jwt);
//         Alert.alert('Success', 'Logged in successfully!');
//         navigation.navigate("CorporateModule1");
//       } else {
//         Alert.alert('Error', 'Unexpected response from server.');
//       }
//     } catch (error) {
//       console.error('Error in handleSignIn:', error);
//       Alert.alert('Error', 'Failed to sign in. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  

// export const emailsms = async (email, accessToken, navigation, setLoading) => {
//   if (!accessToken) {
//     Alert.alert('Error', 'Access token is not available.');
//     return;
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

//     const apiUrl = `https://anchor.mapmyindia.com/api/users/authenticate?handle=${email}&autoMigrate`;
//     console.log('Making API request to:', apiUrl);

//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: headersList,
//     });

//     if (response?.ok) {
//       const locationUrl = response.headers.get('location');
//       if (!locationUrl) {
//         throw new Error("Location header is missing in the response.");
//       }

//       console.log('Navigating to OTP screen...');
//       navigation.navigate('OTP', {
//         url: locationUrl,
//         email,
//         from: 'ForgotPassword',
//         accessToken,
//       });
//     } else {
//       const errorData = await response.json();
//       console.error('API Error:', errorData);
//       Alert.alert('Error', 'Failed to send OTP. Please try again.');
//     }
//   } catch (error) {
//     console.error('Error in emailsms:', error.message);
//     Alert.alert('Error', error.message || 'An unexpected error occurred.');
//   } finally {
//     setLoading(false);
//   }
// };

import { Alert, Platform } from 'react-native';
import { tokenFromMMI } from '../Services/ServiceRequest';
import Api from '../Services/Api';
import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash.debounce';
import {ANCHOR_URL} from '@env'

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

export const registrationHandler = debounce(async (email, userType, accessToken, handleApiResponse, setLoader) => {
  setLoader(true);
  try {
    const payload = {
      email_id: email,
      verify: userType === 'corporate' ? 'KTCMMI' : 'PERSONAL',
    };

    const encryptedPayload = encryptPayload(payload);
    console.log("Registration payload",encryptedPayload);
    
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

export const NewUser = async (accessToken, details) => {
    try {
      const formBody = [];
      for (const property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(`${encodedKey}=${encodedValue}`);
      }
      const body = formBody.join('&');
  
      const response = await fetch(
        "https://web.gst.fleet.ktcindia.com/user_apis_encoded/user_registration.php",
        {
          method: "POST",
          body,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'jwt': accessToken,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      // Handle success (e.g., decrypt user_id, dispatch action)
      // ... your success handling logic here ...
  
      return data; 
  
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
      throw error; // Re-throw the error for proper error handling in the calling component
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
    console.log(encryptedPayload);
    const formBody = new URLSearchParams({ request_data: encryptedPayload }).toString();

    const response = await fetch(Api.USER_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        jwt: accessToken,
      },
      body: formBody,
    });

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


export const emailsms = async (email, accessToken, navigation, setLoading) => {
  if (!accessToken) {
    Alert.alert('Error', 'Access token is not available.');
    return null;
  }

  try {
    setLoading(true);

    const mmiToken = await tokenFromMMI();
    if (!mmiToken?.access_token) {
      throw new Error("Failed to retrieve MMI access token.");
    }

    const headersList = {
      Authorization: `Bearer ${mmiToken.access_token}`,
    };

    const apiUrl = `${ANCHOR_URL}?handle=${email}&autoMigrate`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headersList,
    });

    if (response?.ok) {
      const locationUrl = response.headers.get('location');
      if (!locationUrl) {
        throw new Error("Location header is missing in the response.");
      }

      navigation.navigate('OTP', {
        url: locationUrl,
        email,
        from: 'ForgotPassword',
        accessToken,
      });

      console.log(locationUrl, "URL retrieved successfully.");
      console.log(accessToken,"aa gya token chalo ghumne");
      
      return locationUrl; 
    } else {
      const errorData = await response.json();
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
      return null;
    }
  } catch (error) {
    console.error('Error in emailsms:', error.message);
    Alert.alert('Error', error.message || 'An unexpected error occurred.');
    return null;
  } finally {
    setLoading(false);
  }
};

export const verifyOTP = async (passPhrase, url) => {
  try {
    const makeApiCall = await tokenFromMMI();

    if (makeApiCall?.access_token) {
      const fullUrl = `${url}?passPhrase=${passPhrase}`;
      console.log('Full URL:', fullUrl); 
      console.log('Access Token:', makeApiCall?.access_token);

      const apiResp = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${makeApiCall?.access_token}`,
        },
      });

      const responseText = await apiResp.text(); 
      console.log('API Response:', responseText);  

      if (apiResp.ok) {
        if (responseText.trim() === '') {
          throw new Error('Empty response from server');
        }
        const responseData = JSON.parse(responseText);  // Parse the response body
        return responseData;
      } else {
        if (responseText.trim() === '') {
          throw new Error('Empty response from server');
        }
        const errorData = JSON.parse(responseText);
        throw new Error(errorData?.message || 'Failed to verify OTP.');
      }
    } else {
      throw new Error('Access token is missing.');
    }
  } catch (error) {
    Alert.alert('Error', error.message || 'An unexpected error occurred.');
    console.error('verifyOTP error:', error);
    return null; // Return null on failure
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
      "email_id": email,
       "type":'UPDATE',
       "password": newPassword,
    };

    const encryptedPayload = encryptPayload(payload);
    const formBody = new URLSearchParams({ request_data: encryptedPayload }).toString();

    const response = await fetch(Api.USER_RESETPASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        jwt: accessToken,
      },
      body: formBody,
    });

    const data = await response.json();

    if (data?.status === 'success') {
      Alert.alert('Success', 'Password reset successfully.');
    } else {
      Alert.alert('Error', 'Failed to reset password. Please try again.');
    }
  } catch (error) {
    console.error('Error in resetPassword:', error);
    Alert.alert('Error', 'Failed to reset password. Please try again.');
  } finally {
    setLoading(false);
  }
};
