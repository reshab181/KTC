import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen1 from "../Screens/Pages/HomeScreen1";
import CorporateModule1 from "../Screens/Pages/CorporateModule1";
import Profile from "../Screens/Basic/Profile";
import Citieslist from "../Screens/Pages/Citieslist";
import PickUpLocation from "../Screens/Pages/PickUpLocation";
import ReviewBookingModal from "../component/ReviewBookingModal";
import Upcoming from "../Screens/My Bookings/Upcoming";
import Notification from "../Screens/Notification";

const CorporateStack = createNativeStackNavigator()

const CorporateNavigator = () => {
    return(
        <CorporateStack.Navigator initialRouteName="CorporateHomeScreen">
            <CorporateStack.Screen name="CorporateHomeScreen" component={CorporateModule1} options={{ headerShown: false }}/>
            <CorporateStack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            <CorporateStack.Screen name="City" component={Citieslist} options={{ headerShown: false }}/>
            <CorporateStack.Screen name="PickUpLocation" component={PickUpLocation} options={{ headerShown: false }}/>
            <CorporateStack.Screen name="Upcoming" component={Upcoming} options={{ headerShown: false }}/>
            <CorporateStack.Screen name="Notifications" component={Notification} options={{ headerShown: false }} />

        </CorporateStack.Navigator>
    )
}

export default CorporateNavigator;
