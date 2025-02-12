import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./src/Redux/store";

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
import SplashScreen from "@exodus/react-native-splash-screen";
import Citieslist from "./src/Screens/Pages/Citieslist";
import MapplsGL from 'mappls-map-react-native';
import ReviewBookingModal from "./src/component/ReviewBookingModal";


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
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);

const MainAppNavigator = () => (
  <AppStack.Navigator initialRouteName="HomeScreen1">
    <AppStack.Screen name="CorporateModule1" component={CorporateModule1} options={{ headerShown: false }} />
    <AppStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    <AppStack.Screen name="City" component={Citieslist} options={{ headerShown: false }} />
    <AppStack.Screen name="PickUpLocation" component={PickUpLocation} options={{ headerShown: false }} />
    <AppStack.Screen name="HomeScreen1" component={HomeScreen1} options={{ headerShown: false }} />
    <AppStack.Screen name="CarGroup" component={CarGroup} options={{ headerShown: false }} />
    <AppStack.Screen name="CarSelection" component={CarSelection} options={{ headerShown: false }} />
    <AppStack.Screen name="BookingConfirmation" component={BookingConfirmation} options={{ headerShown: false }} />
    <AppStack.Screen name="Payment" component={PaymentMethod} options={{ headerShown: false }} />
    <AppStack.Screen name="MyBooking" component={MyBooking} options={{ headerShown: false }} />
    <AppStack.Screen name="Track" component={Track} options={{ headerShown: false }} />
    <AppStack.Screen name="Upcoming" component={Upcoming} options={{ headerShown: false }} />
    <AppStack.Screen name="Notifications" component={Notification} options={{ headerShown: false }} />
    <AppStack.Screen name="BookingReview" component={ReviewBookingModal} options={{ headerShown: false }} />

  </AppStack.Navigator>
);

const App = () => {
  MapplsGL.setMapSDKKey( 'a3b6ecfc98829a83dd2d90f31acbfa8e');
  MapplsGL.setRestAPIKey('886b8e770b7b5314cd9ed9e669676599');
  MapplsGL.setAtlasClientId('33OkryzDZsIk6jfukki-FfOGzG6jGTz_X-NBQnWydvjbP03ss7EjTOcBXKwiRpM5GJlnuBJESQ37rGeGouOH0Q==');
  MapplsGL.setAtlasClientSecret( 'lrFxI-iSEg9eBbkGuWL0S-z4QTwM_t31-Fla-GsyLUNUdLw-VluK9Uq3GDgMsq6L0sh4tcAPNKN-FkKeuC7tKljvi7cElTNw'); 
  
  useEffect(() => {
    SplashScreen.hide()
  }, []);

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">

            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />


            <Stack.Screen
              name="Auth"
              component={AuthNavigator}
              options={{ headerShown: false }}
            />


            <Stack.Screen
              name="MainApp"
              component={MainAppNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
