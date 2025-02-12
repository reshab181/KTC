import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInCorporate from "../Screens/Auth/SignIn";
import ForgotPassword from "../Screens/Auth/ForgotPassword";
import ForgotPasswordOTP from "../Screens/Auth/ForgotPasswordOTP";
import CorporateNavigator from "./CorporateNavigator";


const CorporateLoginStack = createNativeStackNavigator();
const CorporateLoginNavigator = () => {
    return(
        <CorporateLoginStack.Navigator initialRouteName="CorporateSignIn">
            <CorporateLoginStack.Screen name="CorporateSignIn" component={SignInCorporate} options={{ headerShown: false }} />
            <CorporateLoginStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
            <CorporateLoginStack.Screen name="OTP" component={ForgotPasswordOTP} options={{ headerShown: false }} />
            <CorporateLoginStack.Screen name="CorporateModule" component={CorporateNavigator} />
        </CorporateLoginStack.Navigator>
    )
}
export default CorporateLoginNavigator;