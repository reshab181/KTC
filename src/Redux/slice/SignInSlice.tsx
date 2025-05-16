import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verifyEmailApi } from "../../services/api/verifyEmailApi";
import { SignInApii } from "../../services/api/SignInApi";
import { decryptData } from "../../Api/Authentication";

interface SignInState {
    loading: boolean;
    error: any | null;
    data: any | null;
}

const initialState: SignInState = {
    loading: false,
    error: null,
    data: null,
  };

  export const SignIn = createAsyncThunk(
    'SignIn',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
      try {
        console.log("SLICE SIGNIN");
        const response = await SignInApii(email, password);
      
        return response.data; // Return decrypted data
      }catch (error: any) {
        console.log("SLICE SIGNIN ERROR", error);
        return rejectWithValue(
          error.response?.data?.message || "Invalid credentials"
        );
     }
     
    }
  );
  
// export const SignIn = createAsyncThunk(
//     'SignIn',
//     async({email, password }: {email: string, password: string }, { rejectWithValue }) => {
//         try {
//             const response = await SignInApii(email, password )
//         console.log('====================================');
//         console.log("SLICE SIGNIN" , decryptData(response.data.result));
//         console.log('====================================');
//             return response.data.result ; 
//         } catch(error: any) {
//             return rejectWithValue(error.response?.data || 'Something went wrong');
//         }
//     }
// )

const SignInSlice = createSlice({
    name: 'SignIn',
    initialState,
    reducers: {
        resetSignInState: (state) => {
            state.loading = initialState.loading;
            state.error = initialState.error;
            state.data = initialState.data;
        },
    },
    extraReducers: builder => {
      builder
        .addCase(SignIn.pending, state => {
          state.loading = true;
          state.error = null;
          state.data = null;
        })
        .addCase(SignIn.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        })
        .addCase(SignIn.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.data = null;
        });
    },
})
export const {resetSignInState} = SignInSlice.actions;
export default SignInSlice.reducer;