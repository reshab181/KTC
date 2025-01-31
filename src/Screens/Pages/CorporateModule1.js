// Author: Ashutosh Rai
// Component: CorporateModule1

import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import CustomHeader from '../../component/CustomHeader';
import CustomDropdown from '../../component/CustomDropdown';
import CustomTextInpt from '../../component/CustomTextInpt';
import CustomCalender from '../../component/CustomCalender';
import CustomButton from '../../component/CustomButtons';
import CustomCarGrouptile from '../../component/CustomCarGrouptile';
import SidebarMenu from '../../component/SidebarMenu';
import { fetchCities, fetchLocalities, fetchRentalType } from '../../Api/CorporateModuleApis';
import { fetchJwtAccess } from '../../Utils/JwtHelper';

const CorporateModule1 = ({ navigation }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [cityList, setCityList] = useState([]);
  const [carGroupList, setCarGroupList] = useState([]);
  const [e_loc , seteloc ] = useState('');
  const { city, rentalType, carGroup , pickupAddress} = useSelector((state) => state.corporate);
  const userDetails = useSelector((state) => state.userprofile);

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
      const { rentalItems, carGroupItems , e_loc} = await fetchRentalType(city, userDetails, accessToken, setCityList, 'rentalType');
      setCarGroupList(carGroupItems);
      seteloc(e_loc);
      navigation.navigate('City', { list: rentalItems, type: 'rentalType' });
    } catch (error) {
      console.error("Error fetching rental types:", error);
    }
  }, [city, userDetails, accessToken]);

  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        iconHeight={30}
        iconWidth={39}
        islogo
        imgPath={require('../../assets/ktclogo.png')}
        iconPath={require('../../assets/menuu.png')}
        handleLeftIcon={() => setIsSidebarVisible(true)}
        isSidebarVisible={isSidebarVisible}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.root}>
          <Section title="Car Reservation Details">
            <View style={[styles.container2, { height: 190 }]}>
              <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                {renderCustomTile(city || 'City', handleFetchCities)}
                {renderCustomTile(rentalType || 'Rental Type', handleFetchRentalType)}
                {renderCustomTile(carGroup || 'Car Group', () => navigation.navigate('City', { list: carGroupList, type: 'carGroup' }))}
              </View>
            </View>
          </Section>

          <Section title="Car Reporting Details">
            <View style={{ backgroundColor: '#FFFFFF' }}>
              <CustomCalender />
            </View>
            <View style={[styles.container2, { height: 140 }]}>
              <View style={{ marginHorizontal: 10 }}>
                {renderCustomTile(pickupAddress || 'Pickup Address', ()=>navigation.navigate('PickUpLocation', {eloc : e_loc}))}

                <CustomTextInpt placeholder="Reporting Landmark (Optional)" />
              </View>
            </View>
          </Section>

          <Section title="Other Information">
            <View style={[styles.container2, { height: 208 }]}>
              <View style={{ marginHorizontal: 10 }}>
                <CustomTextInpt placeholder="Flight/Train info" />
                <CustomTextInpt placeholder="Special Instruction (Optional)" />
                <CustomDropdown
                  data={cityList}
                  placeholder="Payment Mode"
                  searchPlaceholder="Search Payment Mode..."
                  onChange={(item) => console.log('Selected Payment Mode:', item)}
                />
              </View>
            </View>
          </Section>

          <CustomButton title="Next" borderRadius={0} onPress={() =>
             navigation.navigate('HomeScreen1')
            // fetchLocalities('delhi')
            } 
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
