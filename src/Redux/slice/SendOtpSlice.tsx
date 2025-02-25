import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendOtpApi } from "../../services/api/sendOtpApi";

interface SendOtpState {
    loading: boolean;
    error: any | null;
    data: string | null;
}

const initialState: SendOtpState = {
    loading: false,
    error: null,
    data: null,
};

export const sendOtp = createAsyncThunk(
    'sendOtp',
    async(email: string, { rejectWithValue }) => {
        try {
            return "https://anchor.mapmyindia.com/api/otp/otp1740312070i1366294528/validate"
            const response = await sendOtpApi(email)
            if(response.status === 201 && response?.headers?.location){
                
                return response?.headers?.location
            } else {
                if(response.headers?.message) {
                    return rejectWithValue(response.headers?.message)
                } else {
                    return rejectWithValue(response?.data || 'Something went wrong');
                }
            }
        } catch(error: any) {
            console.log(error)
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
)

const sendOtpSlice = createSlice({
    name: 'sendOtp',
    initialState,
    reducers: {
        resetSendOtpState: (state) => {
            state.loading = initialState.loading;
            state.error = initialState.error;
            state.data = initialState.data;
        },
    },
    extraReducers: builder => {
      builder
        .addCase(sendOtp.pending, state => {
          state.loading = true;
          state.error = null;
          state.data = null;
        })
        .addCase(sendOtp.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        })
        .addCase(sendOtp.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.data = null;
        });
    },
})
export const {resetSendOtpState} = sendOtpSlice.actions;
export default sendOtpSlice.reducer;