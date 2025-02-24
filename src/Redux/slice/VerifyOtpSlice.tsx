import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RNHash from "react-native-hash";
import { string } from "yup";
import verifyOtpApi from "../../services/api/verifyOtpApi";

interface VerifyOtpState {
    loading: boolean;
    error: any | null;
    data: any | null;
}

const initialState: VerifyOtpState = {
    loading: false,
    error: null,
    data: null,
};

export const verifyOtp = createAsyncThunk(
    "verifyOtp",
    async({url, otp, process}: {url: string, otp: string, process: string}, {rejectWithValue}) =>{
     
        const md5Hash = await RNHash.hashString(otp, 'md5');
        const sha256Hash = await RNHash.hashString(md5Hash, 'sha256');
        try {
            console.log(url, sha256Hash, process)
        let response = await verifyOtpApi(url, sha256Hash, process);
        console.log('Success', response)
         if (response.status === 204) {
            return "OTP Verified successfully"
        } else {
            return rejectWithValue("Incorrect Otp")
        }
     } catch(error: any) {
        console.log('error',error)
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
    }
)

const verifyOtpSlice = createSlice({
    name: 'verifyOtp',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = initialState.loading;
            state.error = initialState.error;
            state.data = initialState.data;
        },
    },
    extraReducers: builder => {
      builder
        .addCase(verifyOtp.pending, state => {
          state.loading = true;
          state.error = null;
          state.data = null;
        })
        .addCase(verifyOtp.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        })
        .addCase(verifyOtp.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.data = null;
        });
    },
})
export const {resetState} = verifyOtpSlice.actions;
export default verifyOtpSlice.reducer;