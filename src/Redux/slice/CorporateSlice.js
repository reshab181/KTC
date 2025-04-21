

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reviewBookingApi } from "../../services/api/reviewBooking";
import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";

// Initial state with necessary fields
const initialState = {
  loading: false,
  error: null,
  bookingData: null,
  alertVisible: false,
  paymentMode: "",
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
      
        state.loading = false;
        state.error = action.payload || "Failed to create review booking.";
      });
  }
});

export const { updateCorporateSlice, resetCorporateSlice } = corporateSlice.actions;
export default corporateSlice.reducer;
