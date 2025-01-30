// Author: Ashutosh Rai
// Component: CustomCalender
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import CalendarPicker from "react-native-calendar-picker";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Icon package
import TimeTracker from './TimeTracker';
import CalendarTimePicker from './CalendarTimePicker';

const CustomCalender = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
  
    const handleDateSelect = (date) => {
      setSelectedDate(date);
      console.log("Selected Date: ", date);
    };
  
    const handleTimeSelect = (time) => {
      setSelectedTime(time);
      console.log("Selected Time: ", time);
    };
    const today = new Date();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/car.png')} />
                <Text style={styles.headerText}>
                    Select Date & Reporting Time
                </Text>
            </View>
            <CalendarTimePicker selectDate={handleDateSelect} selectTime={handleTimeSelect}/>

           
        </View>
    );
};

export default CustomCalender;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 8,
        paddingBottom: 10
    },
    header: {
        flexDirection: "row",
        marginStart: 20,
        marginTop: 20,
        alignItems: "center",

    },
    headerText: {
        fontFamily: 'Open Sans',
        fontSize: 14,
        lineHeight: 19,
        fontWeight: 'bold',
        color: '#3C3567',
        textDecorationLine: 'underline',
        marginStart: 20,
    },
    calendarWrapper: {
        alignSelf: "center",
        marginVertical: 10,
    },
    footer: {
        marginTop: 10,
    },
    footerText: {
        fontSize: 12,
        color: "#737373",
        textAlign: 'center',
        fontWeight: 'bold',
    },
   
    disabledDatesText: {
        color: '#d3d3d3', 
        textDecorationLine: 'line-through', 
    },

    disabledIconWrapper: {
        marginHorizontal: 42
    },
});
