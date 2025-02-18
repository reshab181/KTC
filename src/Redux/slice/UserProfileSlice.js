// Ashutosh Rai
import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';


const initialState = {
  email_id: '',
  user_id: '',
  client_name : '', 
  f_name : '', 
  l_name: '', 
  gender: '', 
  mobile_number: '',
  user_type : '',
  alternative_no: '',
  bithdate : '', 
  client_id : '', 
  country : '', 

};


const userProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.email_id = action.payload.email_id;
      state.user_id = action.payload.user_id;
      state.client_name = action.payload.client_name ; 
      state.f_name = action.payload.f_name; 
      state.l_name = action.payload.l_name ; 
      state.gender = action.payload.gender ;
      state.country = action.payload.country ; 
      state.user_type = action.payload.user_type;
      state.client_id = action.payload.client_id; 
      state.alternative_no = action.payload.alternative_no; 
      state.bithdate = action.payload.bithdate;
      state.mobile_number = action.payload.mobile_number; 
      console.log('====================================');
      console.log("ACTIONS", action);
      console.log('====================================');
    },
  },

});


export const { setUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
