import { Platform } from "react-native";
import { BASE_URL, USER_LOGIN, USER_REGISTRATION } from "../../config/api-config";
import { encryptPayload } from "../../Utils/EncryptionUtility";
import { apiClient, postJWtHttpClient } from "./axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInClient = apiClient(BASE_URL + USER_LOGIN)

const SignInApii = async (email: string, password: string  ) => {
    // const payload = {
    //     email_id: email,
    //     verify: userType === 'Corporate' ? 'KTCMMI' : 'PERSONAL',
    //   };
    const payload = {
        email_id: email,
        password,
        type: Platform.OS === 'android' ? 'GSM' : 'FCM',
        tokenid: await AsyncStorage.getItem('fcmToken') || 'dummy-token',
      };
  

    const encryptedRequestPayload = encryptPayload(payload)
    const data = {
        request_data: decodeURIComponent(encryptedRequestPayload)
    }
    let instance = await SignInClient;
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    return postJWtHttpClient(instance, '', null, data, headers)
}

export {SignInApii}