


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { combineReducers } from "redux";
import userReducer from './slice/Userslice';
import profileReducer from './slice/UserProfileSlice';
import corporateReducer from './slice/CorporateSlice';
import verifyEmailReducer from './slice/VerifyEmailSlice';
import sendOtpReducer from './slice/SendOtpSlice';
import signInReducer from './slice/SignInSlice';
import verifyOtpReducer from './slice/VerifyOtpSlice';
import bookingReducer from "./slice/BookingSlice";
import coordsReducer from './slice/CoordsSlice';





const persistConfig = {
  key: 'root',
  storage: AsyncStorage, 
  whitelist: ['userprofile', 'reviewBooking', 'user', 'coords'],
};


const rootReducer = combineReducers({
  user: userReducer, 
  userprofile: profileReducer,  
  reviewBooking: corporateReducer, 
  verifyEmail: verifyEmailReducer,
  sendOtp: sendOtpReducer,
  signIn: signInReducer, 
  verifyOtp: verifyOtpReducer,
  booking: bookingReducer,
  coords:coordsReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

const persistor = persistStore(store);


if (process.env.NODE_ENV !== "production") {
  persistor.subscribe(() => {
    console.log("✅ Redux Persist Store:", store.getState());
  });

  // persistor.subscribe(() => {
  //   console.log("Redux Store after Rehydration:", store.getState());
  // });
}

export { store, persistor };
