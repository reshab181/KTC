// Author: Ashutosh Rai
// Component: CorporateModule1

// import React, { useEffect, useState, useCallback } from 'react';
// import Notifications from '../../assets/info1.png';
// import { ScrollView, StyleSheet, Text, View ,Image} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import CustomHeader from '../../component/CustomHeader';
// import CustomDropdown from '../../component/CustomDropdown';
// import CustomTextInpt from '../../component/CustomTextInpt';
// import CustomCalender from '../../component/CustomCalender';
// import CustomButton from '../../component/CustomButtons';
// import CustomCarGrouptile from '../../component/CustomCarGrouptile';
// import SidebarMenu from '../../component/SidebarMenu';
// import { fetchCities, fetchLocalities, fetchRentalType } from '../../Api/CorporateModuleApis';
// import { fetchJwtAccess } from '../../Utils/JwtHelper';
// import { Alert } from 'react-native';
// import Menuu from '../../assets/svg/menu.svg';
// import Icon from 'react-native-vector-icons/Ionicons';
// // import Notifications from '../../assets/svg/notifications.svg';
// import ReviewBookingModal from '../../component/ReviewBookingModal';
// import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice';
// import LoaderModal from '../../component/LoaderModal';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import NotificationService from '../../services/api/Notification';
// const CorporateModule1 = ({ navigation,item,index }) => {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [accessToken, setAccessToken] = useState('');
//   const [cityList, setCityList] = useState([]);
//   const [Visible, setVisible] = useState(false)
//   const [carGroupList, setCarGroupList] = useState([]);
//   const [e_loc, seteloc] = useState('');
//   const { city_of_usage, assignment, vehiclerequested, Reportingplace, start_date, Reporingtime } = useSelector((state) => state.corporate);
//   const userDetails = useSelector((state) => state.userprofile);
//   console.log(" Redux User Data:", userDetails);


//   const dispatch = useDispatch();
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [specialInstruction, setspecialInstruction] = useState('');
//   const [reportingLandmark, setreportingLandmark] = useState('');
//   const [flightTrainInfo, setflightTrainInfo] = useState('');
//   const [EmpId, setEmpId] = useState('');
//   const [referenceNumber, setreferenceNumber] = useState('');
//   const [BookingCode, setBookingCode] = useState('');
//   const [trNumber, settrNumber] = useState('')
//   const [BillNumber, setBillNumber] = useState('')
//   const [loading, setLoading] = useState(false);
//   const [loadingCities, setLoadingCities] = useState(false);
//   const [loadingRentalType, setLoadingRentalType] = useState(false);
//   const [loadingCarGroup, setloadingCarGroup] = useState(false)
//   const [isTimeSelected, setIsTimeSelected] = useState(false);
  
//   useEffect(() => {
//     const getAccessToken = async () => {
//       const token = await fetchJwtAccess();
//       if (token) setAccessToken(token);



//     };
//     getAccessToken();
//     getUserData();
//     fetchUnreadCount()
//   }, []);
//   const getNotificationIcon = (type) => {
//     return require('../../assets/info1.png');
//   };
//   const getUserData = async () => {
//     try {
//       const keys = [
//         "status", "isLoggedInn", "user_id", "email_id",
//         "f_name", "l_name", "client_name", "client_id",
//         "gender", "mobile_number", "user_type",
//         "bithdate", "country", "userToken"
//       ];

//       const values = await AsyncStorage.multiGet(keys);
//       const userData = Object.fromEntries(values);

//       console.log("📌 Retrieved User Data:", userData);

//       if (userData.user_id) {
//         dispatch(updateCorporateSlice(userData));
//       } else {
//         console.warn("⚠️ No user data found in AsyncStorage.");
//       }
//     } catch (error) {
//       console.error("❌ Error retrieving user data:", error);
//     }
//   };
//   // const updateChanges = (key, txt) => {
//   //   setvaluesTextInputs({ ...valuesTextInputs, [key]: txt })
//   // }



//   const fetchUnreadCount = async () => {
//     try {
//       await NotificationService.fetchNotifications(
//         {},
//         1,
//         10,
//         () => { },
//         (count) => {
//           console.log("Unread Count Fetched:", count); 
//           setUnreadCount(count);
//         },
//         () => { }
//       );
//     } catch (error) {
//       console.error('Error fetching unread count:', error);
//     }
//   };
//   const handleFetchCities = useCallback(async () => {
//     setLoadingCities(true);
//     try {
//       const client_id = await AsyncStorage.getItem('client_id')
//       const list = await fetchCities('', client_id, accessToken, setCityList);
//       setLoadingCities(false)
//       navigation.navigate('City', { list, type: 'city_of_usage' });
//       // setLoading(false)
//     } catch (error) {
//       console.error("Error fetching cities:", error);

//     }
//     setLoadingCities(false)


//   }, [userDetails, accessToken]);

//   const handleFetchRentalType = useCallback(async () => {
//     setLoadingRentalType(true);
//     try {
//       const client_id = await AsyncStorage.getItem('client_id')
//       const { rentalItems, carGroupItems, e_loc } = await fetchRentalType(city_of_usage, client_id, accessToken);
//       setCarGroupList(carGroupItems);
//       seteloc(e_loc);
//       setLoadingRentalType(false);

//       navigation.navigate('City', { list: rentalItems, type: 'assignment' });
//     } catch (error) {
//       console.error("Error fetching rental types:", error);
//     }
//   }, [city_of_usage, userDetails, accessToken]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const areFieldsFilled = () => {
//     return (
//       city_of_usage &&
//       assignment &&
//       vehiclerequested &&
//       Reportingplace

//     );
//   };
//   const openModal = () => {
//     if (areFieldsFilled()) {
//       setModalVisible(true);
//     } else {
//       Alert.alert("Incomplete Fields", "Please fill all required fields before proceeding.");
//     }
//   };
//   const handleRightIcon = () => {
//     setUnreadCount(0); 
//     navigation.navigate("Notifications");
//   }

//   const closeModal = () => {
//     setModalVisible(false);
//   };
//   return (
//     <View style={styles.mainContainer}>
//       <CustomHeader
//   title="Home"
//   justifyContent="space-between"
//   iconHeight={30}
//   iconWidth={36}
//   islogo
//   leftIcon={Menuu}
//   rightIcon={() => (
//     <View style={{ position: "relative",color:"#fff" }}>
//        <Icon name="notifications" size={24} color="#fff" style={{ marginRight: 10 }}  />
//       {unreadCount > 0 && (
//         <View
//           style={{
//             position: "absolute",
//             top: -5,
//             right: -5,
//             backgroundColor: "red",
//             borderRadius: 10,
//             paddingHorizontal: 6,
//             paddingVertical: 2,
//           }}
//         >
//           <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
//             {unreadCount}
//           </Text>
//         </View>
//       )}
//     </View>
//   )}
//   handleLeftIcon={() => setIsSidebarVisible(true)}
 
//   handleRightIcon={handleRightIcon} 
//   isSidebarVisible={isSidebarVisible}
// />

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {
//           <ReviewBookingModal visible={modalVisible}
//             onClose={closeModal} eloc={e_loc} />
//         }
//         <View style={styles.root}>
//           <Section title="Car Reservation Details">
//             <View style={[styles.container2]}>
//               <View style={{ marginHorizontal: 10, marginTop: 5 }}>
//                 {renderCustomTile(city_of_usage || 'City', handleFetchCities, loadingCities)}

//                 {renderCustomTile(
//                   assignment || 'Rental Type',
//                   () => {
//                     if (!city_of_usage) {
//                       Alert.alert("Selection Required", "Please select a city first.");
//                       return;
//                     }
//                     handleFetchRentalType();
//                   },
//                   loadingRentalType
//                 )}

//                 {renderCustomTile(
//                   vehiclerequested || 'Car Group',
//                   () => {
//                     if (!assignment) {
//                       Alert.alert("Selection Required", "Please select a Rental Type.");
//                       return;
//                     }
//                     setloadingCarGroup(true)
//                     navigation.navigate('City', { list: carGroupList, type: 'vehiclerequested' });
//                     setloadingCarGroup(false)
//                   },
//                   loadingCarGroup
//                 )}

//               </View>
//             </View>
//           </Section>

//           <Section title="Car Reporting Details">
//             <View style={{ backgroundColor: '#FFFFFF' }}>
//               <CustomCalender />
//             </View>
//             <View style={[styles.container2]}>
//               <View style={{ marginHorizontal: 10 }}>
//                 {renderCustomTile(
//                   (Reportingplace.placeAddress?.length > 25
//                     ? Reportingplace.placeAddress.substring(0, 40) + "..."
//                     : Reportingplace?.placeAddress) || 'Pickup Address',
//                   () => {
//                     if (!city_of_usage) {
//                       Alert.alert("Selection Required", "Please select a city first.");
//                       return;
//                     }
//                     navigation.navigate('PickUpLocation', { eloc: e_loc, type: 'Reportingplace' });
//                   },
//                   loading
//                 )}

//                 <CustomTextInpt
//                   placeholder="Reporting Landmark (Optional)"
//                   value={reportingLandmark}
//                   onChangeText={(txt) => {
//                     setreportingLandmark(txt);
//                     dispatch(updateCorporateSlice({
//                       type: "reportingLandmark",
//                       selectedItem: txt
//                     }));
//                   }}
//                 />
//               </View>
//             </View>
//           </Section>

//           <Section title="Other Information">
//             <View style={[styles.container2, {}]}>
//               <View style={{ marginHorizontal: 10 }}>
//                 <CustomTextInpt placeholder="Flight/Train info"
//                   value={flightTrainInfo}
//                   onChangeText={(txt) => {
//                     setflightTrainInfo(txt)
//                     dispatch(updateCorporateSlice({
//                       type: "Guestflight",
//                       selectedItem: txt
//                     }))
//                   }}
//                 />
//                 <CustomTextInpt placeholder="Special Instruction (Optional)"
//                   value={specialInstruction}
//                   onChangeText={(txt) => {
//                     setspecialInstruction(txt)
//                     dispatch(
//                       updateCorporateSlice({
//                         type: "instruction",
//                         selectedItem: txt,
//                       })
//                     )
//                   }
//                   }
//                 />
//                 {/* <CustomDropdown
//                   data={cityList}
//                   placeholder="Payment Mode"
//                   searchPlaceholder="Search Payment Mode..."
//                   onChange={(item) => console.log('Selected Payment Mode:', item)}
//                 /> */}
//                 {/* {renderCustomTile
//                   ('Payment Method',
//                     () => {
//                       if (!city) {
//                         Alert.alert("Selection Required", "Please select a Above options.");
//                         return; // Prevent navigation
//                       }
//                       navigation.navigate('Payment', { eloc: e_loc, type: 'paymentMethod' });
//                     }
//                   )} */}
//               </View>
//             </View>
//           </Section>
//           <Section title="Additional Information">
//             <View style={[styles.container2, {}]}>
//               <View style={{ marginHorizontal: 10 }}>
//                 <CustomTextInpt
//                   placeholder="Emp ID"
//                   value={EmpId}
//                   onChangeText={(txt) => {
//                     setEmpId(txt);
//                     dispatch(
//                       updateCorporateSlice({
//                         type: "custom_column",
//                         selectedItem: { EmpId: txt },
//                       })
//                     );
//                   }}
//                 />

//                 <CustomTextInpt
//                   placeholder="Reference Number"
//                   value={referenceNumber}
//                   onChangeText={(txt) => {
//                     setreferenceNumber(txt);
//                     dispatch(
//                       updateCorporateSlice({
//                         type: "custom_column",
//                         selectedItem: { referenceNumber: txt }, 
//                       })
//                     );
//                   }}
//                 />

//                 <CustomTextInpt
//                   placeholder="Booking Code"
//                   value={BookingCode}
//                   onChangeText={(txt) => {
//                     setBookingCode(txt);
//                     dispatch(
//                       updateCorporateSlice({
//                         type: "custom_column",
//                         selectedItem: { bookingCode: txt }, 
//                       })
//                     );
//                   }}
//                 />

//                 <CustomTextInpt
//                   placeholder="TR No"
//                   value={trNumber}
//                   onChangeText={(txt) => {
//                     settrNumber(txt);
//                     dispatch(
//                       updateCorporateSlice({
//                         type: "custom_column",
//                         selectedItem: { trNumber: txt }, 
//                       })
//                     );
//                   }}
//                 />

//                 <CustomTextInpt
//                   placeholder="Bill No"
//                   value={BillNumber}
//                   onChangeText={(txt) => {
//                     setBillNumber(txt);
//                     dispatch(
//                       updateCorporateSlice({
//                         type: "custom_column",
//                         selectedItem: { billNumber: txt }, 
//                       })
//                     );
//                   }}
//                 />
//               </View>
//             </View>
//           </Section>


//           <CustomButton title="Next" borderRadius={0} onPress={openModal}
//           />
//         </View>
//       </ScrollView>

//       <SidebarMenu isVisible={isSidebarVisible} onClose={() => setIsSidebarVisible(false)} />
//     </View>
//   );
// };

// const Section = ({ title, children }) => (
//   <View style={styles.container}>
//     <View style={styles.container1}>
//       <Text style={styles.txt}>{title}</Text>
//     </View>
//     {children}
//   </View>
// );

// const renderCustomTile = (title, onPress, loading) => (
//   <CustomCarGrouptile title={title} onPress={onPress} iconName="chevron-right" loader={loading} />
// );

// export default CorporateModule1;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#F1F1F3',
//   },
//   scrollContainer: {
//     paddingTop: 20,
//   },
//   root: {
//     flex: 1,
//     backgroundColor: '#F1F1F3',
//   },
//   container: {
//     margin: 16,
//     backgroundColor: '#F1F1F3',
//     elevation: 5,
//   },
//   container1: {
//     height: 32,
//     backgroundColor: '#374852',
//     borderTopLeftRadius: 4,
//     borderTopRightRadius: 4,
//     justifyContent: 'center',
//     paddingStart: 10,
//   },
//   container2: {
//     backgroundColor: '#FFFFFF',
//     paddingBottom: 10
//   },
//   txt: {
//     color: '#FFF',
//     fontSize: 14,
//     fontWeight: '600'
//   },
// });

import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeader from '../../component/CustomHeader';
import CustomDropdown from '../../component/CustomDropdown';
import CustomTextInpt from '../../component/CustomTextInpt';
import CustomCalender from '../../component/CustomCalender';
import CustomButton from '../../component/CustomButtons';
import CustomCarGrouptile from '../../component/CustomCarGrouptile';
import SidebarMenu from '../../component/SidebarMenu';
import { fetchCities, fetchLocalities, fetchRentalType } from '../../Api/CorporateModuleApis';
import { fetchJwtAccess } from '../../Utils/JwtHelper';
import { Alert } from 'react-native';
import Menuu from '../../assets/svg/menu.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import ReviewBookingModal from '../../component/ReviewBookingModal';
import { updateCorporateSlice, resetCorporateSlice } from '../../Redux/slice/CorporateSlice'; // Add import for resetCorporateSlice
import LoaderModal from '../../component/LoaderModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationService from '../../services/api/Notification';

const CorporateModule1 = ({ navigation, item, index }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [cityList, setCityList] = useState([]);
  const [Visible, setVisible] = useState(false);
  const [carGroupList, setCarGroupList] = useState([]);
  const [e_loc, seteloc] = useState('');
  const { city_of_usage, assignment, vehiclerequested, Reportingplace, start_date, Reporingtime } = useSelector((state) => state.corporate);
  const userDetails = useSelector((state) => state.userprofile);
  console.log(" Redux User Data:", userDetails);


  const dispatch = useDispatch();
  const [unreadCount, setUnreadCount] = useState(0);
  const [specialInstruction, setspecialInstruction] = useState('');
  const [reportingLandmark, setreportingLandmark] = useState('');
  const [flightTrainInfo, setflightTrainInfo] = useState('');
  const [EmpId, setEmpId] = useState('');
  const [referenceNumber, setreferenceNumber] = useState('');
  const [BookingCode, setBookingCode] = useState('');
  const [trNumber, settrNumber] = useState('');
  const [BillNumber, setBillNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingRentalType, setLoadingRentalType] = useState(false);
  const [loadingCarGroup, setloadingCarGroup] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  

  const checkUserLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedInn');
      return isLoggedIn === 'true';
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  };
  
  useEffect(() => {
    const getAccessToken = async () => {
      const token = await fetchJwtAccess();
      if (token) setAccessToken(token);
    };
    
    const initializeComponent = async () => {
      await getAccessToken();
      const isLoggedIn = await checkUserLoginStatus();
      
      if (isLoggedIn) {
        await getUserData();
      } else {
     
        dispatch(resetCorporateSlice());
        clearLocalFormState();
      }
      
      fetchUnreadCount();
    };
    
    initializeComponent();
  }, []);
  

  const clearLocalFormState = () => {
    setspecialInstruction('');
    setreportingLandmark('');
    setflightTrainInfo('');
    setEmpId('');
    setreferenceNumber('');
    setBookingCode('');
    settrNumber('');
    setBillNumber('');
  };
  
  const getNotificationIcon = (type) => {
    return require('../../assets/info1.png');
  };
  
  const getUserData = async () => {
    try {
      const keys = [
        "status", "isLoggedInn", "user_id", "email_id",
        "f_name", "l_name", "client_name", "client_id",
        "gender", "mobile_number", "user_type",
        "bithdate", "country", "userToken"
      ];

      const values = await AsyncStorage.multiGet(keys);
      const userData = Object.fromEntries(values);

      console.log(" Retrieved User Data:", userData);

      if (userData.user_id) {
        dispatch(updateCorporateSlice(userData));
      } else {
        console.warn(" No user data found in AsyncStorage.");
      }
    } catch (error) {
      console.error(" Error retrieving user data:", error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      await NotificationService.fetchNotifications(
        {},
        1,
        10,
        () => { },
        (count) => {
          console.log("Unread Count Fetched:", count); 
          setUnreadCount(count);
        },
        () => { }
      );
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };
  
  const handleFetchCities = useCallback(async () => {
    setLoadingCities(true);
    try {
      const client_id = await AsyncStorage.getItem('client_id')
      const list = await fetchCities('', client_id, accessToken, setCityList);
      setLoadingCities(false)
      navigation.navigate('City', { list, type: 'city_of_usage' });
      // setLoading(false)
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
    setLoadingCities(false)
  }, [userDetails, accessToken]);

  const handleFetchRentalType = useCallback(async () => {
    setLoadingRentalType(true);
    try {
      const client_id = await AsyncStorage.getItem('client_id')
      const { rentalItems, carGroupItems, e_loc } = await fetchRentalType(city_of_usage, client_id, accessToken);
      setCarGroupList(carGroupItems);
      seteloc(e_loc);
      setLoadingRentalType(false);

      navigation.navigate('City', { list: rentalItems, type: 'assignment' });
    } catch (error) {
      console.error("Error fetching rental types:", error);
    }
  }, [city_of_usage, userDetails, accessToken]);
  
  const [modalVisible, setModalVisible] = useState(false);
  
  const areFieldsFilled = () => {
    return (
      city_of_usage &&
      assignment &&
      vehiclerequested &&
      Reportingplace
    );
  };
  
  const openModal = () => {
    if (areFieldsFilled()) {
      setModalVisible(true);
    } else {
      Alert.alert("Incomplete Fields", "Please fill all required fields before proceeding.");
    }
  };
  
  const handleRightIcon = () => {
    setUnreadCount(0); 
    navigation.navigate("Notifications");
  };


  const handleBookingConfirmed = () => {
    // Reset all form fields
    dispatch(resetCorporateSlice());
    clearLocalFormState();
    

    setModalVisible(false);
    
  
    Alert.alert(
      "Booking Confirmed", 
      "Your booking has been successfully submitted.",
      [{ text: "OK" }]
    );
  };
  
  const closeModal = () => {
    setModalVisible(false);
  };
  
  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        title="Home"
        justifyContent="space-between"
        iconHeight={30}
        iconWidth={36}
        islogo
        leftIcon={Menuu}
        rightIcon={() => (
          <View style={{ position: "relative", color:"#fff" }}>
            <Icon name="notifications" size={24} color="#fff" style={{ marginRight: 10 }}  />
            {unreadCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  backgroundColor: "red",
                  borderRadius: 10,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                }}
              >
                <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
                  {unreadCount}
                </Text>
              </View>
            )}
          </View>
        )}
        handleLeftIcon={() => setIsSidebarVisible(true)}
        handleRightIcon={handleRightIcon} 
        isSidebarVisible={isSidebarVisible}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {
          <ReviewBookingModal 
            visible={modalVisible}
            onClose={closeModal} 
            onConfirm={handleBookingConfirmed}
            eloc={e_loc} 
          />
        }
        <View style={styles.root}>
          <Section title="Car Reservation Details">
            <View style={[styles.container2]}>
              <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                {renderCustomTile(city_of_usage || 'City', handleFetchCities, loadingCities)}

                {renderCustomTile(
                  assignment || 'Rental Type',
                  () => {
                    if (!city_of_usage) {
                      Alert.alert("Selection Required", "Please select a city first.");
                      return;
                    }
                    handleFetchRentalType();
                  },
                  loadingRentalType
                )}

                {renderCustomTile(
                  vehiclerequested || 'Car Group',
                  () => {
                    if (!assignment) {
                      Alert.alert("Selection Required", "Please select a Rental Type.");
                      return;
                    }
                    setloadingCarGroup(true)
                    navigation.navigate('City', { list: carGroupList, type: 'vehiclerequested' });
                    setloadingCarGroup(false)
                  },
                  loadingCarGroup
                )}
              </View>
            </View>
          </Section>

          <Section title="Car Reporting Details">
            <View style={{ backgroundColor: '#FFFFFF' }}>
              <CustomCalender />
            </View>
            <View style={[styles.container2]}>
              <View style={{ marginHorizontal: 10 }}>
                {renderCustomTile(
                  (Reportingplace.placeAddress?.length > 25
                    ? Reportingplace.placeAddress.substring(0, 40) + "..."
                    : Reportingplace?.placeAddress) || 'Pickup Address',
                  () => {
                    if (!city_of_usage) {
                      Alert.alert("Selection Required", "Please select a city first.");
                      return;
                    }
                    navigation.navigate('PickUpLocation', { eloc: e_loc, type: 'Reportingplace' });
                  },
                  loading
                )}

                <CustomTextInpt
                  placeholder="Reporting Landmark (Optional)"
                  value={reportingLandmark}
                  onChangeText={(txt) => {
                    setreportingLandmark(txt);
                    dispatch(updateCorporateSlice({
                      type: "reportingLandmark",
                      selectedItem: txt
                    }));
                  }}
                />
              </View>
            </View>
          </Section>

          <Section title="Other Information">
            <View style={[styles.container2]}>
              <View style={{ marginHorizontal: 10 }}>
                <CustomTextInpt 
                  placeholder="Flight/Train info"
                  value={flightTrainInfo}
                  onChangeText={(txt) => {
                    setflightTrainInfo(txt)
                    dispatch(updateCorporateSlice({
                      type: "Guestflight",
                      selectedItem: txt
                    }))
                  }}
                />
                <CustomTextInpt 
                  placeholder="Special Instruction (Optional)"
                  value={specialInstruction}
                  onChangeText={(txt) => {
                    setspecialInstruction(txt)
                    dispatch(
                      updateCorporateSlice({
                        type: "instruction",
                        selectedItem: txt,
                      })
                    )
                  }}
                />
              </View>
            </View>
          </Section>

          <Section title="Additional Information">
            <View style={[styles.container2]}>
              <View style={{ marginHorizontal: 10 }}>
                <CustomTextInpt
                  placeholder="Emp ID"
                  value={EmpId}
                  onChangeText={(txt) => {
                    setEmpId(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: "custom_column",
                        selectedItem: { EmpId: txt },
                      })
                    );
                  }}
                />

                <CustomTextInpt
                  placeholder="Reference Number"
                  value={referenceNumber}
                  onChangeText={(txt) => {
                    setreferenceNumber(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: "custom_column",
                        selectedItem: { referenceNumber: txt }, 
                      })
                    );
                  }}
                />

                <CustomTextInpt
                  placeholder="Booking Code"
                  value={BookingCode}
                  onChangeText={(txt) => {
                    setBookingCode(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: "custom_column",
                        selectedItem: { bookingCode: txt }, 
                      })
                    );
                  }}
                />

                <CustomTextInpt
                  placeholder="TR No"
                  value={trNumber}
                  onChangeText={(txt) => {
                    settrNumber(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: "custom_column",
                        selectedItem: { trNumber: txt }, 
                      })
                    );
                  }}
                />

                <CustomTextInpt
                  placeholder="Bill No"
                  value={BillNumber}
                  onChangeText={(txt) => {
                    setBillNumber(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: "custom_column",
                        selectedItem: { billNumber: txt }, 
                      })
                    );
                  }}
                />
              </View>
            </View>
          </Section>

          <CustomButton 
            title="Next" 
            borderRadius={0} 
            onPress={openModal}
          />
        </View>
      </ScrollView>

      <SidebarMenu isVisible={isSidebarVisible} onClose={() => setIsSidebarVisible(false)} />
    </View>
  );
};

const Section = ({ title, children }) => (
  <View style={styles.container}>
    <View style={styles.container1}>
      <Text style={styles.txt}>{title}</Text>
    </View>
    {children}
  </View>
);

const renderCustomTile = (title, onPress, loading) => (
  <CustomCarGrouptile title={title} onPress={onPress} iconName="chevron-right" loader={loading} />
);

export default CorporateModule1;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F1F1F3',
  },
  scrollContainer: {
    paddingTop: 20,
  },
  root: {
    flex: 1,
    backgroundColor: '#F1F1F3',
  },
  container: {
    margin: 16,
    backgroundColor: '#F1F1F3',
    elevation: 5,
  },
  container1: {
    height: 32,
    backgroundColor: '#374852',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    justifyContent: 'center',
    paddingStart: 10,
  },
  container2: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 10
  },
  txt: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600'
  },
});



// import React, { useEffect, useState } from 'react';
// import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import CustomHeader from '../../component/CustomHeader';
// import CustomDropdown from '../../component/CustomDropdown';
// import CustomTextInpt from '../../component/CustomTextInpt';
// import CustomCalender from '../../component/CustomCalender';
// import CustomButton from '../../component/CustomButtons';
// import CustomCarGrouptile from '../../component/CustomCarGrouptile';
// import SidebarMenu from '../../component/SidebarMenu';
// import { fetchCities, fetchRentalType } from '../../Api/CorporateModuleApis';
// import { useSelector } from 'react-redux';
// import { fetchJwtAccess } from '../../Utils/JwtHelper';

// const CorporateModule1 = ({ navigation, route }) => {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const userDetails = useSelector((state) => state.userprofile);
//   const [accessToken, setAccessToken] = useState('');
//   const [cityList, setcity] = useState([])
//   const cityData = cityList
//   const [cargroupitem , setcargroupItem] = useState([]);
//   const { city, rentalType, carGroup } = useSelector((state) => state.corporate);
//   const styles = useStyles();

//   const handleMenuPress = () => {
//     setIsSidebarVisible(true);
//   };
//   useEffect(() => {
//     const getAccessToken = async () => {
//       const token = await fetchJwtAccess();
//       if (token) {
//         setAccessToken(token);
//       }
//     };
//     getAccessToken();
//   }, []);



//   return (
//     <View style={styles.mainContainer}>
//       <CustomHeader
//         iconHeight={30}
//         iconWidth={39}
//         islogo={true}
//         imgPath={require('../../assets/ktclogo.png')}
//         iconPath={require('../../assets/menuu.png')}
//         handleLeftIcon={handleMenuPress}
//         isSidebarVisible={isSidebarVisible}
//       />

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.root}>
//           <View style={styles.container}>
//             <View>
//               <View style={styles.container1}>
//                 <Text style={styles.txt}>Car Reservation Details</Text>
//               </View>
//               <View style={[styles.container2, { height: 190 }]}>
//                 <View style={{ marginHorizontal: 10 }}>
//                   <View style={{ marginTop: 5 }}>
//                     <CustomCarGrouptile
//                       title={city || 'City'}
//                       onPress={async () => {
//                         try {
//                           const list = await fetchCities('', userDetails, accessToken, setcity);
//                           console.log("Fetched List:", list);
//                           navigation.navigate('City', { list, type: 'city' });
//                         } catch (error) {
//                           console.error("Error fetching cities:", error);
//                         }
//                       }}
//                       iconName={'chevron-right'}
//                     />
//                     <CustomCarGrouptile
//                       title={rentalType || 'Rental Type'}
//                       onPress={async () => {
//                         try {
//                           const { rentalItems, carGroupItems } = await fetchRentalType(city, userDetails, accessToken, setcity, typeoff = 'rentalType');
//                           setcargroupItem(carGroupItems) ;
//                           navigation.navigate('City', { list: rentalItems, type: 'rentalType' });
//                         } catch (error) {
//                           console.error("Error fetching rental types:", error);
//                         }
//                       }}
//                       iconName={'chevron-right'}
//                     />
//                     <CustomCarGrouptile
//                       title={carGroup || 'Car Group'}
//                       onPress={async () => {
//                         try {
//                           const list = cargroupitem ;
//                           console.log('====================================');
//                           console.log("CARGRPITEM", cargroupitem);
//                           console.log('====================================');
//                           navigation.navigate('CarGroup', { list , type : 'carGroup' });
//                         } catch (error) {
//                           console.error("Error fetching rental types:", error);
//                         }
//                       }}
//                       iconName={'chevron-right'}
//                     />
//                   </View>

//                 </View>
//               </View>
//             </View>
//           </View>

//           <View style={styles.container}>
//             <View>
//               <View style={styles.container1}>
//                 <Text style={styles.txt}>Car Reporting Details</Text>
//               </View>
//               <View style={{ backgroundColor: '#FFFFFF' }}>
//                 <CustomCalender />
//               </View>
//               <View style={[styles.container2, { height: 140 }]}>
//                 <View style={{ marginHorizontal: 10 }}>
//                   <CustomCarGrouptile
//                     title={'Pickup Address'}
//                     onPress={() => navigation.navigate('PickUpLocation')}
//                     iconName={'chevron-down'}
//                   />
//                   <CustomTextInpt placeholder={'Reporting Landmark (Optional)'} />
//                 </View>
//               </View>
//             </View>
//           </View>

//           <View style={styles.container}>
//             <View>
//               <View style={styles.container1}>
//                 <Text style={styles.txt}>Other Information</Text>
//               </View>
//               <View style={[styles.container2, { height: 208 }]}>
//                 <View style={{ marginHorizontal: 10 }}>
//                   <CustomTextInpt placeholder={'Flight/Train info'} />
//                   <CustomTextInpt placeholder={'Special Instruction (Optional)'} />
//                   <CustomDropdown
//                     data={cityData}
//                     placeholder="Payment Mode"
//                     searchPlaceholder="Search Payment Mode..."
//                     onChange={(item) => console.log('Selected Payment Mode:', item)}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>

//           <CustomButton
//             title={'Next'}
//             borderRadius={0}
//             onPress={async () => {
//               navigation.navigate('HomeScreen1')
//             }}
//           />
//         </View>
//       </ScrollView>

//       <SidebarMenu
//         isVisible={isSidebarVisible}
//         onClose={() => setIsSidebarVisible(false)}
//       />
//     </View>
//   );
// };

// function useStyles() {
//   return StyleSheet.create({
//     mainContainer: {
//       flex: 1,
//       backgroundColor: '#F1F1F3',
//     },

//     scrollContainer: {
//       paddingTop: 20,
//     },
//     root: {
//       flex: 1,
//       backgroundColor: '#F1F1F3',
//     },
//     container: {
//       margin: 16,
//       backgroundColor: '#F1F1F3',
//       elevation: 5,
//     },
//     container1: {
//       height: 32,
//       backgroundColor: '#374852',
//       borderStartStartRadius: 4,
//       borderTopEndRadius: 4,
//       justifyContent: 'center',
//       paddingStart: 10,
//     },
//     container2: {
//       backgroundColor: '#FFFFFF',
//     },
//     txt: {
//       color: '#FFFFFF',
//       fontSize: 12,
//     },
//   });
// }

// export default CorporateModule1;
