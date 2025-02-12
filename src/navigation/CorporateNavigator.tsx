import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen1 from "../Screens/Pages/HomeScreen1";

const CorporateStack = createNativeStackNavigator()

const CorporateNavigator = () => {
    return(
        <CorporateStack.Navigator initialRouteName="CorporateHomeScreen">

            <CorporateStack.Screen name="CorporateHomeScreen" component={HomeScreen1} options={{ headerShown: false }}/>

        </CorporateStack.Navigator>
    )
}

export default CorporateNavigator;
