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
import { accessRefresh } from './apiRefresh';
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
// export const fetchCities = async (city, client_id, token, setCity) => {
//     console.log("Fetching Cities...");

//     const payload = {
//         client_id: client_id,
//         start_date: Math.floor(Date.now() / 1000),
//         city_of_usage: city
//     };

//     try {
//         const data = await fetchData("https://web.gst.fleet.ktcindia.com/user_apis_encoded/booking_param.php", payload, token);
//         const cityList = decryptData(data?.city_of_usage);
//         console.log("Decrypted City List:", cityList);
//         setCity([...cityList]);
//         return cityList;
//     } catch (error) {
//         console.error('Error Fetching Cities:', error.message);
//         throw new Error('Error Fetching Cities');
//     }
// };
export const fetchCities = async (city, client_id, token, setCity) => {
  if (!client_id || !token) {
      throw new Error('Missing required parameters');
  }

  const payload = {
      client_id,
      start_date: Math.floor(Date.now() / 1000),
      city_of_usage: city || ''
  };

  try {
      const response = await fetchData("https://web.gst.fleet.ktcindia.com/user_apis_encoded/booking_param.php", payload, token);
      
   
      if (response?.status === 204 || response?.message === "No City Found") {
          setCity([]);
          return [];
      }

      if (!response?.city_of_usage) {
          console.log('API Response:', response);
          throw new Error('No cities data available');
      }

      const cityList = decryptData(response.city_of_usage);
      const validCityList = Array.isArray(cityList) ? cityList : [];
      
      setCity(validCityList);
      return validCityList;
  } catch (error) {
      console.error('Error Fetching Cities:', error);
      throw error;
  }
};
export const fetchRentalType = async (city, client_id, token) => {
    console.log("Fetching Rental Types...");
    const date =  Math.floor(Date.now() / 1000) ;
    const payload = {
        client_id: client_id,
        start_date:date ,
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

export const fetchHistoryBookings = async (page, pageLimit) => {
    const token = await AsyncStorage.getItem("userToken")
    try {
      var userId = await AsyncStorage.getItem('user_id');
      const MyPayLod = {
        "user_id": userId,
        "type": 'history',
        "limit": `${(page - 1) * pageLimit},${pageLimit}`
      }
      const MyPayLoad = encryptPayload(MyPayLod)
      var details = {
        'request_data': MyPayLoad,
      };
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      let response = await fetch(Api.VIEW_BOOKING, {
        method: "POST",
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          jwt: token
        },
      })
      let data = await response?.json();
      if (data?.message == "Access denied.") {
        accessRefresh(token, fetchHistoryBookings)
      }
      const result = decryptData(data?.booking_arr)
      console.log('====================================');
      console.log(result);
      console.log('====================================');
      return result
      // setList(ValueText);
    } catch (err) {
      console.log(err)
    }
  }

  
export const fetchUpcomingBookings = async (page, pageLimit) => {
    const token = await AsyncStorage.getItem("userToken")
    try {
      var userId = await AsyncStorage.getItem('user_id');
      const MyPayLod = {
        "user_id": userId,
        "type": 'upcoming',
        "limit": `${(page - 1) * pageLimit},${pageLimit}`
      }
      console.log('====================================');
      console.log("MyPayload", userId);
      console.log('====================================');
      const MyPayLoad = encryptPayload(MyPayLod)
      var details = {
        'request_data': MyPayLoad,
      };
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      console.log('====================================');
      console.log("MYpayload" , MyPayLoad);
      console.log('====================================');
      console.log('====================================');
      console.log("FORMBODY" , formBody);
      console.log('====================================');
      formBody = formBody.join("&");
      let response = await fetch("https://web.gst.fleet.ktcindia.com/user_apis_encoded/view_booking.php", {
        method: "POST",
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          jwt: token
        },
      })

      let data = await response?.json();
      console.log('====================================');
      console.log(data, "UPCOMING");
      console.log('====================================');
      if (data?.message == "Access denied.") {
        accessRefresh(token, fetchHistoryBookings)
      }
      console.log('====================================');
      console.log("RESULT" , data.booking_arr);
      console.log('====================================');
      if(data.booking_arr === "No Booking Found."){
        console.log('====================================');
        console.log("REturning" );
        console.log('====================================');
        return ; 
      }else{
        const result = decryptData(data?.booking_arr)
        return result ; 
      }
      // setList(ValueText);
    } catch (err) {
      console.log(err)
    }
  }