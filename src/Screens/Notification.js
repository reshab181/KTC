// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet, Text, View, Image, Dimensions, SafeAreaView,
//   TouchableOpacity, FlatList, RefreshControl
// } from 'react-native';
// import { Card } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import NotificationService from '../services/api/Notification';

// const { height, width } = Dimensions.get('screen');

// const Notification = ({ navigation }) => {
//   const [unreadMessageCount, setUnreadCount] = useState(0);
//   const [notificationapp, setNotification] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pageLimit] = useState(10);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(false); 

//   useEffect(() => {
//     fetchNotifications();
//   }, [page]);

//   // const fetchNotifications = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const data = await NotificationService.fetchNotifications(
//   //       null,
//   //       setPage,
//   //       pageLimit,
//   //       setNotification,
//   //       setUnreadCount,
//   //       setLoading
//   //     );

      
//   //     if (data && data.unreadCount !== undefined) {
//   //       setUnreadCount(data.unreadCount);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching notifications:", error);
//   //   } finally {
//   //     setLoading(false);
//   //     setRefreshing(false);
//   //   }
//   // };


//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);
      
//       const data = await NotificationService.fetchNotifications(
//         null,
//         setPage,
//         pageLimit,
//         setNotification,
//         setUnreadCount,
//         setLoading
//       );
  
//       console.log("Fetched Notifications:", data);
  
//       if (data) {
//         if (Array.isArray(data.notification_data)) {
//           setNotification(data.notification_data);  
//         } else {
//           console.warn("Notifications is not an array:", data.notification_data);
//           setNotification([]); 
//         }
  
//         if (data.unreadCount !== undefined) {
//           setUnreadCount(data.unreadCount);
//         }
//       } else {
//         console.warn("No notifications found");
//         setNotification([]); 
//       }
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };
  
//   console.log(notificationapp,"================Notification");
  

//   const clearAllNotifications = async () => {
//     try {
//       await NotificationService.clearNotifications(setNotification, setUnreadCount);
//       setUnreadCount(0); 
//     } catch (error) {
//       console.error('Error clearing notifications:', error);
//     }
//   };

//   const getNotificationIcon = (type) => {
//     return require('../assets/info1.png');
//   };

//   const getCardStyle = (index) => {
//     return [
//       styles.cardStyle,
//       index % 2 === 1 ? styles.cardAlternate : null
//     ];
//   };

//   const getMessageStyle = (status) => {
//     return status === '0' ? styles.rejectionText : styles.confirmationText;
//   };

//   const renderNotificationItem = ({ item, index }) => (
//     <TouchableOpacity>
//       <Card style={getCardStyle(index)}>
//         <View style={styles.cardContent}>
//           <View style={styles.flex1}>
//             <View style={styles.flexDirectionRow}>
//               <Image source={getNotificationIcon(item.type)} style={styles.icon} />
//               <Text style={styles.textColor}>{item.type || "Notification"}</Text>
//             </View>
//             <Text style={getMessageStyle(item.status)}>
//               {item.message_data || "No message available"}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.cardFooter}>
//           <Image source={require('../assets/calendar.png')} style={styles.icon} />
//           <Text style={styles.footerText}>{item.notification_date || "No Date"}</Text>
//           <Image source={require('../assets/watch.png')} style={styles.icon} />
//           <Text style={styles.footerText}>{item.notification_time || "No Time"}</Text>
//         </View>
//       </Card>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
//           <AntDesign name="arrowleft" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Notifications</Text>

       
//         <View style={{ position: 'relative' }}>
//           <Icon name="notifications" size={24} color="#fff" style={{ marginRight: 10 }} />
//           {/* {unreadMessageCount > 0 && (
//             <View style={styles.unreadCountWrapper}>
//               <Text style={styles.unreadCountText}>{unreadMessageCount}</Text>
//             </View>
//           )} */}
//         </View>
//       </View>

//       <FlatList
//         data={notificationapp}
//         renderItem={renderNotificationItem}
//         keyExtractor={(item, index) => item.notification_id?.toString() || `key-${index}`}
//         contentContainerStyle={styles.scrollView}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={() => {
//             setRefreshing(true);
//             fetchNotifications();
//           }} 
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No notifications available</Text>
//           </View>
//         }
//       />

//       {notificationapp.length > 0 && (
//         <View style={styles.actionButtonContainer}>
//           <TouchableOpacity onPress={clearAllNotifications} style={styles.actionButton}>
//             <Text style={styles.actionButtonText}>Read All</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
//   header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: '#3C3567', height: 50 },
//   headerTitle: { fontSize: 20, color: '#fff', fontWeight: '500' },
//   unreadCountWrapper: { 
//     position: 'absolute', top: -5, right: -5, backgroundColor: 'red', 
//     borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2 
//   },
//   unreadCountText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
//   cardStyle: { borderRadius: 7, margin: 10, backgroundColor: '#fff', elevation: 3 },
//   flex1: { flex: 1 },
//   flexDirectionRow: { flexDirection: 'row', alignItems: 'center' },
//   icon: { width: 24, height: 24, marginRight: 8 },
//   textColor: { color: '#333', fontSize: 16, fontWeight: 'bold' },
//   rejectionText: { color: 'red', fontSize: 14 },
//   confirmationText: { color: 'green', fontSize: 14 },
//   cardContent: { flexDirection: 'row', padding: 10 },
//   cardFooter: { flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between' },
//   footerText: { fontSize: 12, color: '#666' },
//   scrollView: { flexGrow: 1, paddingBottom: 20 },
//   emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
//   emptyText: { fontSize: 16, color: '#666' },
//   actionButtonContainer: { padding: 15, alignItems: 'center' },
//   actionButton: { backgroundColor: '#3C3567', padding: 10, borderRadius: 5 },
//   actionButtonText: { color: '#fff', fontSize: 16 }
// });

// export default Notification;


import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, SafeAreaView,
  TouchableOpacity, FlatList, RefreshControl
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import NotificationService from '../services/api/Notification';

const { height, width } = Dimensions.get('screen');

const NotificationScreen = ({ navigation }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const [notificationList, setNotification] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLimit] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    fetchNotifications();
  }, [page]);

  

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      await NotificationService.fetchNotifications(
        null,
        page,
        pageLimit,
        setNotification,
        setUnreadCount,
        setLoading
      );
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  console.log(setUnreadCount,"================================"); 


  const clearAllNotifications = async () => {
    try {
      console.log("setUnreadCount type:", typeof setUnreadCount); 
      console.log("setUnreadCount function reference:", setUnreadCount);
  
      if (typeof setUnreadCount !== 'function') {
        console.error("❌ setUnreadCount is not a function! It might be undefined or null.");
        return;
      }
  
      await NotificationService.clearNotifications(setNotification, setUnreadCount);
    } catch (error) {
      console.error("❌ Error clearing notifications:", error);
    }
  };

  const getNotificationIcon = () => require('../assets/info1.png');

  const getCardStyle = (index) => [styles.cardStyle, index % 2 === 1 ? styles.cardAlternate : null];

  const getMessageStyle = (status) => status === '0' ? styles.rejectionText : styles.confirmationText;

  const renderNotificationItem = ({ item, index }) => (
    <TouchableOpacity>
      <Card style={getCardStyle(index)}>
        <View style={styles.cardContent}>
          <View style={styles.flex1}>
            <View style={styles.flexDirectionRow}>
              <Image source={getNotificationIcon()} style={styles.icon} />
              <Text style={styles.textColor}>{item.type || "Notification"}</Text>
            </View>
            <Text style={getMessageStyle(item.status)}>
              {item.message_data || "No message available"}
            </Text>
          </View>
        </View>
        {/* <View style={styles.cardFooter}>
          <Image source={require('../assets/calendar.png')} style={styles.icon} />
          <Text style={styles.footerText}>{item.notification_date || "No Date"}</Text>
          <Image source={require('../assets/watch.png')} style={styles.icon} />
          <Text style={styles.footerText}>{item.notification_time || "No Time"}</Text>
        </View> */}
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Icon name="notifications" size={24} color="#fff" style={{ marginRight: 10 }} />
      </View>

      <FlatList
        data={notificationList}
        renderItem={renderNotificationItem}
        keyExtractor={(item, index) => item.notification_id?.toString() || `key-${index}`}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {
            setRefreshing(true);
            fetchNotifications();
          }} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications available</Text>
          </View>
        }
      />

      {notificationList.length > 0 && (
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity onPress={clearAllNotifications} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EDEDED', 
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#4A3F7A', 
    height: 60,
    elevation: 4, 
  },

  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1, 
  },

  cardStyle: {
    marginVertical: 8,
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5, 
  },

  textColor: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#333',
  },

  icon: {
    width: 22,
    height: 22,
    marginHorizontal: 6,
    tintColor: '#4A3F7A', 
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },

  emptyText: {
    fontSize: 18,
    color: '#888',
    fontStyle: 'italic',
  },

  actionButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },

  actionButton: {
    backgroundColor: '#4A3F7A',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  footerText: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 5,
  },

  rejectionText: {
    color: '#D9534F', // Soft red for rejection messages
    fontWeight: 'bold',
    fontSize: 16,
  },

  confirmationText: {
    color: '#5CB85C', // Soft green for confirmations
    fontWeight: 'bold',
    fontSize: 16,
  },

  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  flex1: {
    flex: 1,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});


export default NotificationScreen;
