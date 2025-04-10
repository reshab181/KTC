
import { apiClient, postJWtHttpClient } from "./axiosClient";
import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";
import { BASE_URL, FEEDBACK } from "../../config/api-config";

const FeedbackClient = apiClient(BASE_URL + FEEDBACK);

const FeedbackApi = async()=>{
    const payload = {
      feeback_param: "",
      };
      const encryptedRequestPayload = encryptPayload(payload)

      const data = {
        request_data: decodeURIComponent(encryptedRequestPayload)
    }
    let instance = await  FeedbackClient;
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    return postJWtHttpClient(instance, '', null, data, headers)
}
export {FeedbackApi}



const submitFeedback = async ({ remarks, booking_id, label }: {
  remarks: string;
  booking_id: string | number; 
  label: string[]; 
})  => {
    const payload = {
      feeback_submit: "",
      remarks,
      booking_id,
      label: JSON.stringify(label)
    };
  
    const encryptedPayload = encryptPayload(payload);
    const data = {
      request_data: decodeURIComponent(encryptedPayload)
    };
  
    const instance = await FeedbackClient;
  
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
  
    return postJWtHttpClient(instance, "", null, data, headers);
  };
  
  export {  submitFeedback };
  