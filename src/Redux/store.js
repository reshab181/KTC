
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/Userslice';
import profileReducer from './slice/UserProfileSlice';

const store = configureStore({
  reducer: {
    user: userReducer, 
    userprofile : profileReducer , 
  },
});

export default store;
