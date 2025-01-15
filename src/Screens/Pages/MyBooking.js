// import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import CustomHeader from '../../ReusableBtn/CustomHeader'

// const MyBooking = () => {
//     const bookingStatus = [
        // { text :'Admin Approval' ,  icon : 'circle' },
        // { text :'Booking Confirmed' ,  icon : 'circle' },
        // { text :'Vehicle Assigned' ,  icon : 'circle-o' },
        // { text :'Journey Completed' ,  icon : 'circle-o' },
        
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomHeader from '../../ReusableBtn/CustomHeader';
import { Icon } from 'react-native-vector-icons/FontAwesome';

const MyBooking = () => {
  const bookingStatus = [
    { text :'Admin Approval' ,  icon : 'circle' },
    { text :'Booking Confirmed' ,  icon : 'circle' },
    { text :'Vehicle Assigned' ,  icon : 'circle-o' },
    { text :'Journey Completed' ,  icon : 'circle-o' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CustomHeader
          title="My Booking"
          iconPath={require('../../Assets/icbackarrow.png')}
          iconHeight={24}
          iconWidth={24}
        />
        <View style={styles.statusContainer}>
          {bookingStatus.map((status, index) => (
            <View key={index} style={styles.statusItem}>
              <Text style={styles.text}>{status.text}</Text>
              {/* <Icon style={styles.icon}>{status.icon}</Icon> */}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F3',
  },
  statusContainer: {
    marginTop: 100,
    paddingHorizontal: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,  // Adjust size as needed
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default MyBooking;
