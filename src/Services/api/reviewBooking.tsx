import { BASE_URL, CREATE_BOOKING } from "../../config/api-config";
import { encryptPayload } from "../../Utils/EncryptionUtility";
import { apiClient, postJWtHttpClient } from "./axiosClient";

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
        instance = await apiClient(BASE_URL + CREATE_BOOKING); 
        console.log("Axios Instance:", instance); 
    } catch (error) {
        console.error("Error creating API client:", error);
        return;
    }

    if (!instance || typeof instance.post !== "function") {
        console.error("Error: Invalid Axios instance!", instance);
        return;
    }

    // const data = {
    //     request_data: decodeURIComponent(encryptedRequestPayload)
    // };
    const data = { request_data: encryptedRequestPayload }

    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await postJWtHttpClient(instance, '', null, data, headers);
        console.log("Server Response:", response);
        return response;
    } catch (error) {
        console.error("API Call Failed:", error);
    }
};

export { reviewBookingApi };
