import React from "react";
import Splash from "./src/Screens/Basic/Splash";
import ModuleSelectionUI from "./src/Screens/Auth/ModuleSelection";
import RegisterPOPUP from "./src/Screens/Auth/RegisterPopUp";
import Register from "./src/Screens/Auth/Register";
import SignInCorporate from "./src/Screens/Auth/SignIn";
import ForgotPassword from "./src/Screens/Auth/ForgotPassword";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import OTPRegister from "./src/Screens/Auth/OtpRegister";
import BookingConfirmation from "./src/Screens/Pages/BookingConfirmation";
import PaymentMethod from "./src/Screens/Pages/PaymentMethod";
import MyBooking from "./src/Screens/Pages/MyBooking";



const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          {/* Splash Screen */}
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />

          {/* Module Selection Screen */}
          <Stack.Screen
            name="ModuleSelectionUI"
            component={ModuleSelectionUI}
            options={{ headerShown: false }}
          />


<<<<<<< HEAD
        <Stack.Screen
          name="SignInCorporate"
          component={SignInCorporate}  
          options={{ headerShown: false }}
        />
          <Stack.Screen 
        name="RegisterPOPUP" 
        component={RegisterPOPUP} 
        options={{
          presentation: 'modal',
          headerShown: false,
        }} 
      />
        <Stack.Screen name="RegisterPage" component={Register} options={{headerShown: false}} />
        <Stack.Screen name="OTPRegister" component={OTPRegister} options={{ headerShown: false }} />
        <Stack.Screen name="OTP" component={ForgotPasswordOTP} options={{ headerShown: false }} />
=======
          <Stack.Screen
            name="SignInCorporate"
            component={SignInCorporate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterPOPUP"
            component={RegisterPOPUP}
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />

        {/* Other Screens */}
          <Stack.Screen name="RegisterPage" component={Register} />
          <Stack.Screen name="OTPRegister" component={OTPRegister} options={{ headerShown: false }} />
          <Stack.Screen name="OTP" component={ForgotPasswordOTP} options={{ headerShown: false }} />
>>>>>>> 6d0d8cd9a832ff329eac666d16e650ef1b4f2d8e

          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="PersonalRegister" component={PersonalRegister} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="CorporateModule1" component={CorporateModule1} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="PickUpLocation" component={PickUpLocation} />
          <Stack.Screen name="HomeScreen1" component={HomeScreen1} />
          <Stack.Screen name="CarGroup" component={CarGroup} />
          <Stack.Screen name="CarSelection" component={CarSelection} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
<<<<<<< HEAD
    // // <OTPRegister/>
    // <GestureHandlerRootView>
    //   {/* <PaymentMethod/> */}
    //   {/* <MyBooking/> */}
    //   {/* <Profile/> */}
    //   {/* <PersonalRegister/> */}
    //   {/* <SignInCorporate/> */}
    // {/* </GestureHandlerRootView> */}
=======
    // <Register/>

>>>>>>> 6d0d8cd9a832ff329eac666d16e650ef1b4f2d8e

  );
};

export default App;
