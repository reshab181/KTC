
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './slice/Userslice';
// import profileReducer from './slice/UserProfileSlice';
// import corporateReducer from './slice/CorporateSlice';
// import verifyEmailReducer from './slice/VerifyEmailSlice';
// import sendOtpReducer from './slice/SendOtpSlice';
// import signInReducer from './slice/SignInSlice'
// import verifyOtpReducer from './slice/VerifyOtpSlice'
// import bookingReducer from "./slice/BookingSlice";

// const store = configureStore({
//   reducer: {
//     user: userReducer, 
//     userprofile : profileReducer , 
//     corporate : corporateReducer , 
//     verifyEmail: verifyEmailReducer,
//     sendOtp: sendOtpReducer,
//     signIn : signInReducer, 
//     verifyOtp: verifyOtpReducer,
//     booking: bookingReducer,
  

//   },

// });

// export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ React Native ke liye
// import { combineReducers } from 'redux';
// import userReducer from './slice/Userslice';
// import profileReducer from './slice/UserProfileSlice';
// import corporateReducer from './slice/CorporateSlice';
// import verifyEmailReducer from './slice/VerifyEmailSlice';
// import sendOtpReducer from './slice/SendOtpSlice';
// import signInReducer from './slice/SignInSlice';
// import verifyOtpReducer from './slice/VerifyOtpSlice';
// import bookingReducer from "./slice/BookingSlice";

// // ✅ Reducers ko combine karein
// const rootReducer = combineReducers({
//   user: userReducer,
//   userprofile: profileReducer,
//   corporate: corporateReducer,
//   verifyEmail: verifyEmailReducer,
//   sendOtp: sendOtpReducer,
//   signIn: signInReducer,
//   verifyOtp: verifyOtpReducer,
//   booking: bookingReducer,
// });


// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage, 
//   whitelist: ['user', 'userprofile', 'corporate'], 
// };

// // ✅ Persisted Reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // ✅ Store Create karein
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, 
//     }),
// });

// // ✅ Persistor Create karein
// const persistor = persistStore(store);

// export { store, persistor };
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ For React Native
import { combineReducers } from "redux";
import userReducer from './slice/Userslice';
import profileReducer from './slice/UserProfileSlice';
import corporateReducer from './slice/CorporateSlice';
import verifyEmailReducer from './slice/VerifyEmailSlice';
import sendOtpReducer from './slice/SendOtpSlice';
import signInReducer from './slice/SignInSlice';
import verifyOtpReducer from './slice/VerifyOtpSlice';
import bookingReducer from "./slice/BookingSlice";

// ✅ Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, 
  whitelist: ['userprofile', 'corporate', 'user'],
};


const rootReducer = combineReducers({
  user: userReducer, 
  userprofile: profileReducer,  
  corporate: corporateReducer, 
  verifyEmail: verifyEmailReducer,
  sendOtp: sendOtpReducer,
  signIn: signInReducer, 
  verifyOtp: verifyOtpReducer,
  booking: bookingReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], 
      },
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
