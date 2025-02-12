import { BASE_URL, USER_REGISTRATION } from "../../config/api-config";
import { encryptPayload } from "../../Utils/EncryptionUtility";
import { apiClient, postJWtHttpClient } from "./axiosClient";

const verifyEmailClient = apiClient(BASE_URL + USER_REGISTRATION)

const verifyEmailApi = async (email: string, userType: string) => {
    const payload = {
        email_id: email,
        verify: userType === 'Corporate' ? 'KTCMMI' : 'PERSONAL',
      };


    const encryptedRequestPayload = encryptPayload(payload)
    const data = {
        request_data: decodeURIComponent(encryptedRequestPayload)
    }
    let instance = await verifyEmailClient;
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    return postJWtHttpClient(instance, '', null, data, headers)
}

export {verifyEmailApi}