
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/Userslice';
import profileReducer from './slice/UserProfileSlice';
import corporateReducer from './slice/CorporateSlice';
import verifyEmailReducer from './slice/VerifyEmailSlice';
import sendOtpReducer from './slice/SendOtpSlice';

const store = configureStore({
  reducer: {
    user: userReducer, 
    userprofile : profileReducer , 
    corporate : corporateReducer , 
    verifyEmail: verifyEmailReducer,
    sendOtp: sendOtpReducer,
  },
});

export default store;
