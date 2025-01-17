// Author: Ashutosh Rai
// Component: Booking Confirmation
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CalendarPicker from "react-native-calendar-picker";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Icon package
import TimeTracker from './TimeTracker';

const CalendarTimePicker = () => {
      const [selected, setSelected] = useState('');
     
        const disablePastDates = (date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison
            return date < today; // Return true for dates in the past
        };
        const today = new Date();
    return (
        <View>
            <View style={styles.calendarWrapper}>
                <CalendarPicker
                    scrollable={true}
                    horizontal={true}
                    width={410}
                    height={300}
                    scrollDecelarationRate={2}
                    initialDate={today}
                    onDateChange={(date) => setSelected(date)}
                    previousComponent={
                        <View style={styles.disabledIconWrapper}>
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color="#D3D3D3"
                            />
                        </View>
                    }
                    nextComponent={
                        <View style={styles.disabledIconWrapper}>
                            <Ionicons
                                name="chevron-forward"
                                size={24}
                                color="#D3D3D3" 
                            />
                        </View>
                    }
                    disabledDates={disablePastDates}
                // disabledDatesTextStyle={styles.disabledDatesText}
                />
            </View>
            <TimeTracker />
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Slide to Select Date and Time
                </Text>
            </View>
        </View>
    )
}

export default CalendarTimePicker

const styles = StyleSheet.create({
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
        color: '#d3d3d3', // Grey color for disabled dates
        textDecorationLine: 'line-through', // Optional: strike-through effect
    },

    disabledIconWrapper: {
        marginHorizontal: 42
    },
})