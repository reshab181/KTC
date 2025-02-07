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
import MapplsGL from 'mappls-map-react-native';
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
        var data6 = data?.e_loc
        var rawData = CryptoJS.enc.Base64.parse(data6);
        var key1 = CryptoJS.enc.Latin1.parse("*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh");
        var iv1 = CryptoJS.enc.Latin1.parse("!IV@_$2123456789")
        var plaintextData = CryptoJS.AES.decrypt({ ciphertext: rawData }, key1, { iv: iv1 })
        var plaintexte_loc = plaintextData.toString(CryptoJS.enc.Utf8)
        console.log('====================================');
        console.log(plaintexte_loc);
        const e_loc = plaintexte_loc ; 
        console.log('====================================');
        return { rentalItems, carGroupItems , e_loc};
    } catch (error) {
        console.error('Error Fetching Rental Types:', error.message);
        throw new Error('Error Fetching Rental Types');
    }
};

export const fetchLocalities = (city, eloc) => {
    return new Promise((resolve, reject) => {
        MapplsGL.RestApi.autoSuggest({
            query: city,
            filter: `cop:${eloc}`,
        })
            .then(response => {
                if (response?.suggestedLocations?.length > 0) {
                    const suggestedLocations = response.suggestedLocations.map(location => ({
                        placeName: location.placeName,
                        placeAddress: location.placeAddress,
                        mapplsPin: location.mapplsPin
                    }));
                    resolve(suggestedLocations);
                } else {
                    resolve([]); // Return empty array if no results found
                }
            })
            .catch(error => {
                console.error("Home page error", error);
                reject(error);
            });
    });
};
