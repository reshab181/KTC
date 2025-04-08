import React, { useEffect,useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from "./src/Redux/store";

import CorporateModule1 from "./src/Screens/Pages/CorporateModule1";
import Profile from "./src/Screens/Basic/Profile";
import PickUpLocation from "./src/Screens/Pages/PickUpLocation";
import HomeScreen1 from "./src/Screens/Pages/HomeScreen1";
import CarGroup from "./src/Screens/Pages/CarGroup";
import CarSelection from "./src/Screens/Pages/CarSelection";
import BookingConfirmation from "./src/Screens/Pages/BookingConfirmation";
import PaymentMethod from "./src/Screens/Pages/PaymentMethod";
import MyBooking from "./src/Screens/Pages/MyBooking";
import Upcoming from "./src/Screens/My Bookings/Upcoming";
import Track from "./src/Screens/My Bookings/Track";
import Notification from "./src/Screens/Notification";
import SplashScreen from "@exodus/react-native-splash-screen";
import Citieslist from "./src/Screens/Pages/Citieslist";
import HomeNavigator from "./src/navigation/HomeNavigator";
import MapplsGL from 'mappls-map-react-native';
import ReviewBookingModal from "./src/component/ReviewBookingModal";
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';


const AppStack = createNativeStackNavigator();


// const MainAppNavigator = () => (
//   <AppStack.Navigator initialRouteName="HomeScreen1">
//     <AppStack.Screen name="CorporateModule1" component={CorporateModule1} options={{ headerShown: false }} />
//     <AppStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
//     <AppStack.Screen name="City" component={Citieslist} options={{ headerShown: false }} />
//     <AppStack.Screen name="PickUpLocation" component={PickUpLocation} options={{ headerShown: false }} />
//     <AppStack.Screen name="HomeScreen1" component={HomeScreen1} options={{ headerShown: false }} />
//     <AppStack.Screen name="CarGroup" component={CarGroup} options={{ headerShown: false }} />
//     <AppStack.Screen name="CarSelection" component={CarSelection} options={{ headerShown: false }} />
//     <AppStack.Screen name="BookingConfirmation" component={BookingConfirmation} options={{ headerShown: false }} />
//     <AppStack.Screen name="Payment" component={PaymentMethod} options={{ headerShown: false }} />
//     <AppStack.Screen name="MyBooking" component={MyBooking} options={{ headerShown: false }} />
//     <AppStack.Screen name="Track" component={Track} options={{ headerShown: false }} />
//     <AppStack.Screen name="Upcoming" component={Upcoming} options={{ headerShown: false }} />
//     <AppStack.Screen name="Notifications" component={Notification} options={{ headerShown: false }} />
//     <AppStack.Screen name="BookingReview" component={ReviewBookingModal} options={{ headerShown: false }} />

//   </AppStack.Navigator>
// );

const App = () => {
  const theme = useColorScheme() === 'dark' ? MD3DarkTheme : MD3LightTheme;

  MapplsGL.setMapSDKKey( 'a3b6ecfc98829a83dd2d90f31acbfa8e');
  MapplsGL.setRestAPIKey('886b8e770b7b5314cd9ed9e669676599');
  MapplsGL.setAtlasClientId('33OkryzDZsIk6jfukki-FfOGzG6jGTz_X-NBQnWydvjbP03ss7EjTOcBXKwiRpM5GJlnuBJESQ37rGeGouOH0Q==');
  MapplsGL.setAtlasClientSecret( 'lrFxI-iSEg9eBbkGuWL0S-z4QTwM_t31-Fla-GsyLUNUdLw-VluK9Uq3GDgMsq6L0sh4tcAPNKN-FkKeuC7tKljvi7cElTNw'); 

  useEffect(() => {
    SplashScreen.hide()
  }, []);
  // useEffect(() => {
  //   const subscription = Appearance.addChangeListener(({ colorScheme }) => {
  //     setTheme(colorScheme);
  //   });

  //   return () => subscription.remove();
  // }, []);

  return (
    <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <HomeNavigator />
          {/* <Stack.Navigator initialRouteName="Splash">

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
          </Stack.Navigator> */}
        </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
    </PaperProvider>
     
 
   
  );
};

export default App;
