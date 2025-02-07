import CalendarPicker from 'react-native-calendar-picker';
// import { Ionicons } from '@expo/vector-icons'; // Icons for previous/next
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import React, { useState, useEffect, useRef  } from 'react';
const MyCalendar = () => {
  // Get today's date
  const today = new Date();

  // Function to disable past dates
  const disablePastDates = (date) => {
    return date < today; // Disable dates before today
  };

  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MyCalendar;
