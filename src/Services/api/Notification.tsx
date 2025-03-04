
import { BASE_URL, NOTIFICATION } from "../../config/api-config";
import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";
import { apiClient, postJWtHttpClient } from "./axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationClient = apiClient(BASE_URL + NOTIFICATION);

const NotificationService = {
    
    fetchNotifications: async (
        item: { notification_id: any },
        page: number,
        pageLimit: number,
        setNotification: (arg0: any) => void,
        setUnreadCount: (arg0: any) => void,
        setRefreshing: (arg0: boolean) => void
    ) => {
        setRefreshing(true);
        const userId = await AsyncStorage.getItem("user_id");
        console.log(userId,"userid");
        

        try {
            const payload = {
                "user_id": userId,
                "limit": `${(page - 1) * pageLimit},${pageLimit}`,
                "notification_id": item?.notification_id
            };

            const encryptedPayload = encryptPayload(payload);
            const data = {
                request_data: decodeURIComponent(encryptedPayload)
            };

            let instance = NotificationClient;
            let headers = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            };

            console.log("Fetching Notifications:", data);
            console.log("Sending request to:", BASE_URL + NOTIFICATION);
            //   console.log("Request Headers:", headers);
           console.log("Request Data:", data)

            const response = await postJWtHttpClient(await instance, '', null, data, headers);
            console.log("API Response:", response);

            setUnreadCount(decryptData(response?.data?.count_notification));
            setNotification(decryptData(response?.data?.notification_data));

        } catch (err) {
            console.error("Error fetching notifications:", err);
        } finally {
            setRefreshing(false);
        }
    },

    // 🔹 Clear Notifications
    clearNotifications: async ( page: number,
        pageLimit: number, setNotification: (arg0: any) => void, setUnreadCount: (arg0: number) => void) => {
        const userId = await AsyncStorage.getItem("user_id");

        try {
            const payload = {
                "user_id": userId,
                "limit": `${(page - 1) * pageLimit},${pageLimit}`,
                "clear_all": "clear"

            };

            const encryptedPayload = encryptPayload(payload);
            const data = {
                request_data: decodeURIComponent(encryptedPayload)
            };

            let instance = NotificationClient;
            let headers = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            };

            console.log("Clearing Notifications:", data);

            const response = await postJWtHttpClient(await instance, '/clear', null, data, headers);
            console.log("Clear Notifications Response:", response);

            // Clear notifications state
            setUnreadCount(0);
            setNotification([]);

        } catch (err) {
            console.error("Error clearing notifications:", err);
        }
    }
};

export default NotificationService;
