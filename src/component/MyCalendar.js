import CalendarPicker from 'react-native-calendar-picker';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
const MyCalendar = () => {
  const today = new Date();

  const disablePastDates = date => {
    return date < today;
  };

  return <View style={styles.container}></View>;
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
