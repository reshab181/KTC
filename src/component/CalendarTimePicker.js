// Ashutosh Rai 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimeTracker from './TimeTracker';

const CalendarTimePicker = ({ selectDate, selectTime }) => {
    const [startDate, setStartDate] = useState(new Date()); 
    const [selectedDate, setSelectedDate] = useState(null); 

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getNextWeek = (baseDate) => {
        const dates = [];
        const startOfWeek = new Date(baseDate);
        const dayOfWeek = startOfWeek.getDay();
        startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek); 

        for (let i = 0; i < 7; i++) {
            const newDate = new Date(startOfWeek);
            newDate.setDate(startOfWeek.getDate() + i); 
            dates.push({
                day: dayNames[newDate.getDay()],
                date: newDate.getDate(),
                fullDate: newDate,
            });
        }
        return dates;
    };

    const changeWeek = (direction) => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() + direction * 7); 
        setStartDate(newStartDate);
    };

    const weekData = getNextWeek(startDate);

    const handleDateSelect = (date) => {
        setSelectedDate(date); 
        selectDate(date); 
    };

    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        return date < today;
    };

    return (
        <View>
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

            <View style={styles.weekdayContainer}>
                {dayNames.map((day, index) => (
                    <View key={index} style={styles.weekdayItem}>
                        <Text style={styles.weekdayText}>{day}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.dateContainer}>
                {weekData.map((item) => {
                    const isPast = isPastDate(item.fullDate); 
                    return (
                        <TouchableOpacity
                            key={item.fullDate.toDateString()}
                            style={[
                                styles.dateItem,
                                item.fullDate.toDateString() === selectedDate?.toDateString() && styles.selectedDate,
                                isPast 
                            ]}
                            onPress={() => !isPast && handleDateSelect(item.fullDate)} 
                            disabled={isPast} 
                        >
                            <Text style={[styles.dateText, isPast && styles.disabledText]}>
                                {item.date}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TimeTracker selectTime={selectTime} selectedDate={selectedDate}/>

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
        backgroundColor: '#4CAF50', 
    },
    disabledText: {
        color: '#a9a9a9', 
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