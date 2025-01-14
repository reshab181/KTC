import React from "react";
import Splash from "./src/Screens/Basic/Splash";
import ModuleSelectionUI from "./src/Screens/Auth/ModuleSelection";
import RegisterPOPUP from "./src/Screens/Auth/RegisterPopUp";
import Register from "./src/Screens/Auth/Register";
import SignInCorporate from "./src/Screens/Auth/SignIn";
import ForgotPassword from "./src/Screens/Auth/ForgotPassword";
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ForgotPasswordOTP from "./src/Screens/Auth/ForgotPasswordOTP";
import PersonalRegister from "./src/Screens/Auth/PersonalRegister";
import ResetPassword from "./src/Screens/Auth/ResetPassword";
import CorporateModule1 from "./src/Screens/Pages/CorporateModule1";
import Profile from "./src/Screens/Basic/Profile";
import PickUpLocation from "./src/Screens/Pages/PickUpLocation";
import HomeScreen1 from "./src/Screens/Pages/HomeScreen1";
import CarGroup from "./src/Screens/Pages/CarGroup";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CarSelection from "./src/Screens/Pages/CarSelection";
import BookingConfirmation from "./src/Screens/Pages/BookingConfirmation";
import PaymentMethod from "./src/Screens/Pages/PaymentMethod";




const stack=createNativeStackNavigator()
const App = ()=>{
  return ( 
    // <NavigationContainer>
    //     <stack.Navigator initialRouteName="Splash">
    //     <stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
    //     <stack.Screen name="ModuleSelectionUI" component={ModuleSelectionUI}options={{ headerShown: false }} />
    //     <stack.Screen name="RegisterPopUp" component={RegisterPOPUP} options={{ headerShown: false }} />
    //     <stack.Screen name="RegisterPage" component={Register} />
    //     <stack.Screen name="OTP" component={ForgotPasswordOTP} options={{ headerShown: false }} />

    //   </stack.Navigator>
    // </NavigationContainer>
    // <Register/>
    // <CorporateModule1/>
    // <CorporateModule1/>
    // <PickUpLocation/>
    <GestureHandlerRootView>
      {/* <CarGroup/> */}
      {/* <CorporateModule1/> */}
      {/* <PickUpLocation/> */}
      {/* <CarSelection/> */}
      {/* <Register/> */}
      {/* <BookingConfirmation/> */}
      {/* <ResetPassword/> */}
      <PaymentMethod/>
    </GestureHandlerRootView>
    
   );
}
 
export default App