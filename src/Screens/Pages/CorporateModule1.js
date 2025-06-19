// Reshab Kumar Pandey
// CorporateModule1.js

import React, {useEffect, useState, useCallback} from 'react';
import {ScrollView, StyleSheet, Text, View, Alert,SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInpt from '../../component/CustomTextInpt';
import CustomCalender from '../../component/CustomCalender';
import CustomButton from '../../component/CustomButtons';
import CustomCarGrouptile from '../../component/CustomCarGrouptile';
import SidebarMenu from '../../component/SidebarMenu';
import {
  fetchCities,
  fetchLocalities,
  fetchRentalType,
} from '../../Api/CorporateModuleApis';
import {fetchJwtAccess} from '../../Utils/JwtHelper';
import Menuu from '../../assets/svg/menu.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import ReviewBookingModal from '../../component/ReviewBookingModal';
import {
  updateCorporateSlice,
  resetCorporateSlice,
} from '../../Redux/slice/CorporateSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationService from '../../services/api/Notification';
import Menu from '../../assets/icon/Menu';

const CorporateModule1 = ({navigation}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [cityList, setCityList] = useState([]);
  const [carGroupList, setCarGroupList] = useState([]);
  const [e_loc, seteloc] = useState('');
  const {
    city_of_usage,
    assignment,
    vehiclerequested,
    Reportingplace,
    start_date,
    Reporingtime,
  } = useSelector(state => state.reviewBooking);
  const selectedItem = useSelector(state => state.reviewBooking.selectedItem);
  const userDetails = useSelector(state => state.userprofile);
  const dispatch = useDispatch();

  // Local state for form fields
  const [unreadCount, setUnreadCount] = useState(0);
  const [specialInstruction, setspecialInstruction] = useState('');
  const [reportingLandmark, setreportingLandmark] = useState('');
  const [flightTrainInfo, setflightTrainInfo] = useState('');
  const [EmpId, setEmpId] = useState('');
  const [referenceNumber, setreferenceNumber] = useState('');
  const [BookingCode, setBookingCode] = useState('');
  const [trNumber, settrNumber] = useState('');
  const [BillNumber, setBillNumber] = useState('');

  // Loading states
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingRentalType, setLoadingRentalType] = useState(false);
  const [loadingCarGroup, setloadingCarGroup] = useState(false);

  // Modal visibility state
  const [modalVisible, setModalVisible] = useState(false);

  const checkUserLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedInn');
      return isLoggedIn === 'true';
    } catch (error) {
      console.error('Error checking login status:', error);
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
        const lastBookingConfirmed = await AsyncStorage.getItem(
          'lastBookingConfirmed',
        );
        const currentTime = new Date().getTime();

        if (
          lastBookingConfirmed &&
          currentTime - parseInt(lastBookingConfirmed) < 30000
        ) {
          await AsyncStorage.removeItem('lastBookingConfirmed');
        } else {
          await getUserData();
        }
      } else {
        dispatch(resetCorporateSlice());
        clearLocalFormState();
        seteloc('');
        setflightTrainInfo('');
      }

      const unsubscribe = navigation.addListener('focus', () => {
        fetchUnreadCount();
      });

      return unsubscribe;
    };

    initializeComponent();
  }, [navigation, dispatch]);

  useEffect(() => {
    return () => {
      // This cleanup function runs when component unmounts
      console.log('CorporateModule1 unmounting, cleaning up state');
    };
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

  const getUserData = async () => {
    try {
      const keys = [
        'status',
        'isLoggedInn',
        'user_id',
        'email_id',
        'f_name',
        'l_name',
        'client_name',
        'client_id',
        'gender',
        'mobile_number',
        'user_type',
        'bithdate',
        'country',
        'userToken',
      ];

      const values = await AsyncStorage.multiGet(keys);
      const userData = Object.fromEntries(values);

      console.log(' Retrieved User Data:', userData);

      if (userData.user_id) {
        dispatch(updateCorporateSlice(userData));
      } else {
        console.warn(' No user data found in AsyncStorage.');
      }
    } catch (error) {
      console.error(' Error retrieving user data:', error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      await NotificationService.fetchNotifications(
        {},
        1,
        10,
        () => {},
        count => {
          console.log('Unread Count Fetched:', count);
          setUnreadCount(count);
        },
        () => {},
      );
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };
  // useEffect(() => {
  
  //   const resetDependentFields = async () => {
  //     dispatch(updateCorporateSlice({
  //       assignment: '',
  //       vehiclerequested: '',
  //       Reportingplace: {}
  //     }));
  //     seteloc('');
  //     setCarGroupList([]);
  //   };
  
   
  //   if (city_of_usage) {
  //     resetDependentFields();
  //   }
  // }, [city_of_usage, dispatch]);


  const handleFetchCities = useCallback(async () => {
    setLoadingCities(true);
    try {
      const client_id = await AsyncStorage.getItem('client_id');
      const list = await fetchCities('', client_id, accessToken, setCityList);
     
      setLoadingCities(false);
      navigation.navigate('City', {list, type: 'city_of_usage',   
       
      });
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
    setLoadingCities(false);
  }, [userDetails, accessToken, navigation]);

  const handleFetchRentalType = useCallback(async () => {
    setLoadingRentalType(true);
    try {
      const client_id = await AsyncStorage.getItem('client_id');
      const {
        rentalItems,
        carGroupItems,
        e_loc: fetchedEloc,
      } = await fetchRentalType(city_of_usage, client_id, accessToken);
      setCarGroupList(carGroupItems);
      seteloc(fetchedEloc);
      setLoadingRentalType(false);
      navigation.navigate('City', {list: rentalItems, type: 'assignment'});
    } catch (error) {
      console.error('Error fetching rental types:', error);
    } finally {
      setLoadingRentalType(false);
    }
  }, [city_of_usage, userDetails, accessToken, navigation]);

  const areFieldsFilled = () => {
    const filled =
      city_of_usage &&
      assignment &&
      vehiclerequested &&
      start_date &&
      Reporingtime &&
      Reportingplace?.placeAddress;
    console.log('areFieldsFilled:', filled, {
      city_of_usage,
      assignment,
      vehiclerequested,
      Reportingplace,
      start_date,
      Reporingtime
    });
    return filled;
  };

  const openModal = () => {
    console.log('openModal function called');
    if (areFieldsFilled()) {
      console.log('Setting modalVisible to true');
      setModalVisible(true);
    } else {
      Alert.alert(
        'Incomplete Fields',
        'Please fill all required fields before proceeding.',
      );
    }
  };

  const handleRightIcon = () => {
    setUnreadCount(0);
    navigation.navigate('Notifications');
  };

  const handleBookingConfirmed = async () => {
    console.log('Booking confirmed, resetting state');

    await AsyncStorage.setItem(
      'lastBookingConfirmed',
      new Date().getTime().toString(),
    );

    setModalVisible(false);

    setTimeout(() => {
      dispatch(resetCorporateSlice());
      clearLocalFormState();

      // Navigate to the upcoming bookings screen or reset to a fresh booking form
      navigation.navigate('Upcoming', {eloc: e_loc}); 

      Alert.alert(
        'Booking Confirmed',
        'Your booking has been successfully submitted.',
        [{text: 'OK'}],
      );
    }, 500);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
       <SafeAreaView style={styles.safeArea}>
    <View style={styles.mainContainer}>
      <CustomHeader
        title="Home"
        justifyContent="space-between"
        iconHeight={30}
        iconWidth={36}
        islogo
        leftIcon={Menu}
        rightIcon={() => (
          <View style={{position: 'relative', color: '#fff'}}>
            <Icon
              name="notifications"
              size={24}
              color="#fff"
              style={{marginRight: 10}}
            />
            {unreadCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                }}>
                <Text
                  style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
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
            eloc={Reportingplace?.mapplsPin}
          />
        }
        <View style={styles.root}>
          <Section title="Car Reservation Details">
            <View style={[styles.container2]}>
              <View style={{marginHorizontal: 10, marginTop: 5}}>
                {renderCustomTile(
                  city_of_usage || 'City',
                  handleFetchCities,
                  loadingCities,
                )}

                {renderCustomTile(
                  assignment || 'Rental Type',
                  () => {
                    if (!city_of_usage) {
                      Alert.alert(
                        'Selection Required',
                        'Please select a city first.',
                      );
                      return;
                    }
                    handleFetchRentalType();
                  },
                  loadingRentalType,
                )}

                {renderCustomTile(
                  vehiclerequested || 'Car Group',
                  () => {
                    if (!assignment) {
                      Alert.alert(
                        'Selection Required',
                        'Please select a Rental Type.',
                      );
                      return;
                    }
                    setloadingCarGroup(true);
                    navigation.navigate('City', {
                      list: carGroupList,
                      type: 'vehiclerequested',
                    });
                    setloadingCarGroup(false);
                  },
                  loadingCarGroup,
                )}
              </View>
            </View>
          </Section>

          <Section title="Car Reporting Details">
            <View style={{backgroundColor: '#FFFFFF'}}>
              <CustomCalender />
            </View>
            <View style={[styles.container2]}>
              <View style={{marginHorizontal: 10}}>
                {renderCustomTile(
                  // <Text style={{fontSize: 16, marginHorizontal: 8}}>
                  //   {(Reportingplace.placeAddress?.length > 25
                  //     ? Reportingplace.placeAddress.substring(0, 40) + '...'
                  //     : Reportingplace?.placeAddress) || 'Pickup Address'}
                  // </Text>,
                  <Text
                    style={{fontSize: 16, marginHorizontal: 8}}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {Reportingplace?.placeName &&
                      `${Reportingplace.placeName}\n`}
                    {Reportingplace?.placeAddress || 'Pickup Address'}
                  </Text>,
                  () => {
                    if (!city_of_usage) {
                      Alert.alert(
                        'Selection Required',
                        'Please select a city first.',
                      );
                      return;
                    }
                    navigation.navigate('PickUpLocation', {
                      eloc: e_loc,
                      type: 'Reportingplace',
                    });
                  },
                  loading,
                )}

                <CustomTextInpt
                  placeholder="Reporting Landmark (Optional)"
                  value={reportingLandmark}
                  onChangeText={txt => {
                    setreportingLandmark(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: 'reportingLandmark',
                        selectedItem: txt,
                      }),
                    );
                  }}
                />
              </View>
            </View>
          </Section>

          <Section title="Other Information">
            <View style={[styles.container2]}>
              <View style={{marginHorizontal: 10}}>
                <CustomTextInpt
                  placeholder="Flight/Train info"
                  value={flightTrainInfo}
                  onChangeText={txt => {
                    setflightTrainInfo(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: 'Guestflight',
                        selectedItem: txt,
                      }),
                    );
                  }}
                />
                <CustomTextInpt
                  placeholder="Special Instruction (Optional)"
                  value={specialInstruction}
                  onChangeText={txt => {
                    setspecialInstruction(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: 'instruction',
                        selectedItem: txt,
                      }),
                    );
                  }}
                />
              </View>
            </View>
          </Section>

          <Section title="Additional Information">
            <View style={[styles.container2]}>
              <View style={{marginHorizontal: 10}}>
                <CustomTextInpt
                  placeholder="Emp ID"
                  value={EmpId}
                  onChangeText={txt => {
                    setEmpId(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: 'custom_column',
                        selectedItem: {EmpId: txt},
                      }),
                    );
                  }}
                />

                <CustomTextInpt
                  placeholder="Reference Number"
                  value={referenceNumber}
                  onChangeText={txt => {
                    setreferenceNumber(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: 'custom_column',
                        selectedItem: {referenceNumber: txt},
                      }),
                    );
                  }}
                />

                <CustomTextInpt
                  placeholder="Booking Code"
                  value={BookingCode}
                  onChangeText={txt => {
                    setBookingCode(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: 'custom_column',
                        selectedItem: {bookingCode: txt},
                      }),
                    );
                  }}
                />

                <CustomTextInpt
                  placeholder="TR No"
                  value={trNumber}
                  onChangeText={txt => {
                    settrNumber(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: 'custom_column',
                        selectedItem: {trNumber: txt},
                      }),
                    );
                  }}
                />

                <CustomTextInpt
                  placeholder="Bill No"
                  value={BillNumber}
                  onChangeText={txt => {
                    setBillNumber(txt);
                    dispatch(
                      updateCorporateSlice({
                        type: 'custom_column',
                        selectedItem: {billNumber: txt},
                      }),
                    );
                  }}
                />
              </View>
            </View>
          </Section>

          <CustomButton title="Next" borderRadius={0} onPress={openModal} />
        </View>
      </ScrollView>

      <SidebarMenu
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
      />
    </View>
    </SafeAreaView>
  );
};

const Section = ({title, children}) => (
  <View style={styles.container}>
    <View style={styles.container1}>
      <Text style={styles.txt}>{title}</Text>
    </View>
    {children}
  </View>
);

const renderCustomTile = (title, onPress, loading) => (
  <CustomCarGrouptile
    title={title}
    onPress={onPress}
    iconName="chevron-right"
    loader={loading}
  />
);

export default CorporateModule1;
const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#F1F1F3',
  },
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
    paddingBottom: 10,
  },
  txt: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

