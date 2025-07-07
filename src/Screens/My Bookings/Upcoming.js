// Reshab Kumar Pandey
// Upcoming.js

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
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import CustomHeader from '../../component/CustomHeader';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { apiClient, postJWtHttpClient } from '../../services/api/axiosClient';
// import { encryptPayload } from '../../Utils/EncryptionUtility';
// import { BASE_URL, CANCELLATION } from '../../config/api-config';
// import UpcomingApi from '../../services/api/upcoming';
// import { useRoute } from '@react-navigation/native';

// const Upcoming = ({ navigation }) => {
//   const route = useRoute();
//   const { eloc } = route?.params || {};
//   const [isLoading, setIsLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [page, setPage] = useState(1);
//   const [pageLimit] = useState(100);
//   const [history, setHistory] = useState([]);
//   const [upcoming, setUpcoming] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('Upcoming');
//   const [reject, setReject] = useState('');
//   const [modalVisible, setModalVisible] = useState({ isVisible: false, values: {} });
//   const [detailsModalVisible, setDetailsModalVisible] = useState({ isVisible: false, booking: null });
//   const [list, setList] = useState([]);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const upcomingList = await UpcomingApi('upcoming', page, pageLimit);
//       setUpcoming(upcomingList || []);
//       if (selectedTab === 'Upcoming') {
//         setList(upcomingList || []);
//       }

//       const historyList = await UpcomingApi('history', page, pageLimit);
//       setHistory(historyList || []);
//       if (selectedTab === 'History') {
//         setList(historyList || []);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       Alert.alert('Error', 'Failed to fetch data. Please try again.');
//     } finally {
//       setIsLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(); 
//   }, [page, selectedTab]);

//   const handleRefresh = () => {
//     setPage(1);
//     setRefreshing(true);
//     fetchData()
//   };
//   const elocValue = route?.params?.eloc;
//   console.log(elocValue,"123");
//   const onPressTrack = (item, index) => {
//     const elocValue = route?.params?.eloc;
//     console.log(elocValue);
    
//     if (selectedTab === 'Upcoming') {
//       if (item.Bookingstatus === 'Confirmed' && 
//           item.Track_chauffeur === 'Yes' 
//          ) {
//         navigation.navigate('CorporateNavigator', {
//           screen: 'Track',
//           params: {
//             item: item,
//             index,
//             pageName: "UP",
//             eloc:elocValue
//           }
//         });
//         console.log(eloc,"eloc fetched");
        
//         console.log(index,"abc");
//       } else {
//         Alert.alert('Info', 'Tracking is only available for confirmed bookings with track chauffeur enabled.');
//       }
//     } else {
//       navigation.navigate('CorporateNavigator', {
//         screen: 'Track',
//         params: {
//           item: item,
//           index,
//           pageName: "HIS",
//           status: item?.feedback, 
//           feedback_arr: item?.feedback_arr 
//         }
//       });
//     }
//   };

//   const showDetails = (item) => {
//     setDetailsModalVisible({ isVisible: true, booking: item });
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
//       const encryptedPayLoad = encryptPayload(MyPayLod);
//       const data = { request_data: decodeURIComponent(encryptedPayLoad) };

//       console.log("Fetching Notifications:", data);

//       let headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
//       const response = await postJWtHttpClient(await Cancellation, '', null, data, headers);

//       if (response && response.status === 200) {
//         Alert.alert("Booking cancelled successfully");
//         setModalVisible({ isVisible: false, values: {} });
//         setReject('');
//         await fetchData();
//       } else {
//         console.error("Failed to cancel booking:", response);
//         Alert.alert("Error", "Failed to cancel booking. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error cancelling booking:", error);
//       Alert.alert("Error", "An error occurred while cancelling your booking. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatDate = (timestamp) => {
//     if (!timestamp) return 'N/A';
//     return new Date(timestamp * 1000).toLocaleDateString();
//   };
//   const renderBookingItem = ({ item, index }) => (
//     <TouchableOpacity style={styles.card} activeOpacity={0.9}>
//       <View style={styles.rowContainer}>
//         <Image source={require('../../assets/cardemo.png')} style={styles.image} />
//         <View style={styles.divider} />
//         <View style={styles.textContainer}>
//           <Text style={styles.name}>{item.Guestname}</Text>
//           <Text style={styles.detail}>{item.vehiclerequested}</Text>
//           <Text style={styles.detail}>{'Booked on: ' + formatDate(item.start_date)}</Text>
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
//                 style={styles.cancelButton}
//                 onPress={() => {
//                   Alert.alert(
//                     'Cancel Ride',
//                     'Are you sure you want to cancel this ride?',
//                     [
//                       {
//                         text: 'Cancel',
//                         style: 'cancel',
//                       },
//                       {
//                         text: 'OK',
//                         onPress: () => setModalVisible({ isVisible: true, values: item }),
//                       },
//                     ],
//                     { cancelable: false }
//                   );
//                 }}
//               >
//                 <Text style={styles.cancelText}>Cancel Ride</Text>
//               </TouchableOpacity>
//             ) : selectedTab === 'Upcoming' && item.Bookingstatus === 'Cancelled' && (
//               <View style={styles.cancelledStatusContainer}>
//                 <Icon name="ban" size={14} color="#E53935" style={styles.cancelIcon} />
//               </View>
//             )}
//             {/* Track button logic */}
//             {selectedTab === 'Upcoming' && item.Bookingstatus !== 'Cancelled' && item.Track_chauffeur === 'Yes' && (
//               <TouchableOpacity style={styles.trackButton} onPress={() => onPressTrack(item, index)}>
//                 <Text style={styles.trackText}>Track</Text>
//               </TouchableOpacity>
//             )}
//             {selectedTab === 'History' && item.Track_chauffeur === 'Yes' && (
//               <TouchableOpacity style={styles.trackButton} onPress={() => onPressTrack(item, index)}>
//                 <Text style={styles.trackText}>Track</Text>
//               </TouchableOpacity>
//             )}
//             {selectedTab === 'History' && (
//               <TouchableOpacity style={styles.detailsButton} onPress={() => showDetails(item, index)}>
//                 <Text style={styles.detailsText}>Show Details</Text>
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
//     <SafeAreaView style={styles.container}>
//       <CustomHeader
//         title="Bookings"
//         leftIcon={() => (
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image
//               source={require('../../assets/ic_back_arrow_white_24.png')}
//               style={styles.backIcon}
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

//       {/* Cancel Booking Modal */}
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

//             <Text style={styles.modalTitle}>Cancellation Reason</Text>

//             <TextInput
//               value={reject}
//               onChangeText={setReject}
//               style={[styles.inputField, { color: '#000' }]}
//               placeholder="Enter Reason for Cancellation"
//               multiline={true}
//               numberOfLines={3}
//             />
//             <TouchableOpacity
//               onPress={handleCancelBooking}
//               style={[styles.confirmButton, !reject.trim() && styles.disabledButton]}
//               disabled={!reject.trim()}
//             >
//               <Text style={styles.confirmText}>Cancel Booking</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Booking Details Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={detailsModalVisible.isVisible}
//         onRequestClose={() => setDetailsModalVisible({ isVisible: false, booking: null })}
//       >
//         <View style={styles.modalContainer}>
//           <View style={[styles.modalContent, styles.detailsModalContent]}>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setDetailsModalVisible({ isVisible: false, booking: null })}
//             >
//               <Icon name="close" style={styles.closeIcon} />
//             </TouchableOpacity>

//             <Text style={styles.detailsModalTitle}>Booking Details</Text>
            
//             {detailsModalVisible.booking && (
//               <ScrollView style={styles.detailsScrollView} showsVerticalScrollIndicator={false}>
//                 <View style={styles.detailsHeaderContainer}>
//                   <Image source={require('../../assets/cardemo.png')} style={styles.detailsImage} />
//                   <Text style={styles.bookingIdText}>Booking ID: {detailsModalVisible.booking.booking_id}</Text>
//                 </View>
                
//                 <View style={styles.detailsSection}>
//                   <Text style={styles.sectionTitle}>Guest Information</Text>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Name:</Text>
//                     <Text style={styles.detailValue}>{detailsModalVisible.booking.Guestname || 'N/A'}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Mobile:</Text>
//                     <Text style={styles.detailValue}>{detailsModalVisible.booking.Guestcontacto || 'N/A'}</Text>
//                   </View>
//                 </View>
                
//                 <View style={styles.detailsSection}>
//                   <Text style={styles.sectionTitle}>Trip Details</Text>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Vehicle:</Text>
//                     <Text style={styles.detailValue}>{detailsModalVisible.booking.vehiclerequested || 'N/A'}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Vehicle Number:</Text>
//                     <Text style={styles.detailValue}>{detailsModalVisible.booking.vehicle_no || 'N/A'}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Trip Type:</Text>
//                     <Text style={styles.detailValue}>{detailsModalVisible.booking.assignment || 'N/A'}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Trip Date:</Text>
//                     <Text style={styles.detailValue}>{formatDate(detailsModalVisible.booking.start_date)}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Status:</Text>
//                     <Text style={[
//                       styles.detailValue, 
//                       detailsModalVisible.booking.Bookingstatus === 'Cancelled' && styles.cancelledText
//                     ]}>
//                       {detailsModalVisible.booking.Bookingstatus || 'N/A'}
//                     </Text>
//                   </View>
//                 </View>
                
//                 <View style={styles.detailsSection}>
//                   <Text style={styles.sectionTitle}>Location Details</Text>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Reporting Place:</Text>
//                     <Text style={styles.detailValue}>{detailsModalVisible.booking.Reportingplace || 'N/A'}</Text>
//                   </View>
//                   <View style={styles.detailRow}>
//                     <Text style={styles.detailLabel}>Reporting Time:</Text>
//                     <Text style={styles.detailValue}>{detailsModalVisible.booking.Reporingtime || 'N/A'}</Text>
//                   </View>
//                 </View>
                
//                 {detailsModalVisible.booking.remarks && (
//                   <View style={styles.detailsSection}>
//                     <Text style={styles.sectionTitle}>Remarks</Text>
//                     <Text style={styles.remarksText}>{detailsModalVisible.booking.remarks}</Text>
//                   </View>
//                 )}
                
//                 {detailsModalVisible.booking.cancelreason && (
//                   <View style={styles.detailsSection}>
//                     <Text style={styles.sectionTitle}>Cancellation Reason</Text>
//                     <Text style={styles.remarksText}>{detailsModalVisible.booking.cancelreason}</Text>
//                   </View>
//                 )}
                
//                 {/* Add some bottom padding for better scrolling */}
//                 <View style={styles.bottomPadding} />
//               </ScrollView>
//             )}
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
//         contentContainerStyle={styles.listContainer}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   backIcon: {
//     width: 24,
//     height: 24,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.5,
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   activeTab: {
//     borderBottomWidth: 3,
//     borderBottomColor: '#3C3567',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   activeTabText: {
//     color: '#3C3567',
//     fontWeight: 'bold',
//   },
//   listContainer: {
//     flexGrow: 1,
//     paddingBottom: 10,
//   },
//   card: {
//     height: 190, // Increased height to fit content
//     backgroundColor: '#fff',
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   rowContainer: {
//     flexDirection: 'row',
//     height: '100%', 
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//   },
//   image: {
//     width: 100, 
//     height: 100, 
//     resizeMode: 'contain',
//     alignSelf: 'center', 
//   },
//   divider: {
//     width: 1,
//     backgroundColor: '#E0E0E0',
//     height: '90%',
//     alignSelf: 'center',
//     marginHorizontal: 8,
//   },
//   textContainer: {
//     flex: 1,
//     paddingRight: 10,
//     justifyContent: 'space-between',
//     paddingVertical: 5,
//   },
//   name: {
//     fontSize: 15,
//     color: '#000',
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   detail: {
//     fontSize: 13,
//     color: '#444',
//     marginBottom: 3, 
//     lineHeight: 17, 
//   },
//   cancelledStatus: {
//     fontSize: 13,
//     color: '#E53935',
//     fontWeight: 'bold',
//     marginTop: 3,
//     marginBottom: 3,
//   },
//   actionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     marginTop: 6,
//     paddingBottom: 3,
//     gap:16
//   },
//   cancelButton: {
//     backgroundColor: '#E53935',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     marginRight: 10,
//   },
//   cancelText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 12,
//   },
//   trackButton: {
//     backgroundColor: '#3C3567',
//     paddingVertical: 6, 
//     paddingHorizontal: 12,
//     borderRadius: 6,
//   },
//   trackText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 12,
//   },
//   detailsButton: {
//     backgroundColor: '#2E7D32',
//     paddingVertical: 6, 
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     marginLeft: 10,
//   },
//   detailsText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 12,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 30,
//   },
//   emptyText: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#757575',
//     lineHeight: 24,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.6)',
//   },
//   modalContent: {
//     width: '85%',
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     elevation: 5,
//   },
//   detailsModalContent: {
//     width: '90%',
//     maxHeight: '80%',
//     padding: 0,
//     paddingTop: 20,
//     paddingBottom: 0,
//     borderRadius: 12,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#3C3567',
//   },
//   detailsModalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#3C3567',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   inputField: {
//     borderColor: '#ddd',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 8,
//     minHeight: 100,
//     textAlignVertical: 'top',
//     fontSize: 14,
//   },
//   confirmButton: {
//     backgroundColor: '#E53935',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   disabledButton: {
//     backgroundColor: '#e57373',
//     opacity: 0.7,
//   },
//   confirmText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     zIndex: 1,
//     padding: 5,
//   },
//   closeIcon: {
//     fontSize: 24,
//     color: '#333',
//   },
//   loadingContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     zIndex: 1,
//   },
//   detailsScrollView: {
//     paddingHorizontal: 15,
//   },
//   detailsHeaderContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingTop: 10,
//   },
//   detailsImage: {
//     width: 150,
//     height: 80,
//     resizeMode: 'contain',
//   },
//   bookingIdText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#3C3567',
//     marginTop: 10,
//   },
//   detailsSection: {
//     marginBottom: 20,
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     borderRadius: 8,
//     borderLeftWidth: 4,
//     borderLeftColor: '#3C3567',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#3C3567',
//     marginBottom: 12,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   detailLabel: {
//     width: '40%',
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#555',
//   },
//   detailValue: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333',
//   },
//   cancelledText: {
//     color: '#E53935',
//     fontWeight: 'bold',
//   },
//   remarksText: {
//     fontSize: 14,
//     color: '#333',
//     lineHeight: 20,
//   },
//   bottomPadding: {
//     height: 20,
//   }
// });

// export default Upcoming;
import React, { useEffect, useState, useRef } from 'react';
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
  Dimensions,
  Platform, PermissionsAndroid,Linking,
  StatusBar,
  useColorScheme
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../component/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient, postJWtHttpClient } from '../../services/api/axiosClient';
import { encryptPayload } from '../../Utils/EncryptionUtility';
import { BASE_URL, CANCELLATION } from '../../config/api-config';
import UpcomingApi from '../../services/api/upcoming';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Upcoming = ({ navigation }) => {
     const colorScheme = useColorScheme();
        const isDarkMode = colorScheme === 'dark';
        
        const backgroundStyle = {
          backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        };
  const route = useRoute();
  const { eloc } = route?.params || {};
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
  
  // Ref to track if we're doing a silent update
  const isSilentUpdate = useRef(false);

  // Main fetch function
  const fetchData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    
    try {
      if (selectedTab === 'Upcoming' || silent) {
        const upcomingList = await UpcomingApi('upcoming', page, pageLimit);
        
        // Check if we need to update state - compare with existing data
        if (JSON.stringify(upcomingList) !== JSON.stringify(upcoming)) {
          setUpcoming(upcomingList || []);
          if (selectedTab === 'Upcoming') {
            setList(upcomingList || []);
          }
        }
      }
      
      if (selectedTab === 'History' && !silent) {
        const historyList = await UpcomingApi('history', page, pageLimit);
        setHistory(historyList || []);
        if (selectedTab === 'History') {
          setList(historyList || []);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (!silent) {
        Alert.alert('Error', 'Failed to fetch data. Please try again.');
      }
    } finally {
      if (!silent) {
        setIsLoading(false);
        setRefreshing(false);
      }
    }
  };

  // Silent background update function
  const silentUpdate = async () => {
    isSilentUpdate.current = true;
    await fetchData(true);
    isSilentUpdate.current = false;
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [page, selectedTab]);

  // Background polling for updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedTab === 'Upcoming') {
        silentUpdate();
      }
    }, 15000);
    
    return () => clearInterval(interval);
  }, [selectedTab, upcoming]);

  
  const handleRefresh = () => {
    setPage(1);
    setRefreshing(true);
    fetchData();
  };
  
  // const elocValue = route?.params?.eloc;
  
  const onPressTrack = (item, index) => {
    const elocValue = route?.params?.eloc;
    console.log(elocValue,"abc");
    
    
    if (selectedTab === 'Upcoming') {
      if (item.Bookingstatus === 'Confirmed' && 
          item.Track_chauffeur === 'Yes' 
         ) {
        navigation.navigate('CorporateNavigator', {
          screen: 'Track',
          params: {
            item: item,
            index,
            pageName: "UP",
            eloc: elocValue
          }
        });
      } else {
        Alert.alert('Info', 'Tracking is only available for confirmed bookings with track chauffeur enabled.');
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

  
    const onCallCLick = async (item) => {
      console.log('onCallCLick called');
      let phone = null;
    
      if (item.call_masking === 'Yes' && item.drdNumber) {
        phone = item.drdNumber;
        console.log('Call masking active. Calling via masked number:', phone);
      } else {
        Alert.alert('NUMBER NOT AVAILABLE');
        console.log('No phone number available.');
        return;
      }
  
      phone = phone.replace(/\s+/g, '');
      
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            {
              title: 'Phone Call Permission',
              message: 'App needs access to make calls',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission Denied', 'Cannot make calls without permission');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
    
      
      let phoneNumber = Platform.OS === 'android' ? `tel:${phone}` : `telprompt:${phone}`;
    
      // Open phone app
      Linking.openURL(phoneNumber)
        .then(() => console.log('Phone app opened successfully'))
        .catch(err => {
          console.error('Error opening phone app:', err);
          Alert.alert('Error', 'Could not open phone app');
        });
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
  
  const renderBookingItem = ({ item, index }) => {
    // Calculate if track button should be visible
    const showTrackButton = 
      (selectedTab === 'Upcoming' && 
       item.Bookingstatus === 'Confirmed' && 
       item.Track_chauffeur === 'Yes') || 
      (selectedTab === 'History' && 
       item.Track_chauffeur === 'Yes');
    
    // Calculate if cancel button should be visible
    const showCancelButton = 
      selectedTab === 'Upcoming' && 
      item.Bookingstatus !== 'Cancelled';


      const showCallButton = 
      selectedTab === 'Upcoming' &&
      item.Bookingstatus === 'Confirmed' &&
      item.vehicle_no && // Check if vehicle is assigned
      item.call_masking === 'Yes' &&
      item.drdNumber;
    
    return (
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
              {showCancelButton && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    Alert.alert(
                      'Cancel Ride',
                      'Are you sure you want to cancel this ride?',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => setModalVisible({ isVisible: true, values: item }),
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                >
                  <Text style={styles.cancelText}>Cancel Ride</Text>
                </TouchableOpacity>
              )}
              
              {selectedTab === 'Upcoming' && item.Bookingstatus === 'Cancelled' && (
                <View style={styles.cancelledStatusContainer}>
                  <Icon name="ban" size={14} color="#E53935" style={styles.cancelIcon} />
                  <Text style={styles.cancelledStatusText}>Cancelled</Text>
                </View>
              )}
              
              {showTrackButton && (
                <TouchableOpacity 
                  style={styles.trackButton} 
                  onPress={() => onPressTrack(item, index)}
                >
                  <Text style={styles.trackText}>Track</Text>
                </TouchableOpacity>
              )}
                {showCallButton && (
                <TouchableOpacity 
                  style={styles.callButton} 
                  onPress={() => onCallCLick(item)}
                >
                  <Icon name="phone" size={12} color="#fff" style={styles.callIcon} />
                  <Text style={styles.callText}>Call Driver</Text>
                </TouchableOpacity>
              )}
              {selectedTab === 'History' && (
                <TouchableOpacity 
                  style={styles.detailsButton} 
                  onPress={() => showDetails(item, index)}
                >
                  <Text style={styles.detailsText}>Show Details</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const onTabPress = (tab) => {
    setSelectedTab(tab);
    setList(tab === 'Upcoming' ? upcoming : history);
  };

  return (
    <SafeAreaView style={styles.container}>
             <StatusBar
                                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                                  backgroundColor={backgroundStyle.backgroundColor}
                                />
      <CustomHeader
        title="Bookings"
        leftIcon={() => (
          // <TouchableOpacity onPress={() => navigation.goBack()}>
          <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: "CorporateHomeScreen"}], 
            });
          }}
        >
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

      {isLoading && !isSilentUpdate.current && (
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
              style={[styles.inputField, { color: '#000' }]}
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
    tintColor: '#fff'
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
    minHeight: 190, 
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
    padding: 10,
  },
  image: {
    width: 100, 
    height: 100, 
    resizeMode: 'contain',
    alignSelf: 'center', 
  },
  divider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    height: '90%',
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  textContainer: {
    flex: 1,
    paddingRight: 5,
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
    marginBottom: 3, 
    lineHeight: 17, 
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
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 6,
    paddingBottom: 5,
  },
  cancelButton: {
    backgroundColor: '#E53935',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 5, 
  },
  cancelText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  trackButton: {
    backgroundColor: '#3C3567',
    paddingVertical: 6, 
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 5, 
  },
  callButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8, 
    marginRight: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  callIcon: {
    marginRight: 5,
  },
  callText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
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
    marginBottom: 5,
  },
  detailsText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  cancelledStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cancelIcon: {
    marginRight: 5,
  },
  cancelledStatusText: {
    color: '#E53935',
    fontWeight: 'bold',
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