import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInCorporate from "../Screens/Auth/SignIn";
import ForgotPassword from "../Screens/Auth/ForgotPassword";
import ForgotPasswordOTP from "../Screens/Auth/ForgotPasswordOTP";
import CorporateNavigator from "./CorporateNavigator";
import ResetPassword from "../Screens/Auth/ResetPassword";
import CorporateModule1 from "../Screens/Pages/CorporateModule1";


const CorporateLoginStack = createNativeStackNavigator();
const CorporateLoginNavigator = () => {
    return(
        <CorporateLoginStack.Navigator initialRouteName="CorporateSignIn">
            <CorporateLoginStack.Screen name="CorporateSignIn" component={SignInCorporate} options={{ headerShown: false }} />
            <CorporateLoginStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
            <CorporateLoginStack.Screen name="ForgotPasswordOTP" component={ForgotPasswordOTP} options={{ headerShown: false }} />
            <CorporateLoginStack.Screen name="CorporateModule" component={CorporateNavigator} />
            <CorporateLoginStack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
        </CorporateLoginStack.Navigator>
    )
}
export default CorporateLoginNavigator;