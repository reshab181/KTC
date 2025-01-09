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




const stack=createNativeStackNavigator()
const App = ()=>{
  return ( 
    <NavigationContainer>
        <stack.Navigator initialRouteName="Splash">
        <stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <stack.Screen name="ModuleSelectionUI" component={ModuleSelectionUI} />
        <stack.Screen name="RegisterPopUp" component={RegisterPOPUP} />
        <stack.Screen name="RegisterPage" component={Register} />
      </stack.Navigator>
    </NavigationContainer>

    
   );
}
 
export default App