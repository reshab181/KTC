
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  city : '',
  rentalType : '',
  carGroup :  '', 
  pickupAddress : '' , 
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
      }else if(type === 'carGroup'){
        state.carGroup = selectedItem; 
      }else if(type === 'pickupAddress'){
        state.pickupAddress = selectedItem ; 
      }
    },
  },

});


export const { updateCorporateSlice } = CorporateSlice.actions;
export default CorporateSlice.reducer;
