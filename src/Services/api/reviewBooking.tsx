import { BASE_URL, CREATE_BOOKING } from "../../config/api-config";
import { decryptData, encryptPayload } from "../../Utils/EncryptionUtility";
import { apiClient, postJWtHttpClient } from "./axiosClient";
import axios from "axios";

console.log("BASE_URL:", BASE_URL);
console.log("CREATE_BOOKING:", CREATE_BOOKING);
const reviewBookingClient = apiClient(BASE_URL + CREATE_BOOKING);
console.log("Review Booking Client:", reviewBookingClient);





const reviewBookingApi = async (bookingData: any) => {
  if (!bookingData) {
    console.error("Error: bookingData is undefined or null!");
    return;
  }

  const encryptedRequestPayload = encryptPayload(bookingData);
  console.log("Encrypted Payload:", encryptedRequestPayload);

  if (typeof encryptedRequestPayload !== "string") {
    console.error("Error: encryptPayload did not return a string!", encryptedRequestPayload);
    return;
  }

  let instance;
  try {
    instance = reviewBookingClient;
    console.log("Axios Instance:", instance);
  } catch (error) {
    console.error("Error creating API client:", error);
    return;
  }

  if (!instance || typeof (await instance).post !== "function") {
    console.error("Error: Invalid Axios instance!", instance);
    return;
  }

  const data = {
    request_data: decodeURIComponent(encryptedRequestPayload)
  };

  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  try {
    const response = await postJWtHttpClient(await instance, '', null, data, headers);
    console.log("Server Response:", response);

    if (response) {
      console.log("Response Data:", response);
      return response; 
    } else {
      console.error("API Response is empty or undefined:", response);
      return null;
    }
  } catch (err) {
    console.error("API Call Failed:", err);

    if (axios.isAxiosError(err)) {
      console.error("Response Status:", err.response?.status);
      console.error("Response Data:", err.response?.data);
    } else {
      console.error("Non-Axios Error:", err);
    }
    throw err; 
  }
};






export { reviewBookingApi };
