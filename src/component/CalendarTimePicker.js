import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimeTracker from './TimeTracker';

const CalendarTimePicker = ({ selectDate, selectTime }) => {
    const [startDate, setStartDate] = useState(new Date()); // Track the start date of the current week
    const [selectedDate, setSelectedDate] = useState(null); // Track the selected date

    // Weekday Names (Fixed)
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Function to calculate the next set of 7 days from a given start date
    const getNextWeek = (baseDate) => {
        const dates = [];
        const startOfWeek = new Date(baseDate);
        const dayOfWeek = startOfWeek.getDay();
        startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek); // Set to Sunday

        for (let i = 0; i < 7; i++) {
            const newDate = new Date(startOfWeek);
            newDate.setDate(startOfWeek.getDate() + i); // Increment the date by 1 for each day of the week
            dates.push({
                day: dayNames[newDate.getDay()],
                date: newDate.getDate(),
                fullDate: newDate,
            });
        }
        return dates;
    };

    // Function to handle the scrolling (next or previous 7 days)
    const changeWeek = (direction) => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() + direction * 7); // Add or subtract 7 days
        setStartDate(newStartDate);
    };

    // Get the current set of 7 days to display
    const weekData = getNextWeek(startDate);

    // Handle date selection and call the parent function if provided
    const handleDateSelect = (date) => {
        setSelectedDate(date); // Set selected date
        selectDate(date); // Call the parent function
    };

    // Function to check if a date is in the past
    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to 00:00 for comparison
        return date < today;
    };

    return (
        <View>
            {/* Month Section */}
            <View style={styles.monthContainer}>
                <TouchableOpacity onPress={() => changeWeek(-1)}>
                    <Ionicons name="chevron-back" size={20} color="#3C3567" />
                </TouchableOpacity>
                <Text style={styles.monthText}>
                    {startDate.toLocaleString('default', { month: 'long' })} {startDate.getFullYear()}
                </Text>
                <TouchableOpacity onPress={() => changeWeek(1)}>
                    <Ionicons name="chevron-forward" size={20} color="#3C3567" />
                </TouchableOpacity>
            </View>

            {/* Fixed Weekday Names */}
            <View style={styles.weekdayContainer}>
                {dayNames.map((day, index) => (
                    <View key={index} style={styles.weekdayItem}>
                        <Text style={styles.weekdayText}>{day}</Text>
                    </View>
                ))}
            </View>

            {/* Scrollable Dates Section */}
            <View style={styles.dateContainer}>
                {weekData.map((item) => {
                    const isPast = isPastDate(item.fullDate); // Check if the date is in the past
                    return (
                        <TouchableOpacity
                            key={item.fullDate.toDateString()}
                            style={[
                                styles.dateItem,
                                item.fullDate.toDateString() === selectedDate?.toDateString() && styles.selectedDate,
                                isPast // Apply disabled style to past dates
                            ]}
                            onPress={() => !isPast && handleDateSelect(item.fullDate)} // Only allow selection if it's not a past date
                            disabled={isPast} // Disable the TouchableOpacity for past dates
                        >
                            <Text style={[styles.dateText, isPast && styles.disabledText]}>
                                {item.date}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Time Picker */}
            <TimeTracker selectTime={selectTime} selectedDate={selectedDate}/>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Swipe to change Week</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    monthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    monthText: {
        fontSize: 16,
        color: '#212121',
    },
    weekdayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    weekdayItem: {
        alignItems: 'center',
        width: 45,
    },
    weekdayText: {
        color: '#737373',
        fontSize: 14,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    dateItem: {
        alignItems: 'center',
        width: 48,
        paddingVertical: 8,
        borderRadius: 5,
    },
    dateText: {
        fontSize: 16,
        color: '#000000',
    },
    selectedDate: {
        backgroundColor: '#4CAF50', // Selected date background color
    },
    disabledDate: {
    },
    disabledText: {
        color: '#a9a9a9', // Disabled text color
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
});

export default CalendarTimePicker;
