import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CorporateRegisterNavigator from "./CorporateRegisterNavigator.tsx";
import CorporateNavigator from "./CorporateNavigator";
import KTCSplashScreen from "../Screens/splash/KTCSplashScreen";
import HomeScreen from "../Screens/home/HomeScreen.tsx";
import CorporateLoginNavigator from "./CorporateLoginNavigator.tsx";
import ResetPassword from "../Screens/Auth/ResetPassword.js";
import CorporateModule1 from "../Screens/Pages/CorporateModule1.js";

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
    return(
        <HomeStack.Navigator initialRouteName="Splash" >
            <HomeStack.Screen name="Splash" component={KTCSplashScreen} options={{ headerShown: false }}/>
            <HomeStack.Screen name="ModuleSelection" component={HomeScreen} options={{ headerShown: false }}/>
            <HomeStack.Screen name="CorporateRegisterNavigator" component={CorporateRegisterNavigator} options={{ headerShown: false }} />
            <HomeStack.Screen name="CorporateLoginNavigator" component={CorporateLoginNavigator}  options={{ headerShown: false }}/>
            <HomeStack.Screen name="CorporateNavigator" component={CorporateNavigator} options={{headerShown: false}}/>
        </HomeStack.Navigator>
    )
}

export default HomeNavigator;