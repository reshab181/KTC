
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/Userslice';

const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});

export default store;
