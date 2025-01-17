import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Splash from "./src/Screens/Basic/Splash";
import ModuleSelectionUI from "./src/Screens/Auth/ModuleSelection";
import RegisterPOPUP from "./src/Screens/Auth/RegisterPopUp";
import Register from "./src/Screens/Auth/Register";
import SignInCorporate from "./src/Screens/Auth/SignIn";
import ForgotPassword from "./src/Screens/Auth/ForgotPassword";
import ForgotPasswordOTP from "./src/Screens/Auth/ForgotPasswordOTP";
import PersonalRegister from "./src/Screens/Auth/PersonalRegister";
import ResetPassword from "./src/Screens/Auth/ResetPassword";
import CorporateModule1 from "./src/Screens/Pages/CorporateModule1";
import Profile from "./src/Screens/Basic/Profile";
import PickUpLocation from "./src/Screens/Pages/PickUpLocation";
import HomeScreen1 from "./src/Screens/Pages/HomeScreen1";
import CarGroup from "./src/Screens/Pages/CarGroup";
import CarSelection from "./src/Screens/Pages/CarSelection";
import OTPRegister from "./src/Screens/Auth/OtpRegister";
<<<<<<< HEAD
import Track from "./src/Screens/My Bookings/Track";
import Upcoming from "./src/Screens/My Bookings/Upcoming";
import BookingConfirmation from "./src/Screens/Pages/BookingConfirmation";
import PaymentMethod from "./src/Screens/Pages/PaymentMethod";
import MyBooking from "./src/Screens/Pages/MyBooking";


=======
>>>>>>> 84f4bff95ba6dde03e2a27bbc86137ea607c6e87

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

// Nested Auth Stack
const AuthNavigator = () => (
    <AuthStack.Navigator initialRouteName="ModuleSelectionUI">
    <AuthStack.Screen
      name="ModuleSelectionUI"
      component={ModuleSelectionUI}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SignInCorporate"
      component={SignInCorporate}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="RegisterPOPUP"
      component={RegisterPOPUP}
      options={{ presentation: "modal", headerShown: false }}
    />
    <AuthStack.Screen name="RegisterPage" component={Register} />
    <AuthStack.Screen name="OTPRegister" component={OTPRegister} options={{ headerShown: false }} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
    <AuthStack.Screen name="OTP" component={ForgotPasswordOTP} options={{ headerShown: false }} />
    <AuthStack.Screen name="PersonalRegister" component={PersonalRegister} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
  </AuthStack.Navigator>
);

// Nested App Stack
const MainAppNavigator = () => (
  <AppStack.Navigator initialRouteName="HomeScreen1">
    <AppStack.Screen name="CorporateModule1" component={CorporateModule1} options={{ headerShown: false }} />
    <AppStack.Screen name="Profile" component={Profile} />
    <AppStack.Screen name="PickUpLocation" component={PickUpLocation} />
    <AppStack.Screen name="HomeScreen1" component={HomeScreen1} />
    <AppStack.Screen name="CarGroup" component={CarGroup} />
    <AppStack.Screen name="CarSelection" component={CarSelection} />
  </AppStack.Navigator>
);

const App = () => {
  return (
<<<<<<< HEAD
    // <GestureHandlerRootView>
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName="Splash">
    //       <Stack.Screen
    //         name="Splash"
    //         component={Splash}
    //         options={{ headerShown: false }}
    //       />

    //       <Stack.Screen
    //         name="ModuleSelectionUI"
    //         component={ModuleSelectionUI}
    //         options={{ headerShown: false }}
    //       />


    //     <Stack.Screen
    //       name="SignInCorporate"
    //       component={SignInCorporate}  
    //       options={{ headerShown: false }}
    //     />
    //       <Stack.Screen 
    //     name="RegisterPOPUP" 
    //     component={RegisterPOPUP} 
    //     options={{
    //       presentation: 'modal',
    //       headerShown: false,
    //     }} 
    //   />
    //     <Stack.Screen name="RegisterPage" component={Register} options={{headerShown: false}} />
    //     <Stack.Screen name="OTPRegister" component={OTPRegister} options={{ headerShown: false }} />
    //     <Stack.Screen name="ForgotpasswordOTP" component={ForgotPasswordOTP} options={{ headerShown: false }} />

    //       <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
    //       <Stack.Screen name="PersonalRegister" component={PersonalRegister} options={{headerShown: false}}/>
    //       <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}}/>
    //       <Stack.Screen name="CorporateModule1" component={CorporateModule1} options={{ headerShown: false }} />
    //       <Stack.Screen name="Profile" component={Profile} />
    //       <Stack.Screen name="PickUpLocation" component={PickUpLocation} options={{headerShown: false}}/>
    //       <Stack.Screen name="HomeScreen1" component={HomeScreen1} options={{headerShown: false}} />
    //       <Stack.Screen name="CarGroup" component={CarGroup} options={{headerShown: false}}/>
    //       <Stack.Screen name="CarSelection" component={CarSelection} options={{headerShown:false}} />
    //       <Stack.Screen name="BookingConfirmation" component={BookingConfirmation} options={{headerShown:false}} />
    //       <Stack.Screen name="Payment" component={PaymentMethod} options={{headerShown:false}} />
    //       <Stack.Screen name="MyBooking" component={MyBooking} options={{headerShown:false}} />

    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </GestureHandlerRootView>
    // <OTPRegister/>
    <GestureHandlerRootView>
      {/* <HomeScreen1 /> */}
      {/* <Track/> */}
      <Upcoming/>
    </GestureHandlerRootView>

=======
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          {/* Splash Screen */}
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />

          {/* Auth Stack */}
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />

          {/* Main App Stack */}
          <Stack.Screen
            name="MainApp"
            component={MainAppNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
>>>>>>> 84f4bff95ba6dde03e2a27bbc86137ea607c6e87
  );
};

export default App;
