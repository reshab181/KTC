import { Alert, Platform } from 'react-native';
import { tokenFromMMI } from '../services/ServiceRequest';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash.debounce';
import { ANCHOR_URL } from '@env';
import Api from '../services/Api';
import { useSelector } from 'react-redux';
import { encryptPayload, decryptData } from './Authentication';
import { fetchJwtAccess } from '../Utils/JwtHelper';

const encryption = async (data) => {
    var CryptoJS = require("crypto-js");
    const ClientID = '!IV@_$2123456789';
    const Clientkey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
    const CryptoJsCI = CryptoJS.enc.Utf8.parse(ClientID);
    const CryptoJsCK = CryptoJS.enc.Utf8.parse(Clientkey);
    const EncryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJsCK, {
        iv: CryptoJsCI,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    })
    const Result = EncryptedData.ciphertext.toString(CryptoJS.enc.Base64);
    return Result
}


export const fetchCities = async (city, userDetails, token, setcity, cityList) => {
    console.log('====================================');
    console.log("FETCHING CITIES");
    console.log('====================================');
    // const mmiToken = await tokenFromMMI();
    const currentDate = Math.floor(Date.now() / 1000);
    console.log('====================================');
    console.log(currentDate);
    console.log('====================================');
    // const userDetails = useSelector((state) => state.userprofile);
    console.log('====================================');
    console.log("USERDETAILS", userDetails);
    console.log('====================================');
    const loadData = {
        "client_id": userDetails?.client_id,
        "start_date": currentDate,
        "city_of_usage": city
    }
    console.log('====================================');
    console.log(loadData);
    console.log('====================================');
    try {
        const MyPayLoad = await encryption(loadData)
        console.log('====================================');
        console.log(MyPayLoad, "MYPAYLOAD");
        //   JXQQ/0Nc8aGsaJQDJY9e8g5rQJSvAFISmGZ9u8ver3QehPHkCtDQOd7+Byjp0tYXD0TOYb42l9logHr/sFkQrw== MYPAYLOAD
        console.log('===============================s=====');
        var details = {
            'request_data': MyPayLoad,
        };
        console.log('====================================');
        console.log("DETAILS", details);
        //   DETAILS {"request_data": "JXQQ/0Nc8aGsaJQDJY9e8g5rQJSvAFISmGZ9u8ver3QehPHkCtDQOd7+Byjp0tYXD0TOYb42l9logHr/sFkQrw=="}
        console.log('====================================');
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log('====================================');
        console.log("FORM BODY", formBody);
        //   FORM BODY request_data=JXQQ%2F0Nc8aGsaJQDJY9e8g5rQJSvAFISmGZ9u8ver3QehPHkCtDQOd7%2BByjp0tYXD0TOYb42l9logHr%2FsFkQrw%3D%3D
        console.log('====================================');
        let response = await fetch("https://web.gst.fleet.ktcindia.com/user_apis_encoded/booking_param.php", {
            method: "POST",
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'jwt': token
            },
        })
        let data = await response?.json();
        console.log('====================================');
        console.log("DATaa", data);
        console.log('====================================');
        if (cityList.length == 0) {
            var CryptoJS = require("crypto-js");
            var data1 = data?.city_of_usage
            var rawData = CryptoJS.enc.Base64.parse(data1);
            var key1 = CryptoJS.enc.Latin1.parse("*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh");
            var iv1 = CryptoJS.enc.Latin1.parse("!IV@_$2123456789")
            var plaintextData = CryptoJS.AES.decrypt({ ciphertext: rawData }, key1, { iv: iv1 })
            var plaintext = plaintextData.toString(CryptoJS.enc.Utf8)
            var ValueText = JSON.parse(plaintext)
            console.log('====================================');
            console.log("ValueText", ValueText);
            console.log('====================================');
            var mCityItems = [];
            ValueText?.map((item, index) => {
                mCityItems.push(item)
            });
            console.log('====================================');
            console.log("Setting City ");
            console.log('====================================');
            // setcity(mCityItems);
            cityList = mCityItems;
            setcity(cityList);
            console.log('====================================');
            console.log("CityList", cityList);
            console.log('====================================');
            return cityList ; 
        }
        // }
        // const responseData = await response.json();
        // return responseData;
    } catch (error) {
        throw new Error('Error Fetching Citites', error.message);
    }
};
