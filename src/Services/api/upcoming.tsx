import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient, postJWtHttpClient } from "./axiosClient";
import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";
import { BASE_URL, VIEW_BOOKING } from "../../config/api-config";

const ViewBookingClient = apiClient(BASE_URL + VIEW_BOOKING);

const UpcomingApi = async (type: "upcoming" | "history",page: number, pageLimit: number) => {
    try {
        const userId = await AsyncStorage.getItem("user_id");
        
        if (!userId) {
            console.error("User ID not found in AsyncStorage");
            return null;
        }
        
        const payload = {
            user_id: userId,
            type: type,
            limit: `${(page - 1) * pageLimit},${pageLimit}`
        };
        
        console.log("Payload before encryption:", payload);
        
        const encryptedPayload = encryptPayload(payload);
        console.log("Encrypted Payload:", encryptedPayload);
        
        const data = { request_data: decodeURIComponent(encryptedPayload) };
        
        let instance = await ViewBookingClient;
        let headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        };
        
        console.log("Sending API Request...");
        
        const response = await postJWtHttpClient(instance, "", null, data, headers);
        
      
        if (!response) {
            console.error("No response received from API");
            return null;
        }
        
    
        console.log("Raw response:", JSON.stringify(response));
        
   
        if (!response.data) {
            console.error("No data in response");
            return null;
        }
        
        console.log("API Response Data:", JSON.stringify(response.data));
        
        if (response.data?.message === "Access denied.") {
            console.warn("Access Denied - You may need to refresh your token.");
            return null;
        }
        
        if (response.data.booking_arr === "No Booking Found.") {
            console.warn(`No ${type} Bookings Found.`);
            return [];
        }
        
     
        if (!response.data.booking_arr || typeof response.data.booking_arr !== 'string') {
            console.error("Invalid booking_arr in response:", response.data.booking_arr);
            return [];
        }
        
        console.log("Encrypted Booking Data:", response.data.booking_arr);
        
      
        let decryptedData: any;
        try {
            decryptedData = decryptData(response.data.booking_arr);
            console.log(` Decrypted ${type} Bookings:`, decryptedData);
        } catch (decryptError) {
            console.error("Error decrypting booking data:", decryptError);
            return [];
        }
        
     
        return Array.isArray(decryptedData) ? decryptedData : [];
    } catch (err) {
        console.error("Error fetching upcoming bookings:", err);
        return [];
    }
};


export default UpcomingApi;
