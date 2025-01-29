
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  email: '',
  userId: '',
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
  },

});


export const { updateUserDetails } = userSlice.actions;
export default userSlice.reducer;
