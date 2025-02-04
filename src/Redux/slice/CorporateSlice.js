// Ashutosh Rai
import { createSlice } from '@reduxjs/toolkit';
import PaymentMethod from '../../Screens/Pages/PaymentMethod';



const initialState = {
  city : '',
  rentalType : '',
  carGroup :  '', 
  pickupAddress : {} , 
  reportingLandmark: '', 
  selectedDate : '' , 
  selectedTime: "" , 
  paymentMethod : "" ,
  specialInstruction: "", 
  flightTrainInfo : "", 
  paymentMode: "", 
  empId: '', 
  referenceNumber :"" , 
  bookingCode: "", 
  trNumber: '', 
  billNumber: ''

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
      }else if(type === "carGroup"){
        state.carGroup = selectedItem; 
      }else if(type === "pickupAddress"){
        state.pickupAddress = selectedItem ; 
      }else if(type === "selectedDate"){
        state.selectedDate = selectedItem ; 
      }else if(type === "selectedTime"){
        state.selectedTime = selectedItem ; 
      }else if(type === "reportingLandmark"){
        state.reportingLandmark = selectedItem ; 
      }else if(type === "specialInstruction"){
        state.specialInstruction = selectedItem ; 
      }else if(type === "flightTrainInfo"){
        state.flightTrainInfo = selectedItem ; 
      }else if(type === "paymentMode"){
        state.paymentMode = selectedItem ; 
      }
    },
  },

});


export const { updateCorporateSlice } = CorporateSlice.actions;
export default CorporateSlice.reducer;
