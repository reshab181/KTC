import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewConfirm from "../../Api/ReviewConfirm";
import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";


export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (payload, { rejectWithValue }) => {
    try {
    
      const encryptedPayload = encryptPayload(payload);

      let formBody = new URLSearchParams();
      formBody.append("request_data", encryptedPayload);

     
      const response = await reviewConfirm.post("create_booking.php", formBody);

      
      if (response.data?.message === "Access denied.") {
        return rejectWithValue("Access Denied. Please refresh token.");
      }

   
      const decryptedResponse = decryptData(response.data?.booking_number);
      return decryptedResponse;
      
    } catch (error) {
   
      return rejectWithValue(error.response?.data?.message || "An unexpected error occurred.");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookingData: null,
    loading: false,
    error: null,
    alertVisible: false,
  },
  reducers: {
    clearBookingState: (state) => {
      state.bookingData = null;
      state.error = null;
      state.alertVisible = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingData = action.payload;
        state.alertVisible = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create booking.";
      });
  },
});

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
