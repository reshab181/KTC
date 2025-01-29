// Author: Ashutosh Rai
// Component: CorporateModule1

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../component/CustomHeader';
import CustomDropdown from '../../component/CustomDropdown';
import CustomTextInpt from '../../component/CustomTextInpt';
import CustomCalender from '../../component/CustomCalender';
import CustomButton from '../../component/CustomButtons';
import CustomCarGrouptile from '../../component/CustomCarGrouptile';
import SidebarMenu from '../../component/SidebarMenu';
import { fetchCities } from '../../Api/CorporateModuleApis';
import { useSelector } from 'react-redux';
import { fetchJwtAccess } from '../../Utils/JwtHelper';

const CorporateModule1 = ({ navigation }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const userDetails = useSelector((state) => state.userprofile);
  const [accessToken, setAccessToken] = useState('');
  const [cityList, setcity] = useState([])
  const cityData = cityList

  const rentalTypeData = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  const carGroupData = [
    { label: 'Sedan', value: 'sedan' },
    { label: 'SUV', value: 'suv' },
    { label: 'Hatchback', value: 'hatchback' },
  ];

  const styles = useStyles();

  const handleMenuPress = () => {
    setIsSidebarVisible(true);
  };
  useEffect(() => {
    const getAccessToken = async () => {
      const token = await fetchJwtAccess();
      if (token) {
        setAccessToken(token);
      }
    };
    getAccessToken();
  }, []);


  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        iconHeight={30}
        iconWidth={39}
        islogo={true}
        imgPath={require('../../assets/ktclogo.png')}
        iconPath={require('../../assets/menuu.png')}
        handleLeftIcon={handleMenuPress}
        isSidebarVisible={isSidebarVisible}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.root}>
          <View style={styles.container}>
            <View>
              <View style={styles.container1}>
                <Text style={styles.txt}>Car Reservation Details</Text>
              </View>
              <View style={[styles.container2, { height : 190  }]}>
                <View style={{ marginHorizontal: 10 }}>
                  <View style={{marginTop: 10}}>
                  <CustomCarGrouptile
                    title={'City'}
                    onPress={async() => {
                      const list = await fetchCities('', userDetails,accessToken, setcity , cityList)  
                      console.log('====================================');
                      console.log("list", list);
                      console.log('====================================');
                      navigation.navigate('City', {list})

                    }}
                    iconName={'chevron-right'}
                  />
                  </View>
                  <CustomDropdown
                    data={rentalTypeData}
                    placeholder="Rental Type"
                    searchPlaceholder="Search Rental Type..."
                    onChange={(item) => console.log('Selected Rental Type:', item)}
                  />
                  <CustomDropdown
                    data={carGroupData}
                    placeholder="Car Groups"
                    searchPlaceholder="Search Car Group..."
                    onChange={(item) => console.log('Selected Car Group:', item)}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <View>
              <View style={styles.container1}>
                <Text style={styles.txt}>Car Reporting Details</Text>
              </View>
              <View style={{ backgroundColor: '#FFFFFF' }}>
                <CustomCalender />
              </View>
              <View style={[styles.container2, { height: 140 }]}>
                <View style={{ marginHorizontal: 10 }}>
                  <CustomCarGrouptile
                    title={'Pickup Address'}
                    onPress={() => navigation.navigate('PickUpLocation')}
                    iconName={'chevron-down'}
                  />
                  <CustomTextInpt placeholder={'Reporting Landmark (Optional)'} />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <View>
              <View style={styles.container1}>
                <Text style={styles.txt}>Other Information</Text>
              </View>
              <View style={[styles.container2, { height: 208 }]}>
                <View style={{ marginHorizontal: 10 }}>
                  <CustomTextInpt placeholder={'Flight/Train info'} />
                  <CustomTextInpt placeholder={'Special Instruction (Optional)'} />
                  <CustomDropdown
                    data={cityData}
                    placeholder="Payment Mode"
                    searchPlaceholder="Search Payment Mode..."
                    onChange={(item) => console.log('Selected Payment Mode:', item)}
                  />
                </View>
              </View>
            </View>
          </View>

          <CustomButton
            title={'Next'}
            borderRadius={0}
            onPress={async () => {

            }}
          />
        </View>
      </ScrollView>

      <SidebarMenu
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
      />
    </View>
  );
};

// Styles
function useStyles() {
  const { width: winwidth, height: winheight } = useWindowDimensions();
  return StyleSheet.create({
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
      borderStartStartRadius: 4,
      borderTopEndRadius: 4,
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
}

export default CorporateModule1;
