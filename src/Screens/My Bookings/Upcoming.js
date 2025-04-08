// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, SafeAreaView, FlatList, Text, TouchableOpacity, Modal, TextInput, Image, ActivityIndicator } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import CustomHeader from '../../component/CustomHeader';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { apiClient, postJWtHttpClient } from "../../services/api/axiosClient";
// import { encryptPayload, decryptData } from "../../Utils/EncryptionUtility";
// import { BASE_URL, CANCELLATION } from "../../config/api-config";


// import { fetchHistoryBookings } from '../../Api/CorporateModuleApis';

// import UpcomingApi from '../../services/api/upcoming';

// const Upcoming = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [accessToken, setAccessToken] = useState('');
//   const [page, setPage] = useState(1);
//   const [pageLimit] = useState(10);
//   const [history, sethistory] = useState([]);
//   const [upcoming, setupcoming] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedTab, setSelectedTab] = useState('Upcoming');
//   const [reject, setReject] = useState('');
//   const [modalVisible, setModalVisible] = useState({ isVisible: false, values: {} });
//   const [list, setList] = useState([]);

//   useEffect(() => {


//     const fetchData = async () => {
//       setIsLoading(true);

//       const upcomingList = await UpcomingApi("upcoming", page, pageLimit);
//       if (upcomingList) {
//         setupcoming(upcomingList);
//         if (selectedTab === 'Upcoming') {
//           setList(upcomingList);
//         }
//       } else {
//         setupcoming([]);
//         setupcoming([]);
      
//       }

//       // Fetch history bookings
//       const bookings = await UpcomingApi("history", page, pageLimit);
//       if (bookings) {
//         sethistory(bookings);
//         if (selectedTab === 'History') {
//           setList(bookings);
//         }
//       } else if (selectedTab === 'History') {
//         setList([]);
//       }

//       setIsLoading(false);
//       setRefreshing(false);
//     };

//     // getAccessToken();
//     fetchData();
//   }, [page]);

//   const onPressTrack = (item) => {

//     console.log("Tracking chauffeur for booking:", item.booking_id);
//   };

//   const showDetails = (item) => {
//     // Show details logic
//     console.log("Showing details for booking:", item.booking_id);

//   };

//   const handleCancelBooking = async () => {
//     const Cancellation = apiClient(BASE_URL + CANCELLATION);
//     setIsLoading(true);
//     try {
//       const item = { ...modalVisible?.values };
//       const userId = await AsyncStorage.getItem("user_id");
//       if (!userId || !item?.booking_id) {
//         console.error("User ID or Booking ID missing!");
//         setIsLoading(false);
//         return;

//       }
//       const MyPayLod = {
//         "user_id": userId,
//         "booking_number": item?.booking_id,
//         "reasonforcancelation": reject,
//         "requestdatetime": new Date().toISOString()
//       };
//       const encryptedPayLoad = await encryptPayload(MyPayLod)
//       const data = { request_data: decodeURIComponent(encryptedPayLoad) };

//       console.log("Fetching Notifications:", data);

//       let headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
//       const response = await postJWtHttpClient(await Cancellation, '', null, data, headers)

//       if (response && response.status === 200) {
//         console.log("Booking cancelled successfully:", response.data);
//       } else {
//         console.error("Failed to cancel booking:", response);

//         Alert.alert("Error", "Failed to cancel booking. Please try again.");
//         setIsLoading(false);
//         return;
//       }


//     } catch (error) {

//       console.error("Error cancelling booking:", error);
//       Alert.alert("Error", "An error occurred while cancelling your booking. Please try again.");
//       setIsLoading(false);
//       return;
//     }



//     const updatedList = list.map((booking) =>
//       booking.booking_id === modalVisible.values.booking_id
//         ? { ...booking, status: 'Cancelled' }
//         : booking
//     );

//     setList(updatedList);
//     setModalVisible({ isVisible: false, values: {} });
//     setReject('');
//     setIsLoading(false);


//   };

//   const renderhistoryList = ({ item, index }) => {
//     return (
//       <TouchableOpacity style={styles.card}>
//         <View style={styles.rowContainer}>
//           <Image source={require('../../assets/cardemo.png')} style={styles.image} />

//           <View style={styles.divider} />

//           <View style={styles.textContainer}>
//             <Text style={styles.name}>{item.Guestname}</Text>
//             <Text style={styles.detail}>{item.vehiclerequested}</Text>
//             <Text style={styles.detail}>{'Booked on: ' + new Date(item.start_date * 1000).toLocaleDateString()}</Text>
//             <Text style={styles.detail}>{'Booking Id: ' + item.booking_id}</Text>
//             <Text style={styles.detail}>{'Landmark : ' +
//               (item.Reportingplace && item.Reportingplace.length > 17
//                 ? item.Reportingplace.substring(0, 17) + "..."
//                 : item.Reportingplace || 'N/A')}</Text>
//             <Text style={styles.detail}>{'Reporting Time: ' + item.Reporingtime}</Text>
//             <View style={styles.actionContainer}>
//               <>
//                 <TouchableOpacity
//                   style={styles.trackButton}
//                   onPress={() => showDetails(item)}
//                 >
//                   <Text style={styles.trackText}>Show Details</Text>
//                 </TouchableOpacity>
//               </>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderUpcoming = ({ item, index }) => {
//     return (
//       <TouchableOpacity style={styles.card}>
//         <View style={styles.rowContainer}>
//           <Image source={require('../../assets/cardemo.png')} style={styles.image} />

//           <View style={styles.divider} />

//           <View style={styles.textContainer}>
//             <Text style={styles.name}>{item.Guestname}</Text>
//             <Text style={styles.detail}>{item.vehiclerequested}</Text>
//             <Text style={styles.detail}>{'Booked on: ' + new Date(item.start_date * 1000).toLocaleDateString()}</Text>
//             <Text style={styles.detail}>{'Booking Id: ' + item.booking_id}</Text>
//             <Text style={styles.detail}>{'Landmark : ' +
//               (item.Reportingplace && item.Reportingplace.length > 14
//                 ? item.Reportingplace.substring(0, 14) + "..."
//                 : item.Reportingplace || 'N/A')}</Text>
//             <Text style={styles.detail}>{'Reporting Time: ' + item.Reporingtime}</Text>
//             {item.Bookingstatus === 'Cancelled' && (
//               <Text style={styles.cancelledStatus}>Booking Status: Cancelled</Text>
//             )}
//             <View style={styles.actionContainer}>
//               <>
//                 {item.Bookingstatus !== 'Cancelled' ? (
//                   <TouchableOpacity
//                     style={styles.trackButton}
//                     onPress={() => setModalVisible({ isVisible: true, values: item })}
//                   >
//                     <Text style={styles.trackText}>Cancel Ride</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <View style={styles.cancelledStatusContainer}>
//                     <Icon name="ban" size={14} color="#E53935" style={styles.cancelIcon} />
//                   </View>
//                 )}
//                 <TouchableOpacity
//                   style={styles.arrowButton}
//                   onPress={() => onPressTrack(item)}
//                 >
//                   <Image source={require('../../assets/RightArrow.png')} style={styles.arrowIcon} />
//                 </TouchableOpacity>
//               </>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const onTabPress = (tab) => {
//     setSelectedTab(tab);

//     if (tab === 'Upcoming') {
//       if (upcoming && upcoming.length > 0) {
//         setList(upcoming);
//       } else {
//         setList([]);

//         setIsLoading(true);
//         UpcomingApi(page, pageLimit).then(data => {
//           if (data) {
//             setupcoming(data);
//             setList(data);
//           }
//           setIsLoading(false);
//         });
//       }
//     } else {
//       if (history && history.length > 0) {
//         setList(history);
//       } else {
//         setList([]);

//         setIsLoading(true);
//         UpcomingApi(page, pageLimit).then(data => {
//           if (data) {
//             sethistory(data);
//             setList(data);
//           }
//           setIsLoading(false);
//         });
//       }
//     }
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     setPage(1);

//     if (selectedTab === 'Upcoming') {
//       UpcomingApi(1, pageLimit).then(data => {
//         if (data) {
//           setupcoming(data);
//           setList(data);
//         } else {
//           setList([]);
//         }
//         setRefreshing(false);
//       });
//     } else {
//       UpcomingApi(1, pageLimit).then(data => {
//         if (data) {
//           sethistory(data);
//           setList(data);
//         } else {
//           setList([]);
//         }
//         setRefreshing(false);
//       });
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <CustomHeader
//         title="Bookings"
//         leftIcon={() => (
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image
//               source={require('../../assets/ic_back_arrow_white_24.png')}
//               style={{ width: 24, height: 24 }}
//             />
//           </TouchableOpacity>
//         )}
//       />
//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[styles.tab, selectedTab === 'Upcoming' && styles.activeTab]}
//           onPress={() => onTabPress('Upcoming')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'Upcoming' && styles.activeTabText]}>
//             Upcoming
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tab, selectedTab === 'History' && styles.activeTab]}
//           onPress={() => onTabPress('History')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'History' && styles.activeTabText]}>
//             History
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {isLoading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#3C3567" />
//         </View>
//       )}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible.isVisible}
//         onRequestClose={() => {
//           setModalVisible({ isVisible: false, values: {} });
//         }}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible({ isVisible: false, values: {} })}
//             >
//               <Icon name="close" style={styles.closeIcon} />
//             </TouchableOpacity>

//             <Text style={styles.modalTitle}>Cancel Booking</Text>

//             <TextInput
//               value={reject}
//               onChangeText={setReject}
//               style={styles.inputField}
//               placeholder="Enter Reason for Cancellation"
//               multiline={true}
//               numberOfLines={3}
//             />
//             <TouchableOpacity
//               onPress={handleCancelBooking}
//               style={styles.confirmButton}
//               disabled={!reject.trim()}
//             >
//               <Text style={styles.confirmText}>Cancel Booking</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <FlatList
//         data={list}
//         keyExtractor={(item, index) => item.booking_id || index.toString()}
//         renderItem={selectedTab === 'Upcoming' ? renderUpcoming : renderhistoryList}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No {selectedTab} bookings available</Text>
//           </View>
//         }
//         refreshing={refreshing}
//         onRefresh={handleRefresh}
//         contentContainerStyle={{ flexGrow: 1 }}
//       />
//     </SafeAreaView>
//   );
// };
// export default Upcoming;
// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#3C3567',
//     padding: 10,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//     elevation: 2,
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#3C3567',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#000',
//     fontWeight: '600'
//   },
//   activeTabText: {
//     color: '#3C3567',
//     fontWeight: 'bold',
//   },
//   card: {
//     height: 180,
//     backgroundColor: '#fff',
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 3,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     overflow: 'hidden',
//   },
//   rowContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     height: '100%',
//   },
//   image: {
//     width: 140,
//     resizeMode: 'contain',
//   },
//   divider: {
//     width: 1,
//     backgroundColor: '#ddd',
//     height: '100%',
//     marginHorizontal: 7
//   },
//   textContainer: {
//     marginLeft: 7,
//     flex: 1,
//     marginTop: 0,
//     paddingRight: 10,
//   },
//   name: {
//     fontSize: 14,
//     color: "black",
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   detail: {
//     fontSize: 12,
//     color: '#212121',
//     marginBottom: 3,
//   },
//   cancelledStatus: {
//     fontSize: 12,
//     color: '#E53935',
//     fontWeight: 'bold',
//     marginTop: 2,
//     marginBottom: 2,
//   },
//   cancelledStatusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   cancelIcon: {
//     marginRight: 5,
//   },
//   actionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   cancelButton: {
//     backgroundColor: '#E53935',
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   cancelText: {
//     color: '#fff',
//     fontWeight: '500',
//     fontSize: 12,
//   },
//   trackButton: {
//     backgroundColor: '#3C3567',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     marginVertical: -10
//   },
//   trackText: {
//     color: '#fff',
//     fontWeight: '500',
//     fontSize: 12,
//   },
//   arrowButton: {
//     marginLeft: 10
//   },
//   arrowIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyText: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#757575',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//     color: '#3C3567',
//   },
//   inputField: {
//     borderColor: '#ddd',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderRadius: 5,
//     minHeight: 80,
//     textAlignVertical: 'top',
//   },
//   confirmButton: {
//     backgroundColor: '#E53935',
//     padding: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   confirmText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     zIndex: 1,
//   },
//   closeIcon: {
//     fontSize: 24,
//     color: '#000',
//   },
//   loadingContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     zIndex: 1,
//   },
// });

// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   SafeAreaView,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   Image,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import CustomHeader from '../../component/CustomHeader';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { apiClient, postJWtHttpClient } from '../../services/api/axiosClient';
// import { encryptPayload } from '../../Utils/EncryptionUtility';
// import { BASE_URL, CANCELLATION } from '../../config/api-config';
// import UpcomingApi from '../../services/api/upcoming';

// const Upcoming = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [page, setPage] = useState(1);
//   const [pageLimit] = useState(100);
//   const [history, setHistory] = useState([]);
//   const [upcoming, setUpcoming] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('Upcoming');
//   const [reject, setReject] = useState('');
//   const [modalVisible, setModalVisible] = useState({ isVisible: false, values: {} });
//   const [list, setList] = useState([]);


//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const upcomingList = await UpcomingApi('upcoming', page, pageLimit);
//         setUpcoming(upcomingList || []);
//         if (selectedTab === 'Upcoming') {
//           setList(upcomingList || []);
//         }

//         const historyList = await UpcomingApi('history', page, pageLimit);
//         setHistory(historyList || []);
//         if (selectedTab === 'History') {
//           setList(historyList || []);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         Alert.alert('Error', 'Failed to fetch data. Please try again.');
//       } finally {
//         setIsLoading(false);
//         setRefreshing(false);
//       }
//     };

//     useEffect(() => {
//       fetchData(); 
//     }, [page, selectedTab]);

  
//   const handleRefresh = () => {
//     setPage(1);
//     setRefreshing(true);
//     fetchData()
//   };

//   const onPressTrack = (item) => {
//     console.log('Tracking chauffeur for booking:', item.booking_id);
//   };

//   const showDetails = (item) => {
//     console.log('Showing details for booking:', item.booking_id);
//   };
// //   const handleCancelBooking = async () => {
// //     const Cancellation = apiClient(BASE_URL + CANCELLATION);
// //     setIsLoading(true);
// //     try {
// //         const item = { ...modalVisible?.values };
// //         const userId = await AsyncStorage.getItem("user_id");
// //         if (!userId || !item?.booking_id) {
// //             console.error("User ID or Booking ID missing!");
// //             setIsLoading(false);
// //             return;
// //         }
// //         const MyPayLod = {
// //             "user_id": userId,
// //             "booking_number": item?.booking_id,
// //             "reasonforcancelation": reject,
// //             "requestdatetime": new Date().toISOString()
// //         };
// //         const encryptedPayLoad = encryptPayload(MyPayLod);
// //         const data = { request_data: decodeURIComponent(encryptedPayLoad) };

// //         console.log("Fetching Notifications:", data);

// //         let headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
// //         const response = await postJWtHttpClient(await Cancellation, '', null, data, headers);

// //         if (response && response.status === 200) {
// //             Alert.alert("Booking cancelled successfully");

// //             const updatedList = list.map((booking) =>
// //                 booking.booking_id === modalVisible.values.booking_id
// //                     ? { ...booking, Bookingstatus: 'Cancelled' }
// //                     : booking
// //             );
// //             setList(updatedList);
// //             setModalVisible({ isVisible: false, values: {} });
// //             setReject('');
// //             setRefreshing(true)

// //         } else {
// //             console.error("Failed to cancel booking:", response);
// //             Alert.alert("Error", "Failed to cancel booking. Please try again.");
// //             setIsLoading(false);
// //             return;
// //         }
// //     } catch (error) {
// //         console.error("Error cancelling booking:", error);
// //         Alert.alert("Error", "An error occurred while cancelling your booking. Please try again.");
// //         setIsLoading(false);
// //         return;
// //     } finally {
// //         setIsLoading(false);
// //     }
// // };
// const handleCancelBooking = async () => {
//   const Cancellation = apiClient(BASE_URL + CANCELLATION);
//   setIsLoading(true);
//   try {
//       const item = { ...modalVisible?.values };
//       const userId = await AsyncStorage.getItem("user_id");
//       if (!userId || !item?.booking_id) {
//           console.error("User ID or Booking ID missing!");
//           setIsLoading(false);
//           return;
//       }
//       const MyPayLod = {
//           "user_id": userId,
//           "booking_number": item?.booking_id,
//           "reasonforcancelation": reject,
//           "requestdatetime": new Date().toISOString()
//       };
//       const encryptedPayLoad = encryptPayload(MyPayLod);
//       const data = { request_data: decodeURIComponent(encryptedPayLoad) };

//       console.log("Fetching Notifications:", data);

//       let headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
//       const response = await postJWtHttpClient(await Cancellation, '', null, data, headers);

//       if (response && response.status === 200) {
//           Alert.alert("Booking cancelled successfully");

         
//           setModalVisible({ isVisible: false, values: {} });
//           setReject('');
          
        
//           await fetchData();

//       } else {
//           console.error("Failed to cancel booking:", response);
//           Alert.alert("Error", "Failed to cancel booking. Please try again.");
//       }
//   } catch (error) {
//       console.error("Error cancelling booking:", error);
//       Alert.alert("Error", "An error occurred while cancelling your booking. Please try again.");
//   } finally {
//       setIsLoading(false);
//   }
// };

//   const renderBookingItem = ({ item }) => (
//     <TouchableOpacity style={styles.card}>
//       <View style={styles.rowContainer}>
//         <Image source={require('../../assets/cardemo.png')} style={styles.image} />
//         <View style={styles.divider} />
//         <View style={styles.textContainer}>
//           <Text style={styles.name}>{item.Guestname}</Text>
//           <Text style={styles.detail}>{item.vehiclerequested}</Text>
//           <Text style={styles.detail}>{'Booked on: ' + new Date(item.start_date * 1000).toLocaleDateString()}</Text>
//           <Text style={styles.detail}>{'Booking Id: ' + item.booking_id}</Text>
//           <Text style={styles.detail}>
//             {'Landmark : ' +
//               (item.Reportingplace && item.Reportingplace.length > (selectedTab === 'Upcoming' ? 14 : 17)
//                 ? item.Reportingplace.substring(0, selectedTab === 'Upcoming' ? 14 : 17) + '...'
//                 : item.Reportingplace || 'N/A')}
//           </Text>
//           <Text style={styles.detail}>{'Reporting Time: ' + item.Reporingtime}</Text>
//           {selectedTab === 'Upcoming' && item.Bookingstatus === 'Cancelled' && (
//             <Text style={styles.cancelledStatus}>Booking Status: Cancelled</Text>
//           )}
//           <View style={styles.actionContainer}>
//             {selectedTab === 'Upcoming' && item.Bookingstatus !== 'Cancelled' ? (
//               <TouchableOpacity
//                 style={styles.trackButton}
//                 onPress={() => setModalVisible({ isVisible: true, values: item })}
//               >
//                 <Text style={styles.trackText}>Cancel Ride</Text>
//               </TouchableOpacity>
//             ) : selectedTab === 'Upcoming' && (
//               <View style={styles.cancelledStatusContainer}>
//                 <Icon name="ban" size={14} color="#E53935" style={styles.cancelIcon} />
//               </View>
//             )}
//             <TouchableOpacity style={styles.arrowButton} onPress={() => onPressTrack(item)}>
//               <Image source={require('../../assets/RightArrow.png')} style={styles.arrowIcon} />
//             </TouchableOpacity>
//             {selectedTab === 'History' && (
//               <TouchableOpacity style={styles.trackButton} onPress={() => showDetails(item)}>
//                 <Text style={styles.trackText}>Show Details</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const onTabPress = (tab) => {
//     setSelectedTab(tab);
//     setList(tab === 'Upcoming' ? upcoming : history);
//   };


//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <CustomHeader
//         title="Bookings"
//         leftIcon={() => (
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image
//               source={require('../../assets/ic_back_arrow_white_24.png')}
//               style={{ width: 24, height: 24 }}
//             />
//           </TouchableOpacity>
//         )}
//       />
//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={[styles.tab, selectedTab === 'Upcoming' && styles.activeTab]}
//           onPress={() => onTabPress('Upcoming')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'Upcoming' && styles.activeTabText]}>Upcoming</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tab, selectedTab === 'History' && styles.activeTab]}
//           onPress={() => onTabPress('History')}
//         >
//           <Text style={[styles.tabText, selectedTab === 'History' && styles.activeTabText]}>History</Text>
//         </TouchableOpacity>
//       </View>

//       {isLoading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#3C3567" />
//         </View>
//       )}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible.isVisible}
//         onRequestClose={() => setModalVisible({ isVisible: false, values: {} })}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible({ isVisible: false, values: {} })}
//             >
//               <Icon name="close" style={styles.closeIcon} />
//             </TouchableOpacity>

//             {/* <Text style={styles.modalTitle}>Cancel Booking</Text> */}

//             <TextInput
//               value={reject}
//               onChangeText={setReject}
//               style={styles.inputField}
//               placeholder="Enter Reason for Cancellation"
//               multiline={true}
//               numberOfLines={3}
//             />
//             <TouchableOpacity
//               onPress={handleCancelBooking}
//               style={styles.confirmButton}
//               disabled={!reject.trim()}
//             >
//               <Text style={styles.confirmText}>Cancel Booking</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <FlatList
//         data={list}
//         keyExtractor={(item, index) => item.booking_id || index.toString()}
//         renderItem={renderBookingItem}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No {selectedTab} bookings available</Text>
//           </View>
//         }
//         refreshing={refreshing}
//         onRefresh={handleRefresh}
//         contentContainerStyle={{ flexGrow: 1 }}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#3C3567',
//     padding: 10,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//     elevation: 2,
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#3C3567',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#000',
//     fontWeight: '600',
//   },
//   activeTabText: {
//     color: '#3C3567',
//     fontWeight: 'bold',
//   },
//   card: {
//     height: 180,
//     backgroundColor: '#fff',
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 3,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     overflow: 'hidden',
//   },
//   rowContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     height: '100%',
//   },
//   image: {
//     width: 140,
//     resizeMode: 'contain',
//   },
//   divider: {
//     width: 1,
//     backgroundColor: '#ddd',
//     height: '100%',
//     marginHorizontal: 7,
//   },
//   textContainer: {
//     marginLeft: 7,
//     flex: 1,
//     marginTop: 0,
//     paddingRight: 10,
//   },
//   name: {
//     fontSize: 14,
//     color: 'black',
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   detail: {
//     fontSize: 12,
//     color: '#212121',
//     marginBottom: 3,
//   },
//   cancelledStatus: {
//     fontSize: 12,
//     color: '#E53935',
//     fontWeight: 'bold',
//     marginTop: 2,
//     marginBottom: 2,
//   },
//   cancelledStatusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   cancelIcon: {
//     marginRight: 5,
//   },
//   actionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   cancelButton: {
//     backgroundColor: '#E53935',
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   cancelText: {
//     color: '#fff',
//     fontWeight: '500',
//     fontSize: 12,
//   },
//   trackButton: {
//     backgroundColor: '#3C3567',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     marginVertical: -10,
//   },
//   trackText: {
//     color: '#fff',
//     fontWeight: '500',
//     fontSize: 12,
//   },
//   arrowButton: {
//     marginLeft: 10,
//   },
//   arrowIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyText: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#757575',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//     color: '#3C3567',
//   },
//   inputField: {
//     borderColor: '#ddd',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderRadius: 5,
//     minHeight: 80,
//     textAlignVertical: 'top',
//   },
//   confirmButton: {
//     backgroundColor: '#E53935',
//     padding: 12,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   confirmText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     zIndex: 1,
//   },
//   closeIcon: {
//     fontSize: 24,
//     color: '#000',
//   },
//   loadingContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     zIndex: 1,
//   },
// });

// export default Upcoming;

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../component/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient, postJWtHttpClient } from '../../services/api/axiosClient';
import { encryptPayload } from '../../Utils/EncryptionUtility';
import { BASE_URL, CANCELLATION } from '../../config/api-config';
import UpcomingApi from '../../services/api/upcoming';

const Upcoming = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [pageLimit] = useState(100);
  const [history, setHistory] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const [reject, setReject] = useState('');
  const [modalVisible, setModalVisible] = useState({ isVisible: false, values: {} });
  const [detailsModalVisible, setDetailsModalVisible] = useState({ isVisible: false, booking: null });
  const [list, setList] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const upcomingList = await UpcomingApi('upcoming', page, pageLimit);
      setUpcoming(upcomingList || []);
      if (selectedTab === 'Upcoming') {
        setList(upcomingList || []);
      }

      const historyList = await UpcomingApi('history', page, pageLimit);
      setHistory(historyList || []);
      if (selectedTab === 'History') {
        setList(historyList || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [page, selectedTab]);

  const handleRefresh = () => {
    setPage(1);
    setRefreshing(true);
    fetchData()
  };

  const onPressTrack = (item, index) => {
    if (selectedTab === 'Upcoming') {
      if (item.Bookingstatus === 'Confirmed' && 
          item.Track_chauffeur === 'Yes' && 
          (item.vehicle_no === null || item.vehicle_no === undefined)) {
        navigation.navigate('CorporateNavigator', {
          screen: 'Track',
          params: {
            item: item,
            index,
            pageName: "UP"
          }
        });
        console.log(index,"abc");
      } else {
        Alert.alert('Info', 'Tracking is only available for confirmed bookings with track_chauffeur enabled.');
      }
    } else {
      navigation.navigate('CorporateNavigator', {
        screen: 'Track',
        params: {
          item: item,
          index,
          pageName: "HIS",
          status: item?.feedback, 
          feedback_arr: item?.feedback_arr 
        }
      });
    }
  };

  const showDetails = (item) => {
    setDetailsModalVisible({ isVisible: true, booking: item });
  };

  const handleCancelBooking = async () => {
    const Cancellation = apiClient(BASE_URL + CANCELLATION);
    setIsLoading(true);
    try {
      const item = { ...modalVisible?.values };
      const userId = await AsyncStorage.getItem("user_id");
      if (!userId || !item?.booking_id) {
        console.error("User ID or Booking ID missing!");
        setIsLoading(false);
        return;
      }
      const MyPayLod = {
        "user_id": userId,
        "booking_number": item?.booking_id,
        "reasonforcancelation": reject,
        "requestdatetime": new Date().toISOString()
      };
      const encryptedPayLoad = encryptPayload(MyPayLod);
      const data = { request_data: decodeURIComponent(encryptedPayLoad) };

      console.log("Fetching Notifications:", data);

      let headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
      const response = await postJWtHttpClient(await Cancellation, '', null, data, headers);

      if (response && response.status === 200) {
        Alert.alert("Booking cancelled successfully");
        setModalVisible({ isVisible: false, values: {} });
        setReject('');
        await fetchData();
      } else {
        console.error("Failed to cancel booking:", response);
        Alert.alert("Error", "Failed to cancel booking. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      Alert.alert("Error", "An error occurred while cancelling your booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };
  const renderBookingItem = ({ item, index }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={styles.rowContainer}>
        <Image source={require('../../assets/cardemo.png')} style={styles.image} />
        <View style={styles.divider} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.Guestname}</Text>
          <Text style={styles.detail}>{item.vehiclerequested}</Text>
          <Text style={styles.detail}>{'Booked on: ' + formatDate(item.start_date)}</Text>
          <Text style={styles.detail}>{'Booking Id: ' + item.booking_id}</Text>
          <Text style={styles.detail}>
            {'Landmark : ' +
              (item.Reportingplace && item.Reportingplace.length > (selectedTab === 'Upcoming' ? 14 : 17)
                ? item.Reportingplace.substring(0, selectedTab === 'Upcoming' ? 14 : 17) + '...'
                : item.Reportingplace || 'N/A')}
          </Text>
          <Text style={styles.detail}>{'Reporting Time: ' + item.Reporingtime}</Text>
          {selectedTab === 'Upcoming' && item.Bookingstatus === 'Cancelled' && (
            <Text style={styles.cancelledStatus}>Booking Status: Cancelled</Text>
          )}
          <View style={styles.actionContainer}>
            {selectedTab === 'Upcoming' && item.Bookingstatus !== 'Cancelled' ? (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible({ isVisible: true, values: item })}
              >
                <Text style={styles.cancelText}>Cancel Ride</Text>
              </TouchableOpacity>
            ) : selectedTab === 'Upcoming' && item.Bookingstatus === 'Cancelled' && (
              <View style={styles.cancelledStatusContainer}>
                <Icon name="ban" size={14} color="#E53935" style={styles.cancelIcon} />
              </View>
            )}
            {/* Track button logic */}
            {selectedTab === 'Upcoming' && item.Bookingstatus !== 'Cancelled' && item.Track_chauffeur === 'Yes' && (
              <TouchableOpacity style={styles.trackButton} onPress={() => onPressTrack(item, index)}>
                <Text style={styles.trackText}>Track</Text>
              </TouchableOpacity>
            )}
            {selectedTab === 'History' && item.Track_chauffeur === 'Yes' && (
              <TouchableOpacity style={styles.trackButton} onPress={() => onPressTrack(item, index)}>
                <Text style={styles.trackText}>Track</Text>
              </TouchableOpacity>
            )}
            {selectedTab === 'History' && (
              <TouchableOpacity style={styles.detailsButton} onPress={() => showDetails(item, index)}>
                <Text style={styles.detailsText}>Show Details</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const onTabPress = (tab) => {
    setSelectedTab(tab);
    setList(tab === 'Upcoming' ? upcoming : history);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Bookings"
        leftIcon={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/ic_back_arrow_white_24.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}
      />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Upcoming' && styles.activeTab]}
          onPress={() => onTabPress('Upcoming')}
        >
          <Text style={[styles.tabText, selectedTab === 'Upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'History' && styles.activeTab]}
          onPress={() => onTabPress('History')}
        >
          <Text style={[styles.tabText, selectedTab === 'History' && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3C3567" />
        </View>
      )}

      {/* Cancel Booking Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.isVisible}
        onRequestClose={() => setModalVisible({ isVisible: false, values: {} })}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible({ isVisible: false, values: {} })}
            >
              <Icon name="close" style={styles.closeIcon} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Cancellation Reason</Text>

            <TextInput
              value={reject}
              onChangeText={setReject}
              style={styles.inputField}
              placeholder="Enter Reason for Cancellation"
              multiline={true}
              numberOfLines={3}
            />
            <TouchableOpacity
              onPress={handleCancelBooking}
              style={[styles.confirmButton, !reject.trim() && styles.disabledButton]}
              disabled={!reject.trim()}
            >
              <Text style={styles.confirmText}>Cancel Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Booking Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsModalVisible.isVisible}
        onRequestClose={() => setDetailsModalVisible({ isVisible: false, booking: null })}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.detailsModalContent]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setDetailsModalVisible({ isVisible: false, booking: null })}
            >
              <Icon name="close" style={styles.closeIcon} />
            </TouchableOpacity>

            <Text style={styles.detailsModalTitle}>Booking Details</Text>
            
            {detailsModalVisible.booking && (
              <ScrollView style={styles.detailsScrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.detailsHeaderContainer}>
                  <Image source={require('../../assets/cardemo.png')} style={styles.detailsImage} />
                  <Text style={styles.bookingIdText}>Booking ID: {detailsModalVisible.booking.booking_id}</Text>
                </View>
                
                <View style={styles.detailsSection}>
                  <Text style={styles.sectionTitle}>Guest Information</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Name:</Text>
                    <Text style={styles.detailValue}>{detailsModalVisible.booking.Guestname || 'N/A'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Mobile:</Text>
                    <Text style={styles.detailValue}>{detailsModalVisible.booking.Guestcontacto || 'N/A'}</Text>
                  </View>
                </View>
                
                <View style={styles.detailsSection}>
                  <Text style={styles.sectionTitle}>Trip Details</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Vehicle:</Text>
                    <Text style={styles.detailValue}>{detailsModalVisible.booking.vehiclerequested || 'N/A'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Vehicle Number:</Text>
                    <Text style={styles.detailValue}>{detailsModalVisible.booking.vehicle_no || 'N/A'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Trip Type:</Text>
                    <Text style={styles.detailValue}>{detailsModalVisible.booking.assignment || 'N/A'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Trip Date:</Text>
                    <Text style={styles.detailValue}>{formatDate(detailsModalVisible.booking.start_date)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status:</Text>
                    <Text style={[
                      styles.detailValue, 
                      detailsModalVisible.booking.Bookingstatus === 'Cancelled' && styles.cancelledText
                    ]}>
                      {detailsModalVisible.booking.Bookingstatus || 'N/A'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.detailsSection}>
                  <Text style={styles.sectionTitle}>Location Details</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Reporting Place:</Text>
                    <Text style={styles.detailValue}>{detailsModalVisible.booking.Reportingplace || 'N/A'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Reporting Time:</Text>
                    <Text style={styles.detailValue}>{detailsModalVisible.booking.Reporingtime || 'N/A'}</Text>
                  </View>
                </View>
                
                {detailsModalVisible.booking.remarks && (
                  <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Remarks</Text>
                    <Text style={styles.remarksText}>{detailsModalVisible.booking.remarks}</Text>
                  </View>
                )}
                
                {detailsModalVisible.booking.cancelreason && (
                  <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Cancellation Reason</Text>
                    <Text style={styles.remarksText}>{detailsModalVisible.booking.cancelreason}</Text>
                  </View>
                )}
                
                {/* Add some bottom padding for better scrolling */}
                <View style={styles.bottomPadding} />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <FlatList
        data={list}
        keyExtractor={(item, index) => item.booking_id || index.toString()}
        renderItem={renderBookingItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No {selectedTab} bookings available</Text>
          </View>
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#3C3567',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#3C3567',
    fontWeight: 'bold',
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  card: {
    height: 190, // Increased height to fit content
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  rowContainer: {
    flexDirection: 'row',
    height: '100%', // Changed from 80% to 100% to use full card height
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 100, // Slightly reduced width
    height: 100, // Slightly reduced height
    resizeMode: 'contain',
    alignSelf: 'center', // Center the image vertically
  },
  divider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    height: '90%',
    alignSelf: 'center', // Center the divider vertically
    marginHorizontal: 8,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  name: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 13,
    color: '#444',
    marginBottom: 3, // Slightly reduced margin
    lineHeight: 17, // Slightly reduced line height
  },
  cancelledStatus: {
    fontSize: 13,
    color: '#E53935',
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 3,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 6,
    paddingBottom: 3,
    gap:16
  },
  cancelButton: {
    backgroundColor: '#E53935',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  cancelText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  trackButton: {
    backgroundColor: '#3C3567',
    paddingVertical: 6, // Slightly reduced padding
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  trackText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  detailsButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 6, 
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  detailsText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#757575',
    lineHeight: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    width: '85%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
  },
  detailsModalContent: {
    width: '90%',
    maxHeight: '80%',
    padding: 0,
    paddingTop: 20,
    paddingBottom: 0,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3C3567',
  },
  detailsModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3C3567',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputField: {
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#E53935',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#e57373',
    opacity: 0.7,
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    padding: 5,
  },
  closeIcon: {
    fontSize: 24,
    color: '#333',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  },
  detailsScrollView: {
    paddingHorizontal: 15,
  },
  detailsHeaderContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  detailsImage: {
    width: 150,
    height: 80,
    resizeMode: 'contain',
  },
  bookingIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C3567',
    marginTop: 10,
  },
  detailsSection: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3C3567',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C3567',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    width: '40%',
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  cancelledText: {
    color: '#E53935',
    fontWeight: 'bold',
  },
  remarksText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  }
});

export default Upcoming;