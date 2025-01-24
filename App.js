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
import BookingConfirmation from "./src/Screens/Pages/BookingConfirmation";
import PaymentMethod from "./src/Screens/Pages/PaymentMethod";
import MyBooking from "./src/Screens/Pages/MyBooking";
import Upcoming from "./src/Screens/My Bookings/Upcoming";
import Feedback from "./src/Screens/Feedback";
import Help from "./src/Screens/Help";
import Track from "./src/Screens/My Bookings/Track";
import Notification from "./src/Screens/Notification";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();


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
    <AuthStack.Screen name="RegisterPage" component={Register} options={{ headerShown: false }} />
    <AuthStack.Screen name="OTPRegister" component={OTPRegister} options={{ headerShown: false }} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
    <AuthStack.Screen name="OTP" component={ForgotPasswordOTP} options={{ headerShown: false }} />
    <AuthStack.Screen name="PersonalRegister" component={PersonalRegister} options={{ headerShown: false }} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword}options={{ headerShown: false }}  />
  </AuthStack.Navigator>
);
const MainAppNavigator = () => (
  <AppStack.Navigator initialRouteName="HomeScreen1">
    <AppStack.Screen name="CorporateModule1" component={CorporateModule1} options={{ headerShown: false }} />
    <AppStack.Screen name="Profile" component={Profile}options={{ headerShown: false }}  />
    <AppStack.Screen name="PickUpLocation" component={PickUpLocation} options={{ headerShown: false }} />
    <AppStack.Screen name="HomeScreen1" component={HomeScreen1} options={{ headerShown: false }} />
    <AppStack.Screen name="CarGroup" component={CarGroup} options={{ headerShown: false }} />
    <AppStack.Screen name="CarSelection" component={CarSelection} options={{ headerShown: false }} />
    <AppStack.Screen name ="BookingConfirmation" component={BookingConfirmation}options={{ headerShown: false }} />
    <AppStack.Screen name="Payment" component={PaymentMethod}options={{ headerShown: false }} />
    <AppStack.Screen name="MyBooking" component={MyBooking}options={{ headerShown: false }} />
    <AppStack.Screen name="Track" component={Track}options={{ headerShown: false }} />
    <AppStack.Screen name="Upcoming" component={Upcoming}options={{ headerShown: false }} />
    <AppStack.Screen name="Notifications" component={Notification}options={{ headerShown: false }} />

  </AppStack.Navigator>
);

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
    // <Register/>
    // // <Upcoming/>
    // // <Feedback/>
    // // <Help/>
    // <ForgotPasswordOTP/>
    // <ResetPassword/>
    // <Notification/>
  );
};

export default App;