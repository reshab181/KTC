
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alternative_no: "",
  bithdate: "",
  client_id: "",
  client_name: "",
  country: "",
  email_id: "",
  f_name: "",
  gender: "",
  l_name: "",
  mobile_number: "",
  user_id: "",
  user_type: "",
};

const userProfileSlice = createSlice({
  name: 'userprofile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      return { ...state, ...action.payload }; 
    },
    clearUserProfile: () => initialState,
  },
});

export const { setUserProfile, clearUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
