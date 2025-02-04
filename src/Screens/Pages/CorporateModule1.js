// Author: Ashutosh Rai
// Component: CorporateModule1

import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
import ReviewBookingModal from '../../component/ReviewBookingModal';
import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice';
const CorporateModule1 = ({ navigation }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [cityList, setCityList] = useState([]);
  const [Visible, setVisible] = useState(false)
  const [carGroupList, setCarGroupList] = useState([]);
  const [e_loc, seteloc] = useState('');
  const { city, rentalType, carGroup, pickupAddress ,   selectedDate , selectedTime } = useSelector((state) => state.corporate);
  const userDetails = useSelector((state) => state.userprofile);
  const dispatch = useDispatch();
  const [specialInstruction, setspecialInstruction] = useState('');
  const [reportingLandmark, setreportingLandmark] = useState('');
  const [flightTrainInfo , setflightTrainInfo] = useState('');
  const [EmpId , setEmpId ] = useState('');
  const [referenceNumber, setreferenceNumber] = useState('');
  const [BookingCode, setBookingCode] = useState('');
  const [trNumber, settrNumber] = useState('')
  const [BillNumber, setBillNumber] = useState('')
  useEffect(() => {
    const getAccessToken = async () => {
      const token = await fetchJwtAccess();
      if (token) setAccessToken(token);
    };
    getAccessToken();
  }, []);

  const handleFetchCities = useCallback(async () => {
    try {
      const list = await fetchCities('', userDetails, accessToken, setCityList);
      navigation.navigate('City', { list, type: 'city' });
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }, [userDetails, accessToken]);

  const handleFetchRentalType = useCallback(async () => {
    try {
      const { rentalItems, carGroupItems, e_loc } = await fetchRentalType(city, userDetails, accessToken, setCityList, 'rentalType');
      setCarGroupList(carGroupItems);
      seteloc(e_loc);
      navigation.navigate('City', { list: rentalItems, type: 'rentalType' });
    } catch (error) {
      console.error("Error fetching rental types:", error);
    }
  }, [city, userDetails, accessToken]);
  const [modalVisible, setModalVisible] = useState(false);
  const areFieldsFilled = () => {
    return (
      city &&
      rentalType &&
      carGroup &&
      pickupAddress && 
      selectedDate && 
      selectedTime
    ); 
      // EmpId &&
      // referenceNumber &&
      // BookingCode &&
      // trNumber &&
      // BillNumber
    // );
  };
  const openModal = () => {
    if (areFieldsFilled()) {
      setModalVisible(true);
    } else {
      Alert.alert("Incomplete Fields", "Please fill all required fields before proceeding.");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        iconHeight={30}
        iconWidth={36}
        islogo
        imgPath={require('../../assets/ktclogo.png')}
        Iconn={Menuu}
        handleLeftIcon={() => setIsSidebarVisible(true)}
        isSidebarVisible={isSidebarVisible}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {
          <ReviewBookingModal visible={modalVisible}
            onClose={closeModal} />
        }
        <View style={styles.root}>
          <Section title="Car Reservation Details">
            <View style={[styles.container2]}>
              <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                {renderCustomTile(city || 'City', handleFetchCities)}

                {renderCustomTile(
                  rentalType || 'Rental Type',
                  () => {
                    if (!city) {
                      Alert.alert("Selection Required", "Please select a city first.");
                      return;
                    }
                    handleFetchRentalType();
                  }
                )}

                {renderCustomTile(
                  carGroup || 'Car Group',
                  () => {
                    if (!rentalType) {
                      Alert.alert("Selection Required", "Please select a Rental Type.");
                      return;
                    }
                    navigation.navigate('City', { list: carGroupList, type: 'carGroup' });
                  }
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
                  (pickupAddress?.placeAddress?.length > 25
                    ? pickupAddress.placeAddress.substring(0, 40) + "..."
                    : pickupAddress?.placeAddress) || 'Pickup Address',
                  () => {
                    if (!city) {
                      Alert.alert("Selection Required", "Please select a city first.");
                      return; // Prevent navigation
                    }
                    navigation.navigate('PickUpLocation', { eloc: e_loc, type: 'pickupAddress' });
                  }
                )}

                <CustomTextInpt
                  placeholder="Reporting Landmark (Optional)"
                  value={reportingLandmark} // Pass value correctly
                  onChangeText={(text) => {
                    setreportingLandmark(text);
                    dispatch(updateCorporateSlice({
                      type: "reportingLandmark",
                      selectedItem: text // Use `text` instead of `reportingLandmark`
                    }));
                  }}
                />
              </View>
            </View>
          </Section>

          <Section title="Other Information">
            <View style={[styles.container2, { }]}>
              <View style={{ marginHorizontal: 10 }}>
                <CustomTextInpt placeholder="Flight/Train info"
                  value={flightTrainInfo} 
                  onChangeText={(text)=>{
                    setflightTrainInfo(text)
                    dispatch(updateCorporateSlice({
                      type: "flightTrainInfo", 
                      selectedItem : text
                    }))
                  }}
                />
                <CustomTextInpt placeholder="Special Instruction (Optional)" onChangeText={(text) => {
                  setspecialInstruction(text)
                  dispatch(
                    updateCorporateSlice({
                      type: "specialInstruction",
                      selectedItem: specialInstruction,
                    })
                  )
                }
                } value={specialInstruction}
                />
                {/* <CustomDropdown
                  data={cityList}
                  placeholder="Payment Mode"
                  searchPlaceholder="Search Payment Mode..."
                  onChange={(item) => console.log('Selected Payment Mode:', item)}
                /> */}
                {/* {renderCustomTile
                  ('Payment Method',
                    () => {
                      if (!city) {
                        Alert.alert("Selection Required", "Please select a Above options.");
                        return; // Prevent navigation
                      }
                      navigation.navigate('Payment', { eloc: e_loc, type: 'paymentMethod' });
                    }
                  )} */}
              </View>
            </View>
          </Section>
          <Section title="Additional Information">
            <View style={[styles.container2, { }]}>
              <View style={{ marginHorizontal: 10 }}>
                <CustomTextInpt placeholder="Emp ID"
                  value={EmpId} 
                  onChangeText={(text)=>{
                    setEmpId(text)
                    dispatch(updateCorporateSlice({
                      type: "empId", 
                      selectedItem : text
                    }))
                  }}
                />
                <CustomTextInpt placeholder="Reference Number"
                 value={referenceNumber} 
                  onChangeText={(text) => {
                  setreferenceNumber(text)
                  dispatch(
                    updateCorporateSlice({
                      type: "referenceNumber",
                      selectedItem: text,
                    })
                  )
                }
                }
                />
                <CustomTextInpt placeholder="Booking Code" onChangeText={(text) => {
                  setBookingCode(text)
                  dispatch(
                    updateCorporateSlice({
                      type: "bookingCode",
                      selectedItem: text,
                    })
                  )
                }
                } value={BookingCode}
                />
               <CustomTextInpt placeholder="TR No" 
               value={trNumber}
               onChangeText={(text) => {
                  settrNumber(text)
                  dispatch(
                    updateCorporateSlice({
                      type: "trNumber",
                      selectedItem: text,
                    })
                  )
                }
                } 
                />
                <CustomTextInpt placeholder="Bill No" 
                value={BillNumber}
                  onChangeText={(text) => {
                    setBillNumber(text)
                    dispatch(
                    updateCorporateSlice({
                      type: "billNumber",
                      selectedItem: text,
                    })
                  )
                }
                } 
                />
              </View>
            </View>
          </Section>

          <CustomButton title="Next" borderRadius={0} onPress={openModal}
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

const renderCustomTile = (title, onPress) => (
  <CustomCarGrouptile title={title} onPress={onPress} iconName="chevron-right" />
);



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
    paddingBottom : 10
  },
  txt: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

export default CorporateModule1;



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
