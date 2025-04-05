import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient, postJWtHttpClient } from "./axiosClient";
import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";
import { BASE_URL, VIEW_PROFILE } from "../../config/api-config";

const ClientProfile = apiClient(BASE_URL + VIEW_PROFILE);

const DeleteData = async (email: string) => {
    try {
        const userId = await AsyncStorage.getItem("user_id");
        
        if (!userId) {
            console.error("User ID not found in AsyncStorage");
            return null;
        }
        
        const payload = {
            user_id: userId,
            action: "Deletion",
            email_id: email,
        };
        
        console.log("Payload before encryption:", payload);
        
        const encryptedPayload = encryptPayload(payload);
        console.log("Encrypted Payload:", encryptedPayload);
        
        const data = { request_data:decodeURIComponent( encryptedPayload )};

        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        };

        console.log("Sending API Request...");

        return postJWtHttpClient(await ClientProfile, "", null, data, headers);
        
       

      
     
    } catch (error) {
        console.error("Error in DeleteData:", error);
        return null;
    }
};

export default DeleteData;
