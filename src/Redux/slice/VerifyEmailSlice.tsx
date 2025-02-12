import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verifyEmailApi } from "../../services/api/verifyEmailApi";

interface VerifyEmailState {
    loading: boolean;
    error: any | null;
    data: any | null;
}

const initialState: VerifyEmailState = {
    loading: false,
    error: null,
    data: null,
  };

export const verifyEmail = createAsyncThunk(
    'verifyEmail',
    async({email, module}: {email: string, module: string}, { rejectWithValue }) => {
        try {
            const response = await verifyEmailApi(email, module)
            return response.data
        } catch(error: any) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
)

const verifyEmailSlice = createSlice({
    name: 'verifyEmail',
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
        .addCase(verifyEmail.pending, state => {
          state.loading = true;
          state.error = null;
          state.data = null;
        })
        .addCase(verifyEmail.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        })
        .addCase(verifyEmail.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.data = null;
        });
    },
})
export const {resetState} = verifyEmailSlice.actions;
export default verifyEmailSlice.reducer;