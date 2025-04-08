import { BASE_URL, CREATE_BOOKING } from "../../config/api-config";
import { decryptData, encryptPayload } from "../../Utils/EncryptionUtility";
import { apiClient, postJWtHttpClient } from "./axiosClient";
import axios from "axios";

console.log("BASE_URL:", BASE_URL);
console.log("CREATE_BOOKING:", CREATE_BOOKING);
const reviewBookingClient = apiClient(BASE_URL + CREATE_BOOKING);
console.log("Review Booking Client:", reviewBookingClient);

// const reviewBookingApi = async (bookingData) => {
//     if (!bookingData) {
//         console.error("Error: bookingData is undefined or null!");
//         return;
//     }

//     const encryptedRequestPayload = encryptPayload(bookingData);
    
//     if (typeof encryptedRequestPayload !== "string") {
//         console.error("Error: encryptPayload did not return a string!", encryptedRequestPayload);
//         return;
//     }

//     console.log("Encrypted Payload:", encryptedRequestPayload);

//     const data = {
//         request_data: encodeURIComponent(encryptedRequestPayload)
//     };

//     let instance = reviewBookingClient; 

//     let headers = {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     };

//     return postJWtHttpClient(instance, '', null, data, headers);
// };
// const reviewBookingApi = async (bookingData: any) => {
//     if (!bookingData) {
//         console.error("Error: bookingData is undefined or null!");
//         return;
//     }

//     const encryptedRequestPayload = encryptPayload(bookingData);
//     console.log("Encrypted Payload:", encryptedRequestPayload);

//     if (typeof encryptedRequestPayload !== "string") {
//         console.error("Error: encryptPayload did not return a string!", encryptedRequestPayload);
//         return;
//     }

//     let instance;
//     try {
//         instance = await apiClient(BASE_URL + CREATE_BOOKING); 
//         console.log("Axios Instance:", instance); 
//     } catch (error) {
//         console.error("Error creating API client:", error);
//         return;
//     }

//     if (!instance || typeof instance.post !== "function") {
//         console.error("Error: Invalid Axios instance!", instance);
//         return;
//     }

//     const data = {
//         request_data: decodeURIComponent(encryptedRequestPayload)
//     };
//     // const data = { request_data: decodeURIComponent(encryptedRequestPayload )}

//     let headers = {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     };

//     try {
//         const response = await postJWtHttpClient(instance, '', null, data, headers);
//         console.log("Server Response:", response);
//         return response;
//     } catch (error) {
//         console.error("API Call Failed:", error);
//     }
// };



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

// const reviewBookingApi = async (bookingData: any) => {
//   if (!bookingData) {
//     console.error("Error: bookingData is undefined or null!");
//     return;
//   }

//   let encryptedRequestPayload = encryptPayload(bookingData);
//   console.log("Encrypted Payload Type:", typeof encryptedRequestPayload);
//   console.log("Encrypted Payload:", encryptedRequestPayload);

//   // Validate if encryptedRequestPayload is Base64
//   const isBase64 = (str: string) => /^[A-Za-z0-9+/=]+$/.test(str);

//   if (!isBase64(encryptedRequestPayload)) {
//     console.error("Error: Encrypted data is not in Base64 format!", encryptedRequestPayload);
//     encryptedRequestPayload = Buffer.from(encryptedRequestPayload).toString("base64");
//   }

//   let instance;
//   try {
//     instance = reviewBookingClient;
//   } catch (error) {
//     console.error("Error creating API client:", error);
//     return;
//   }

//   const data = { request_data: encryptedRequestPayload };
//   let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

//   try {
//     const response = await postJWtHttpClient(await instance, '', null, data, headers);
//     console.log("Full API Response:", response);

//     if (response && response.data) {
//       console.log("Type of response.data:", typeof response.data);
//       console.log("Response Data:", response.data);

//       const decryptedResponse = isBase64(response.data) ? decryptData(response.data) : null;

//       if (!decryptedResponse) {
//         console.error("Error: Response data is not Base64 encoded!", response.data);
//       } else {
//         console.log("Decrypted Response:", decryptedResponse);
//       }

//       return decryptedResponse;
//     } else {
//       console.error("Error: Invalid response data received:", response);
//       return null;
//     }
//   } catch (error) {
//     console.error("API Call Failed:", error);
//   }
// };




export { reviewBookingApi };
