// // // // Ashutosh Rai
// // // import { createSlice } from '@reduxjs/toolkit';
// // // import PaymentMethod from '../../Screens/Pages/PaymentMethod';



// // // const initialState = {
// // //   city : '',
// // //   rentalType : '',
// // //   carGroup :  '', 
// // //   pickupAddress : {} , 
// // //   reportingLandmark: '', 
// // //   selectedDate : '' , 
// // //   selectedTime: "" , 
// // //   paymentMethod : "" ,
// // //   specialInstruction: "", 
// // //   flightTrainInfo : "", 
// // //   paymentMode: "", 
// // //   empId: '', 
// // //   referenceNumber :"" , 
// // //   bookingCode: "", 
// // //   trNumber: '', 
// // //   billNumber: ''

// // // };


// // // const CorporateSlice = createSlice({
// // //   name: 'carReservation',
// // //   initialState,
// // //   reducers: {
// // //     updateCorporateSlice: (state, action) => {
// // //       const {type, selectedItem}=action.payload
// // //       if(type==="city"){
// // //         state.city=selectedItem;
// // //       }else if(type==="rentalType"){
// // //         state.rentalType=selectedItem;
// // //       }else if(type === "carGroup"){
// // //         state.carGroup = selectedItem; 
// // //       }else if(type === "pickupAddress"){
// // //         state.pickupAddress = selectedItem ; 
// // //       }else if(type === "selectedDate"){
// // //         state.selectedDate = selectedItem ; 
// // //       }else if(type === "selectedTime"){
// // //         state.selectedTime = selectedItem ; 
// // //       }else if(type === "reportingLandmark"){
// // //         state.reportingLandmark = selectedItem ; 
// // //       }else if(type === "specialInstruction"){
// // //         state.specialInstruction = selectedItem ; 
// // //       }else if(type === "flightTrainInfo"){
// // //         state.flightTrainInfo = selectedItem ; 
// // //       }else if(type === "paymentMode"){
// // //         state.paymentMode = selectedItem ; 
// // //       }
// // //     },
// // //   },

// // // });

// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import reviewConfirm from "../../Api/ReviewConfirm";
// // import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";

// // // 🔹 Initial State (Same as Payload)
// // const initialState = {
// //   companyname: "",
// //   Guestname: "",
// //   Guestcontacto: "",
// //   guestemail: "",
// //   Guestflight: "",
// //   Reportingplace: "",
// //   start_date: "",
// //   Reporingtime: "",
// //   assignment: "",
// //   city_of_usage: "",
// //   vehiclerequested: "",
// //   instruction: "",
// //   payment_mode: "",
// //   user_id: "",
// //   PGorderid: "",
// //   custom_column: "",
// //   endate: "",
// //   eloc: "",
// // };


// // export const createCorporateBooking = createAsyncThunk(
// //   "corporate/createCorporateBooking",
// //   async (payload, { rejectWithValue }) => {
// //     try {
  
// //       const encryptedPayload = encryptPayload(payload);

// //       let formBody = new URLSearchParams();
// //       formBody.append("request_data", encryptedPayload);

     
// //       const response = await reviewConfirm.post("create_booking.php",formBody);

   
// //       if (response.data?.message === "Access denied.") {
// //         return rejectWithValue("Access Denied. Please refresh token.");
// //       }

      
// //       const decryptedResponse = decryptData(response.data?.booking_number);
      
// //       return decryptedResponse;
      
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data?.message || "An unexpected error occurred.");
// //     }
// //   }
// // );


// // const corporateSlice = createSlice({
// //   name: "corporate",
// //   initialState,
// //   reducers: {
// //     updateCorporateSlice: (state, action) => {
// //       Object.assign(state, action.payload); 
// //     },
// //     resetCorporateSlice: () => initialState,
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(createCorporateBooking.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(createCorporateBooking.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.corporateBookingData = action.payload;
// //         state.alertVisible = true;
// //       })
// //       .addCase(createCorporateBooking.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload || "Failed to create corporate booking.";
// //       });
// //   },
// // });

// // // 🔹 Export Actions & Reducer
// // export const { updateCorporateSlice, resetCorporateSlice } = corporateSlice.actions;
// // export default corporateSlice.reducer;

// // // export const { updateCorporateSlice } = CorporateSlice.actions;
// // // export default CorporateSlice.reducer;


// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import reviewConfirm from "../../Api/ReviewConfirm";
// // import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";


// // const initialState = {
// //   // city: "",
// //   // rentalType: "",
// //   // carGroup: "",
// //   pickupAddress: {},
// //   // reportingLandmark: "",
// //   // selectedDate: "",
// //   // selectedTime: "",
// //   // paymentMethod: "",
// //   // specialInstruction: "",
// //   // flightTrainInfo: "",
// //   paymentMode: "",
// //   empId: "",
// //   referenceNumber: "",
// //   bookingCode: "",
// //   trNumber: "",
// //   billNumber: "",
// //   companyname: "",
// //   Guestname: "",
// //   Guestcontacto: "",
// //   guestemail: "",
// //   Guestflight: "",
// //   Reportingplace: "",
// //   start_date: "",
// //   Reporingtime: "",
// //   assignment: "",
// //   city_of_usage: "",
// //   vehiclerequested: "",
// //   instruction: "",
// //   user_id: "",
// //   PGorderid: "",
// //   custom_column: "",
// //   endate: "",
// //   eloc: "",
// // };


// // export const createCorporateBooking = createAsyncThunk(
// //   "corporate/createCorporateBooking",
// //   async (payload, { rejectWithValue }) => {
// //     try {
// //       const encryptedPayload = encryptPayload(payload);

// //       let formBody = new URLSearchParams();
// //       formBody.append("request_data", encryptedPayload);

// //       const response = await reviewConfirm.post("create_booking.php", formBody);

// //       if (response.data?.message === "Access denied.") {
// //         return rejectWithValue("Access Denied. Please refresh token.");
// //       }

// //       const decryptedResponse = decryptData(response.data?.booking_number);
// //       return decryptedResponse;
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data?.message || "An unexpected error occurred.");
// //     }
// //   }
// // );

// // const corporateSlice = createSlice({
// //   name: "corporate",
// //   initialState,
// //   reducers: {
// //     updateCorporateSlice: (state, action) => {
// //       const { type, selectedItem } = action.payload;

// //       if (type in state) {
// //         state[type] = selectedItem;
// //       }
// //     },
// //     resetCorporateSlice: () => initialState,
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(createCorporateBooking.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(createCorporateBooking.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.corporateBookingData = action.payload;
// //         state.alertVisible = true;
// //         state.testRemark = "Test======================="
// //       })
// //       .addCase(createCorporateBooking.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload || "Failed to create corporate booking.";
// //       });
// //   },
// // });

// // // 🔹 Export Actions & Reducer
// // export const { updateCorporateSlice, resetCorporateSlice } = corporateSlice.actions;
// // export default corporateSlice.reducer;


// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import reviewConfirm from "../../Api/ReviewConfirm";
// // import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";

// // //  Initial State
// // const initialState = {
// //   paymentMode: "",
// //   companyname: "",
// //   Guestname: "",
// //   Guestcontacto: "",
// //   guestemail: "",
// //   Guestflight: "",
// //   Reportingplace: "",
// //   start_date: "",
// //   Reporingtime: "",
// //   assignment: "",
// //   city_of_usage: "",
// //   vehiclerequested: "",
// //   instruction: "",
// //   user_id: "",
// //   PGorderid: "",
// //   custom_column: "",
// //   endate: "",
// //   eloc: "",
// // };


// // export const createCorporateBooking = createAsyncThunk(
// //   "corporate/createCorporateBooking",
// //   async (payload, { rejectWithValue }) => {
// //     try {
// //       console.log("Payload before encryption:", payload);


// //       const encryptedPayload = encryptPayload(payload);
// //       console.log(" Encrypted Payload:", encryptedPayload);

// //       let formBody = new URLSearchParams();
// //       formBody.append("request_data", encryptedPayload);

// //       console.log("⏳ Sending request to API...");
// //       const response = await reviewConfirm.post(
// //         "create_booking.php",
// //         formBody,
// //         { timeout: 10000 }
// //       );

// //       console.log("API Response:", response);

// //       if (response.data?.message === "Access denied.") {
// //         console.error("❌ Access Denied");
// //         return rejectWithValue("Access Denied. Please refresh token.");
// //       }

// //       if (!response.data?.booking_number) {
// //         console.error("❌ Invalid response from API");
// //         return rejectWithValue("Invalid response from the server.");
// //       }

// //       // 🔓 Decrypt Response
// //       const decryptedResponse = decryptData(response.data);
// //       console.log("🟢 Decrypted Response:", decryptedResponse);

// //       return decryptedResponse;
// //     } catch (error) {
// //       console.error("❌ API Error:", error);
// //       return rejectWithValue(
// //         error.response?.data?.message || error.message || "An unexpected error occurred."
// //       );
// //     }
// //   }
// // );



// // const corporateSlice = createSlice({
// //   name: "corporate",
// //   initialState,
// //   reducers: {
// //     updateCorporateSlice: (state, action) => {
// //       const { type, selectedItem } = action.payload;

// //       if (type === "custom_column") {
// //         try {
// //           const parsedData = JSON.parse(state.custom_column || "{}");
// //           state.custom_column = { ...parsedData, ...selectedItem };
// //         } catch (error) {
// //           console.error("Error parsing custom_column:", error);
// //           state.custom_column = selectedItem;
// //         }
// //       } else if (type in state) {
// //         state[type] = selectedItem;
// //       }
// //     },

// //     resetCorporateSlice: () => ({ ...initialState }),
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(createCorporateBooking.pending, (state) => {
// //         console.log(" Booking request pending...");'
// //        '
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(createCorporateBooking.fulfilled, (state, action) => {
// //         console.log(" Booking request successful:", action.payload);
// //         state.loading = false;
// //         state.corporateBookingData = action.payload;
// //         state.alertVisible = true;
// //         state.testRemarks="test======================"
// //       })
// //       .addCase(createCorporateBooking.rejected, (state, action) => {
// //         console.error(" Booking request failed:", action.payload);
// //         state.loading = false;
// //         state.error = action.payload || "Failed to create corporate booking.";
// //       });
// //   }
// // });


// // export const { updateCorporateSlice, resetCorporateSlice } = corporateSlice.actions;
// // export default corporateSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { reviewBookingApi } from "../../services/api/reviewBooking";
// import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";


// const initialState = {
//   loading: false,
//   error: null,
//   bookingData: null,
//   alertVisible: false,
//   // Booking details
//   paymentMode: "",
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
//   eloc: ""
// };

// // export const createCorporateBooking = createAsyncThunk(
// //   "review/createReviewBooking",
// //   async (payload, { rejectWithValue }) => {
// //     try {
// //       console.log("Payload before encryption:", payload);

    
// //       const response = await reviewBookingApi(payload);
// //       console.log("API Response:", response.data);

// //       if (response.data?.message === "Access denied.") {
// //         console.error(" Access Denied");
// //         return rejectWithValue("Access Denied. Please refresh token.");
// //       }

// //       if (!response.data?.booking_number) {
// //         console.error(" Invalid response from API");
// //         return rejectWithValue("Invalid response from the server.");
// //       }

  
// //       const decryptedResponse = decryptData(response.data);
// //       console.log(" Decrypted Response:", decryptedResponse);

// //       return decryptedResponse;
// //     } catch (error) {
// //       console.error(" API Error:", error);
// //       return rejectWithValue(
// //         error.response?.data?.message || error.message || "An unexpected error occurred."
// //       );
// //     }
// //   }
// // );
// export const createCorporateBooking = createAsyncThunk(
//   "review/createReviewBooking",
//   async (payload, { rejectWithValue }) => {
//     try {
//       console.log("Payload before encryption:", payload);

//       const response = await reviewBookingApi(payload);
//       console.log("API Response:", response.data);

//       if (response.data?.message === "Access denied.") {
//         console.error(" Access Denied");
//         return rejectWithValue("Access Denied. Please refresh token.");
//       }

//       if (!response.data?.booking_number) {
//         console.error(" Invalid response from API");
//         return rejectWithValue("Invalid response from the server.");
//       }

    
//       const decryptedBookingNumber = decryptData(response.data.booking_number);
//       console.log("Decrypted Booking Number:", decryptedBookingNumber);

//       return decryptedBookingNumber;
//     } catch (error) {
//       console.error(" API Error:", error);
//       return rejectWithValue(
//         error.response?.data?.message || error.message || "An unexpected error occurred."
//       );
//     }
//   }
// );

// const corporateSlice = createSlice({
//   name: "reviewBooking",
//   initialState,
//   reducers: {
//     updateCorporateSlice: (state, action) => {
//       const { type, selectedItem } = action.payload;
//       if (type === "custom_column") {
//         try {
//           const parsedData = typeof state.custom_column === "string"
//             ? JSON.parse(state.custom_column)
//             : state.custom_column || {};
      
//           state.custom_column = { ...parsedData, ...selectedItem };
//         } catch (error) {
//           console.error("Error parsing custom_column:", error);
//           state.custom_column = selectedItem; 
//         }
//       }else if (type in state) {
//         state[type] = selectedItem;
//       }
//     },

//     resetCorporateSlice: (state) => {
//       return initialState; // Reset to initial state
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createCorporateBooking.pending, (state) => {
//         console.log(" Review booking request pending...");
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createCorporateBooking.fulfilled, (state, action) => {
//         console.log(" Review booking request successful:", action.payload);
//         state.loading = false;
//         state.bookingData = action.payload;
//         state.alertVisible = true;
//         state.testRemarks= "test==========================="
//       })
//       .addCase(createCorporateBooking.rejected, (state, action) => {
//         console.error(" Review booking request failed:", action.payload);
//         state.loading = false;
//         state.error = action.payload || "Failed to create review booking.";
//       });
//   }
// });

// export const { updateCorporateSlice, resetCorporateSlice } = corporateSlice.actions;
// export default corporateSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { reviewBookingApi } from "../../services/api/reviewBooking";
// import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";

// const initialState = {
//   loading: false,
//   error: null,
//   bookingData: null,
//   alertVisible: false,
//   // Booking details
//   paymentMode: "",
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
//   eloc: ""
// };

// export const createCorporateBooking = createAsyncThunk(
//   "review/createReviewBooking",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await reviewBookingApi(payload);

//       if (response.data?.message === "Access denied.") {
//         return rejectWithValue("Access Denied. Please refresh token.");
//       }

//       if (!response.data?.booking_number) {
//         return rejectWithValue("Invalid response from the server.");
//       }

//       const decryptedBookingNumber = decryptData(response.data.booking_number);
//       return decryptedBookingNumber;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || "An unexpected error occurred."
//       );
//     }
//   }
// );

// const corporateSlice = createSlice({
//   name: "reviewBooking",
//   initialState,
//   reducers: {
//     updateCorporateSlice: (state, action) => {
//       const { type, selectedItem } = action.payload;
//       if (type === "custom_column") {
//         try {
//           const parsedData = typeof state.custom_column === "string"
//             ? JSON.parse(state.custom_column)
//             : state.custom_column || {};
      
//           state.custom_column = { ...parsedData, ...selectedItem };
//         } catch (error) {
//           state.custom_column = selectedItem; 
//         }
//       } else if (type in state) {
//         state[type] = selectedItem;
//       }
//     },

//     resetCorporateSlice: () => initialState
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createCorporateBooking.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createCorporateBooking.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bookingData = action.payload;
//         state.alertVisible = true;
//       })
//       .addCase(createCorporateBooking.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to create review booking.";
//       });
//   }
// });

// export const { updateCorporateSlice, resetCorporateSlice } = corporateSlice.actions;
// export default corporateSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reviewBookingApi } from "../../services/api/reviewBooking";
import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";

// Initial state with necessary fields
const initialState = {
  loading: false,
  error: null,
  bookingData: null,
  alertVisible: false,
  paymentMode: "abc",
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
  eloc: ""
};


// export const createCorporateBooking = createAsyncThunk(
//   "review/createReviewBooking",
//   async (payload, { rejectWithValue }) => {
//     try {
    
//       const response = await reviewBookingApi(payload);

     
//       if (response.data?.message === "Access denied.") {
//         return rejectWithValue("Access Denied. Please refresh token.");
//       }

    
//       if (!response.data?.booking_number) {
//         return rejectWithValue("Invalid response from the server.");
//       }

      
//       const decryptedBookingNumber = decryptData(response.data.booking_number);
//       return decryptedBookingNumber;
//     } catch (error) {
   
//       return rejectWithValue(
//         error.response?.data?.message || error.message || "An unexpected error occurred."
//       );
//     }
//   }
// );
export const createCorporateBooking = createAsyncThunk(
  "review/createReviewBooking",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await reviewBookingApi(payload);
      console.log("Full API Response:", response);

      const data = response?.data;

      if (!data || !data.message) {
        return rejectWithValue("Invalid API response. Please check the server.");
      }

      if (data.message === "Access denied.") {
        return rejectWithValue("Access Denied. Please refresh token.");
      }

      if (!data.booking_number) {
        return rejectWithValue("Invalid response: booking number missing.");
      }

      const decryptedBookingNumber = decryptData(data.booking_number);
      return decryptedBookingNumber;
    } catch (error) {
      console.error("API Error:", error);

      if (!error.response) {
        return rejectWithValue("Network error. Please check your connection.");
      }

      return rejectWithValue(
        error.response?.data?.message || error.message || "An unexpected error occurred."
      );
    }
  }
);


// Reducer slice
const corporateSlice = createSlice({
  name: "reviewBooking",
  initialState,
  reducers: {
    updateCorporateSlice: (state, action) => {
      const { type, selectedItem } = action.payload;
      if (type === "custom_column") {
        try {
          const parsedData = typeof state.custom_column === "string"
            ? JSON.parse(state.custom_column)
            : state.custom_column || {};

          state.custom_column = { ...parsedData, ...selectedItem };
        } catch (error) {
          state.custom_column = selectedItem;
        }
      } else if (type in state) {
        state[type] = selectedItem;
      }
    },

    resetCorporateSlice: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCorporateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCorporateBooking.fulfilled, (state, action) => {
      
        state.loading = false;
        state.bookingData = action.payload;
        state.alertVisible = true; 
      })
      .addCase(createCorporateBooking.rejected, (state, action) => {
        // When booking fails, set error message
        state.loading = false;
        state.error = action.payload || "Failed to create review booking.";
      });
  }
});

export const { updateCorporateSlice, resetCorporateSlice } = corporateSlice.actions;
export default corporateSlice.reducer;
