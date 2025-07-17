
// import { BASE_URL, NOTIFICATION } from "../../config/api-config";
// import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";
// import { apiClient, postJWtHttpClient } from "./axiosClient";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const NotificationClient = apiClient(BASE_URL + NOTIFICATION);

// const NotificationService = {
    
//     fetchNotifications: async (
//         item: { notification_id: any },
//         page: number,
//         pageLimit: number,
//         setNotification: (arg0: any) => void,
//         setUnreadCount: (arg0: any) => void,
//         setRefreshing: (arg0: boolean) => void
//     ) => {
//         setRefreshing(true);
//         const userId = await AsyncStorage.getItem("user_id");
//         console.log(userId,"userid");
        

//         try {
//             const payload = {
//                 "user_id": userId,
//                 "limit": `${(page - 1) * pageLimit},${pageLimit}`,
//                 "notification_id": item?.notification_id
//             };

//             const encryptedPayload = encryptPayload(payload);
//             const data = {
//                 request_data: decodeURIComponent(encryptedPayload)
//             };
//              console.log(data,"===================================data");

//             let instance = NotificationClient;
//             let headers = {
//                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//             };

//             console.log("Fetching Notifications:", data);
//             console.log("Sending request to:", BASE_URL + NOTIFICATION);
//             //   console.log("Request Headers:", headers);
//            console.log("Request Data:", data)

//             const response = await postJWtHttpClient(await instance, '', null, data, headers);
//             console.log("API Response:", response);

//             setUnreadCount(decryptData(response?.data?.count_notification));
//             setNotification(decryptData(response?.data?.notification_data));
//             console.log("Decrypted Unread Count:", decryptData(response?.data?.count_notification));
//             console.log("Decrypted data:", decryptData(response?.data?.notification_data));
//             // console.log("Decrypted Notifications:", decryptedNotifications)

//         } catch (err) {
//             console.error("Error fetching notifications:", err);
//         } finally {
//             setRefreshing(false);
//         }
//     },

//     // 🔹 Clear Notifications
//     clearNotifications: async ( page: number,
//         pageLimit: number, setNotification: (arg0: any) => void, setUnreadCount: (arg0: number) => void) => {
//         const userId = await AsyncStorage.getItem("user_id");

//         try {
//             const payload = {
//                 "user_id": userId,
//                 "limit": `${(page - 1) * pageLimit},${pageLimit}`,
//                 "clear_all": "clear"

//             };

//             const encryptedPayload = encryptPayload(payload);
//             const data = {
//                 request_data: decodeURIComponent(encryptedPayload)
//             };

//             let instance = NotificationClient;
//             let headers = {
//                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//             };

//             console.log("Clearing Notifications:", data);

//             const response = await postJWtHttpClient(await instance, '/clear', null, data, headers);
//             console.log("Clear Notifications Response:", response);

//             // Clear notifications state
//             setUnreadCount(0);
//             setNotification([]);

//         } catch (err) {
//             console.error("Error clearing notifications:", err);
//         }
//     }
// };

// export default NotificationService;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient, postJWtHttpClient } from "./axiosClient";
import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";
import { BASE_URL, NOTIFICATION } from "../../config/api-config";

const NotificationClient = apiClient(BASE_URL + NOTIFICATION);

const NotificationService = {
    fetchNotifications: async (
        item: { notification_id?: any }, 
        page: number,
        pageLimit: number,
        setNotification: (arg0: any[]) => void,
        setUnreadCount: (arg0: number) => void,
        setRefreshing: (arg0: boolean) => void
    ) => {
        setRefreshing(true);
        try {
            const userId = await AsyncStorage.getItem("user_id");
            if (!userId) throw new Error("User ID not found in AsyncStorage");

            const payload = {
                user_id: userId,
                limit: `${(page - 1) * pageLimit},${pageLimit}`,
                notification_id: item?.notification_id || null,
            };

            const encryptedPayload = encryptPayload(payload);
            const data = { request_data: decodeURIComponent(encryptedPayload) };

            console.log("Fetching Notifications:", data);

            let headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
            const response = await postJWtHttpClient(await NotificationClient, '', null, data, headers);

            if (response?.data?.notification_data) {
                const decryptedNotifications = decryptData(response.data.notification_data);
                const unreadCount = decryptData(response.data.count_notification) || 0;
                
                setNotification(Array.isArray(decryptedNotifications) ? decryptedNotifications : []);
                setUnreadCount(unreadCount);
            } else {
                console.warn("Invalid response structure:", response);
                setNotification([]);
                setUnreadCount(0);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                if ((error as any).response) {
                    console.error("Server Error:", (error as any).response.status, (error as any).response.data);
                } else if ((error as any).request) {
                    console.error("No response received from server:", (error as any).request);
                } else {
                    console.error("Request Setup Error:", error.message);
                }
            } else {
                console.error("An unknown error occurred:", error);
            }
        }
        finally {
            setRefreshing(false);
        }
    },

    clearNotifications: async (
        page: number,
        pageLimit: number,
        setNotification: (arg0: never[]) => void,
        setUnreadCount: (arg0: number) => void
    ) => {
        try {
            const userId = await AsyncStorage.getItem("user_id");
            if (!userId) throw new Error("User ID not found in AsyncStorage");

            const payload = {
                user_id: userId,
                limit: `${(page - 1) * pageLimit},${pageLimit}`,
                clear_all: "clear"
            };

            const encryptedPayload = encryptPayload(payload);
            const data = { request_data: decodeURIComponent(encryptedPayload) };

            console.log("Clearing Notifications:", data);

            let headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
            await postJWtHttpClient(await NotificationClient, '', null, data, headers);

            setUnreadCount(0);
            setNotification([]);
        } catch (error: unknown) {
            if (error instanceof Error) {
                if ((error as any).response) {
                    console.error("Server Error:", (error as any).response.status, (error as any).response.data);
                } else if ((error as any).request) {
                    console.error("No response received from server:", (error as any).request);
                } else {
                    console.error("Request Setup Error:", error.message);
                }
            } else {
                console.error("An unknown error occurred:", error);
            }
        }
        
        
    }
};

export default NotificationService;

