
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  city : '',
  rentalType : '',
  carGroup :  ''
};


const CorporateSlice = createSlice({
  name: 'carReservation',
  initialState,
  reducers: {
    updateCorporateSlice: (state, action) => {
      const {type, selectedItem}=action.payload
      if(type==="city"){
        state.city=selectedItem;
      }else if(type==="rentalType"){
        state.rentalType=selectedItem;
      }else{
        state.carGroup = selectedItem; 
      }
    },
  },

});


export const { updateCorporateSlice } = CorporateSlice.actions;
export default CorporateSlice.reducer;
