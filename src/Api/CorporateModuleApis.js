import { Alert, Platform } from 'react-native';
import { tokenFromMMI } from '../services/ServiceRequest';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash.debounce';
import { ANCHOR_URL } from '@env';
import Api from '../services/Api';
import { useSelector } from 'react-redux';
import { encryptPayload } from './Authentication';
import { fetchJwtAccess } from '../Utils/JwtHelper';

// Encryption function
const encryptData = async (data) => {
    const key = CryptoJS.enc.Utf8.parse('*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh');
    const iv = CryptoJS.enc.Utf8.parse('!IV@_$2123456789');

    return CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
        .ciphertext.toString(CryptoJS.enc.Base64);
};

// Decryption function
const decryptData = (encryptedData) => {
    if (!encryptedData) return null;

    const key = CryptoJS.enc.Latin1.parse('*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh');
    const iv = CryptoJS.enc.Latin1.parse('!IV@_$2123456789');

    const rawData = CryptoJS.enc.Base64.parse(encryptedData);
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: rawData }, key, { iv });

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

// Function to make API requests
const fetchData = async (endpoint, payload, token) => {
    try {
        const encryptedPayload = await encryptData(payload);
        const response = await fetch(endpoint, {
            method: 'POST',
            body: `request_data=${encodeURIComponent(encryptedPayload)}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                jwt: token
            },
        });

        const data = await response.json();
        console.log(`Raw API Response from ${endpoint}:`, data);
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error.message);
        throw new Error('Error fetching data');
    }
};

// Fetch Cities
export const fetchCities = async (city, userDetails, token, setCity) => {
    console.log("Fetching Cities...");

    const payload = {
        client_id: userDetails?.client_id,
        start_date: Math.floor(Date.now() / 1000),
        city_of_usage: city
    };

    try {
        const data = await fetchData("https://web.gst.fleet.ktcindia.com/user_apis_encoded/booking_param.php", payload, token);
        const cityList = decryptData(data?.city_of_usage);

        console.log("Decrypted City List:", cityList);
        setCity([...cityList]); 

        return cityList;
    } catch (error) {
        console.error('Error Fetching Cities:', error.message);
        throw new Error('Error Fetching Cities');
    }
};

// Fetch Rental Types
export const fetchRentalType = async (city, userDetails, token, setCity, typeOff) => {
    console.log("Fetching Rental Types...");

    const payload = {
        client_id: userDetails?.client_id,
        start_date: Math.floor(Date.now() / 1000),
        city_of_usage: city
    };

    try {
        const data = await fetchData("https://web.gst.fleet.ktcindia.com/user_apis_encoded/booking_param.php", payload, token);

        const rentalItems = decryptData(data?.assignment) || [];
        const carGroupItems = decryptData(data?.cartype) || [];

        console.log("Rental Items:", rentalItems);
        console.log("Car Group Items:", carGroupItems);

        return { rentalItems, carGroupItems };
    } catch (error) {
        console.error('Error Fetching Rental Types:', error.message);
        throw new Error('Error Fetching Rental Types');
    }
};

// import { Alert, Platform } from 'react-native';
// import { tokenFromMMI } from '../services/ServiceRequest';
// import axios from 'axios';
// import CryptoJS from 'crypto-js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import debounce from 'lodash.debounce';
// import { ANCHOR_URL } from '@env';
// import Api from '../services/Api';
// import { useSelector } from 'react-redux';
// import { encryptPayload, decryptData } from './Authentication';
// import { fetchJwtAccess } from '../Utils/JwtHelper';

// const encryption = async (data) => {
//     var CryptoJS = require("crypto-js");
//     const ClientID = '!IV@_$2123456789';
//     const Clientkey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
//     const CryptoJsCI = CryptoJS.enc.Utf8.parse(ClientID);
//     const CryptoJsCK = CryptoJS.enc.Utf8.parse(Clientkey);
//     const EncryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJsCK, {
//         iv: CryptoJsCI,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7,
//     })
//     const Result = EncryptedData.ciphertext.toString(CryptoJS.enc.Base64);
//     return Result
// }

// export const fetchCities = async (city, userDetails, token, setcity) => {
//     console.log("FETCHING CITIES...");

//     const currentDate = Math.floor(Date.now() / 1000);
//     const loadData = {
//         "client_id": userDetails?.client_id,
//         "start_date": currentDate,
//         "city_of_usage": city
//     };

//     try {
//         const MyPayLoad = await encryption(loadData);
//         let response = await fetch("https://web.gst.fleet.ktcindia.com/user_apis_encoded/booking_param.php", {
//             method: "POST",
//             body: `request_data=${encodeURIComponent(MyPayLoad)}`,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//                 'jwt': token
//             },
//         });

//         let data = await response.json();
//         console.log("Raw API Response:", data);

//         // Decrypt city list
//         var CryptoJS = require("crypto-js");
//         var data1 = data?.city_of_usage;
//         var rawData = CryptoJS.enc.Base64.parse(data1);
//         var key1 = CryptoJS.enc.Latin1.parse("*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh");
//         var iv1 = CryptoJS.enc.Latin1.parse("!IV@_$2123456789");
//         var plaintextData = CryptoJS.AES.decrypt({ ciphertext: rawData }, key1, { iv: iv1 });
//         var plaintext = plaintextData.toString(CryptoJS.enc.Utf8);
//         var ValueText = JSON.parse(plaintext);

//         console.log("Decrypted City List:", ValueText);
//         setcity([...ValueText]); 


//         return ValueText; // Return the fetched list
//     } catch (error) {
//         console.error('Error Fetching Cities:', error.message);
//         throw new Error('Error Fetching Cities');
//     }
// };
// export const fetchRentalType = async (city, userDetails, token, setcity, typeoff) => {
//     console.log("FETCHING Rental types...");

//     const currentDate = Math.floor(Date.now() / 1000);
//     const loadData = {
//         "client_id": userDetails?.client_id,
//         "start_date": currentDate,
//         "city_of_usage": city
//     };

//     try {
//         const MyPayLoad = await encryption(loadData);
//         let response = await fetch("https://web.gst.fleet.ktcindia.com/user_apis_encoded/booking_param.php", {
//             method: "POST",
//             body: `request_data=${encodeURIComponent(MyPayLoad)}`,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//                 'jwt': token
//             },
//         });

//         let data = await response.json();
//         console.log("Raw API Response:", data);

//         // Decrypt rental items
//         var CryptoJS = require("crypto-js");
//         var data2 = data?.assignment
//         console.log("Data 2 ", data2);
//         var rawData = CryptoJS.enc.Base64.parse(data2);
//         var key1 = CryptoJS.enc.Latin1.parse("*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh");
//         var iv1 = CryptoJS.enc.Latin1.parse("!IV@_$2123456789")
//         var plaintextData = CryptoJS.AES.decrypt({ ciphertext: rawData }, key1, { iv: iv1 });
//         var plaintext = plaintextData.toString(CryptoJS.enc.Utf8);
//         var assignment = JSON.parse(plaintext);

//         var mRentalItems = [];
//         assignment?.map((item, index) => {
//           mRentalItems.push(item);
//         });
//         console.log("MRENTALLIST", mRentalItems);

//         // Decrypt car group items
//         var data3 = data?.cartype;
//         var rawData2 = CryptoJS.enc.Base64.parse(data3);
//         var plaintextData2 = CryptoJS.AES.decrypt({ ciphertext: rawData2 }, key1, { iv: iv1 });
//         var plaintext2 = plaintextData2.toString(CryptoJS.enc.Utf8);
//         var cartype = JSON.parse(plaintext2);

//         var mCarGroupsItems = [];
//         cartype?.map((item, index) => {
//           mCarGroupsItems.push(item);
//         });
//         console.log("CARGROUP", mCarGroupsItems);

//         // Return both rental items and car group items
//         return {
//             rentalItems: mRentalItems,
//             carGroupItems: mCarGroupsItems
//         };

//     } catch (error) {
//         console.error('Error Fetching Rental Types:', error.message);
//         throw new Error('Error Fetching Rental Types');
//     }
// };