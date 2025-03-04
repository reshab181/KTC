
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/Userslice';
import profileReducer from './slice/UserProfileSlice';
import corporateReducer from './slice/CorporateSlice';
import verifyEmailReducer from './slice/VerifyEmailSlice';
import sendOtpReducer from './slice/SendOtpSlice';
import signInReducer from './slice/SignInSlice'
import verifyOtpReducer from './slice/VerifyOtpSlice'
import bookingReducer from "./slice/BookingSlice";

const store = configureStore({
  reducer: {
    user: userReducer, 
    userprofile : profileReducer , 
    corporate : corporateReducer , 
    verifyEmail: verifyEmailReducer,
    sendOtp: sendOtpReducer,
    signIn : signInReducer, 
    verifyOtp: verifyOtpReducer,
    booking: bookingReducer,
  

  },
});

export default store;
