import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInCorporate from "../Screens/Auth/SignIn";
import RegisterPOPUP from "../Screens/Auth/RegisterPopUp";
import Register from "../Screens/Auth/Register";
import OtpRegister from "../Screens/Auth/OtpRegister";
import ForgotPassword from "../Screens/Auth/ForgotPassword";
import ForgotPasswordOTP from "../Screens/Auth/ForgotPasswordOTP";
import PersonalRegister from "../Screens/Auth/PersonalRegister";
import ResetPassword from "../Screens/Auth/ResetPassword";

const CorporateRegisterStack = createNativeStackNavigator()

const CorporateRegisterNavigator = () => {
    return(
        <CorporateRegisterStack.Navigator initialRouteName="OTPRegister">
            <CorporateRegisterStack.Screen name="RegisterPage" component={Register} options={{ headerShown: false }} />
            <CorporateRegisterStack.Screen name="OTPRegister" component={OtpRegister} options={{ headerShown: false }} />
            <CorporateRegisterStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
            <CorporateRegisterStack.Screen name="PersonalRegister" component={PersonalRegister} options={{ headerShown: false }} />
        </CorporateRegisterStack.Navigator>
    )
}

export default CorporateRegisterNavigator;