// Reshab Kumar Pandey
//Notifications.js


import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, Dimensions, SafeAreaView,
  TouchableOpacity, FlatList, RefreshControl,
  useColorScheme,
  StatusBar
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import NotificationService from '../services/api/Notification';

const { height, width } = Dimensions.get('screen');

const NotificationScreen = ({ navigation }) => {
     const colorScheme = useColorScheme();
        const isDarkMode = colorScheme === 'dark';
        
        const backgroundStyle = {
          backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        };
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
        console.error(" setUnreadCount is not a function! It might be undefined or null.");
        return;
      }
  
      await NotificationService.clearNotifications(page,pageLimit,setNotification, setUnreadCount);
    } catch (error) {
      console.error(" Error clearing notifications:", error);
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
    
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
             <StatusBar
                                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                                  backgroundColor={backgroundStyle.backgroundColor}
                                />
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
            <Text style={styles.actionButtonText}>Read All</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4', 
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#4A3F7A',
    height: 55, 
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },

  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize', 
    letterSpacing: 0.3,
  },

  cardStyle: {
    marginVertical: 7, 
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8, 
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },

  textColor: {
    fontSize: 16, 
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },

  icon: {
    width: 20, 
    height: 20,
    marginHorizontal: 5,
    tintColor: '#4A3F7A',
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  emptyText: {
    fontSize: 16,
    color: '#777',
    fontStyle: 'italic',
  },

  actionButtonContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#F4F4F4', 
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },

  actionButton: {
    backgroundColor: '#4A3F7A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },

  actionButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.2,
  },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8, 
  },

  footerText: {
    fontSize: 12, 
    color: '#777',
    marginHorizontal: 3,
  },

  rejectionText: {
    color: '#C62828', 
    fontWeight: '500',
    fontSize: 15,
    marginTop: 3,
  },

  confirmationText: {
    color: '#2E7D32', 
    fontSize: 15,
    marginTop: 3,
  },

  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },

  flex1: {
    flex: 1,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
  },

  cardAlternate: {
    backgroundColor: '#F9F9F9', 
  },
});


export default NotificationScreen;
