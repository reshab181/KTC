import axios from "axios";
import { CREATE_BOOKING } from "../services/Api";
import { postJWtHttpClient } from "../services/api/axiosClient";

const reviewConfirm = axios.create({
  baseURL: CREATE_BOOKING,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});

reviewConfirm.interceptors.request.use(async (config) => {
  try {
    return postJWtHttpClient(reviewConfirm, "", null, config.data, config.headers);
  } catch (error) {
    return Promise.reject(error);
  }
});

export default reviewConfirm;
