// // // Ashutosh Rai
// // import { createSlice } from '@reduxjs/toolkit';
// // import PaymentMethod from '../../Screens/Pages/PaymentMethod';



// // const initialState = {
// //   city : '',
// //   rentalType : '',
// //   carGroup :  '', 
// //   pickupAddress : {} , 
// //   reportingLandmark: '', 
// //   selectedDate : '' , 
// //   selectedTime: "" , 
// //   paymentMethod : "" ,
// //   specialInstruction: "", 
// //   flightTrainInfo : "", 
// //   paymentMode: "", 
// //   empId: '', 
// //   referenceNumber :"" , 
// //   bookingCode: "", 
// //   trNumber: '', 
// //   billNumber: ''

// // };


// // const CorporateSlice = createSlice({
// //   name: 'carReservation',
// //   initialState,
// //   reducers: {
// //     updateCorporateSlice: (state, action) => {
// //       const {type, selectedItem}=action.payload
// //       if(type==="city"){
// //         state.city=selectedItem;
// //       }else if(type==="rentalType"){
// //         state.rentalType=selectedItem;
// //       }else if(type === "carGroup"){
// //         state.carGroup = selectedItem; 
// //       }else if(type === "pickupAddress"){
// //         state.pickupAddress = selectedItem ; 
// //       }else if(type === "selectedDate"){
// //         state.selectedDate = selectedItem ; 
// //       }else if(type === "selectedTime"){
// //         state.selectedTime = selectedItem ; 
// //       }else if(type === "reportingLandmark"){
// //         state.reportingLandmark = selectedItem ; 
// //       }else if(type === "specialInstruction"){
// //         state.specialInstruction = selectedItem ; 
// //       }else if(type === "flightTrainInfo"){
// //         state.flightTrainInfo = selectedItem ; 
// //       }else if(type === "paymentMode"){
// //         state.paymentMode = selectedItem ; 
// //       }
// //     },
// //   },

// // });

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import reviewConfirm from "../../Api/ReviewConfirm";
// import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";

// // 🔹 Initial State (Same as Payload)
// const initialState = {
//   companyname: "",
//   Guestname: "",
//   Guestcontacto: "",
//   guestemail: "",
//   Guestflight: "",
//   Reportingplace: "",
//   start_date: "",
//   Reporingtime: "",
//   assignment: "",
//   city_of_usage: "",
//   vehiclerequested: "",
//   instruction: "",
//   payment_mode: "",
//   user_id: "",
//   PGorderid: "",
//   custom_column: "",
//   endate: "",
//   eloc: "",
// };


// export const createCorporateBooking = createAsyncThunk(
//   "corporate/createCorporateBooking",
//   async (payload, { rejectWithValue }) => {
//     try {
  
//       const encryptedPayload = encryptPayload(payload);

//       let formBody = new URLSearchParams();
//       formBody.append("request_data", encryptedPayload);

     
//       const response = await reviewConfirm.post("create_booking.php",formBody);

   
//       if (response.data?.message === "Access denied.") {
//         return rejectWithValue("Access Denied. Please refresh token.");
//       }

      
//       const decryptedResponse = decryptData(response.data?.booking_number);
      
//       return decryptedResponse;
      
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "An unexpected error occurred.");
//     }
//   }
// );


// const corporateSlice = createSlice({
//   name: "corporate",
//   initialState,
//   reducers: {
//     updateCorporateSlice: (state, action) => {
//       Object.assign(state, action.payload); 
//     },
//     resetCorporateSlice: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createCorporateBooking.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createCorporateBooking.fulfilled, (state, action) => {
//         state.loading = false;
//         state.corporateBookingData = action.payload;
//         state.alertVisible = true;
//       })
//       .addCase(createCorporateBooking.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to create corporate booking.";
//       });
//   },
// });

// // 🔹 Export Actions & Reducer
// export const { updateCorporateSlice, resetCorporateSlice } = corporateSlice.actions;
// export default corporateSlice.reducer;

// // export const { updateCorporateSlice } = CorporateSlice.actions;
// // export default CorporateSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import reviewConfirm from "../../Api/ReviewConfirm";
// import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";


// const initialState = {
//   // city: "",
//   // rentalType: "",
//   // carGroup: "",
//   pickupAddress: {},
//   // reportingLandmark: "",
//   // selectedDate: "",
//   // selectedTime: "",
//   // paymentMethod: "",
//   // specialInstruction: "",
//   // flightTrainInfo: "",
//   paymentMode: "",
//   empId: "",
//   referenceNumber: "",
//   bookingCode: "",
//   trNumber: "",
//   billNumber: "",
//   companyname: "",
//   Guestname: "",
//   Guestcontacto: "",
//   guestemail: "",
//   Guestflight: "",
//   Reportingplace: "",
//   start_date: "",
//   Reporingtime: "",
//   assignment: "",
//   city_of_usage: "",
//   vehiclerequested: "",
//   instruction: "",
//   user_id: "",
//   PGorderid: "",
//   custom_column: "",
//   endate: "",
//   eloc: "",
// };


// export const createCorporateBooking = createAsyncThunk(
//   "corporate/createCorporateBooking",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const encryptedPayload = encryptPayload(payload);

//       let formBody = new URLSearchParams();
//       formBody.append("request_data", encryptedPayload);

//       const response = await reviewConfirm.post("create_booking.php", formBody);

//       if (response.data?.message === "Access denied.") {
//         return rejectWithValue("Access Denied. Please refresh token.");
//       }

//       const decryptedResponse = decryptData(response.data?.booking_number);
//       return decryptedResponse;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "An unexpected error occurred.");
//     }
//   }
// );

// const corporateSlice = createSlice({
//   name: "corporate",
//   initialState,
//   reducers: {
//     updateCorporateSlice: (state, action) => {
//       const { type, selectedItem } = action.payload;

//       if (type in state) {
//         state[type] = selectedItem;
//       }
//     },
//     resetCorporateSlice: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createCorporateBooking.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createCorporateBooking.fulfilled, (state, action) => {
//         state.loading = false;
//         state.corporateBookingData = action.payload;
//         state.alertVisible = true;
//         state.testRemark = "Test======================="
//       })
//       .addCase(createCorporateBooking.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to create corporate booking.";
//       });
//   },
// });

// // 🔹 Export Actions & Reducer
// export const { updateCorporateSlice, resetCorporateSlice } = corporateSlice.actions;
// export default corporateSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewConfirm from "../../Api/ReviewConfirm";
import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";

const initialState = {
  pickupAddress: {},
  paymentMode: "",
  empId: "",
  referenceNumber: "",
  bookingCode: "",
  trNumber: "",
  billNumber: "",
  companyname: "",
  Guestname: "",
  Guestcontacto: "",
  guestemail: "",
  Guestflight: "",
  Reportingplace: "",
  start_date: "",
  Reporingtime: "",
  assignment: "",
  city_of_usage: "",
  vehiclerequested: "",
  instruction: "",
  user_id: "",
  PGorderid: "",
  custom_column: "",
  endate: "",
  eloc: "",
  loading: false,
  error: null,
  corporateBookingData: null,
  alertVisible: false,
  testRemark: "",
};

export const createCorporateBooking = createAsyncThunk(
  "corporate/createCorporateBooking",
  async (payload, { rejectWithValue }) => {
    try {
      const encryptedPayload = encryptPayload(payload);

      let formBody = new URLSearchParams();
      formBody.append("request_data", encryptedPayload);

      
      const response = await reviewConfirm.post("create_booking.php", formBody);

      console.log("Response Data:", response.data);


      if (response.data?.message === "Access denied.") {
        return rejectWithValue("Access Denied. Please refresh token.");
      }


      if (!response.data?.booking_number) {
        return rejectWithValue("Invalid response from the server.");
      }

      const decryptedResponse = decryptData(response.data);
      return decryptedResponse;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "An unexpected error occurred."
      );
    }
  }
);

const corporateSlice = createSlice({
  name: "corporate",
  initialState,
  reducers: {
    updateCorporateSlice: (state, action) => {
      const { type, selectedItem } = action.payload;
      if (type in state) {
        state[type] = selectedItem;
      }
    },
    resetCorporateSlice: () => ({ ...initialState }), 
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCorporateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCorporateBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.corporateBookingData = action.payload;
        state.alertVisible = true;
        state.testRemark = "test==============================";
      })
      .addCase(createCorporateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create corporate booking.";
      });
  },
});


export const { updateCorporateSlice, resetCorporateSlice } = corporateSlice.actions;
export default corporateSlice.reducer;
