import { ANCHOR_URL } from "../../config/api-config";
import { apiClient, postHttpAuthClient } from "./axiosClient";

let sendOtpClient = apiClient(ANCHOR_URL)

const sendOtpApi = async(email: string) => {
    const param = {
        handle: email
    }

    let instance = await sendOtpClient

    return postHttpAuthClient(instance, '', param, null, {'Content-Type': 'application/json'})
}
export {sendOtpApi}