import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CREATE_BOOKING} from '../services/Api'


const reviewConfirm = axios.create({
  baseURL: CREATE_BOOKING,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});

reviewConfirm.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("userToken");
  if (token) {
    config.headers["jwt"] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default reviewConfirm;
