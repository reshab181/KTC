
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/Userslice';
import profileReducer from './slice/UserProfileSlice';
import corporateReducer from './slice/CorporateSlice';
const store = configureStore({
  reducer: {
    user: userReducer, 
    userprofile : profileReducer , 
    corporate : corporateReducer , 
  },
});

export default store;
