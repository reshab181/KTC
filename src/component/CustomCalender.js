import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateCorporateSlice } from '../Redux/slice/CorporateSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimeTracker from './TimeTracker';

const CustomCalendar = () => {
    const dispatch = useDispatch();
    const today = new Date();
    const flatListRef = useRef(null);

    const [selectedDate, setSelectedDate] = useState(today);
    const [weeks, setWeeks] = useState([]);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [selectedTime, setSelectedTime] = useState(null);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const generateWeeks = () => {
        let start = new Date();
        start.setDate(1);
        start.setDate(start.getDate() - start.getDay()); // Move to the start of the first week

        let end = new Date();
        end.setMonth(today.getMonth() + 2);
        end.setDate(0);
        end.setDate(end.getDate() + (6 - end.getDay())); // Move to the end of the last week

        let tempWeeks = [];
        let current = new Date(start);

        while (current <= end) {
            let week = [];
            for (let i = 0; i < 7; i++) {
                week.push({
                    day: dayNames[current.getDay()],
                    date: current.getDate(),
                    fullDate: new Date(current),
                    isDisabled: current < today && current.toDateString() !== today.toDateString(),
                });
                current.setDate(current.getDate() + 1);
            }
            tempWeeks.push(week);
        }
        setWeeks(tempWeeks);
    };
    const handleScroll = (event) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / 350);
        if (newIndex !== currentWeekIndex && weeks[newIndex]) {
            setCurrentWeekIndex(newIndex);
            setSelectedDate(weeks[newIndex][0].fullDate); // Set to first day of new week
        }
    };
    useEffect(() => {
        generateWeeks();
    }, []);

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        dispatch(updateCorporateSlice({
            type: 'selectedTime',
            selectedItem: time,
        }));
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split('T')[0];
        dispatch(updateCorporateSlice({
            type: 'selectedDate',
            selectedItem: formattedDate,
        }));

        // Find the week index where the selected date belongs and scroll to it
        const weekIndex = weeks.findIndex(week =>
            week.some(day => day.fullDate.toDateString() === date.toDateString())
        );

        if (weekIndex !== -1) {
            setCurrentWeekIndex(weekIndex);
            flatListRef.current.scrollToIndex({ index: weekIndex, animated: true });
        }
    };

    const navigateWeek = (direction) => {
        let newIndex = direction === 'next' ? currentWeekIndex + 1 : currentWeekIndex - 1;
        if (newIndex >= 0 && newIndex < weeks.length) {
            setCurrentWeekIndex(newIndex);
            flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/car.png')} />
                <Text style={styles.headerText}>Select Date & Reporting Time</Text>
            </View>

            <View style={styles.monthContainer}>
                <TouchableOpacity onPress={() => navigateWeek('prev')}>
                    <Ionicons name="chevron-back" size={24} color="#3C3567" />
                </TouchableOpacity>
                <Text style={styles.monthText}>{selectedDate.toLocaleString('default', { month: 'long' })}
                    {selectedDate.getFullYear()}</Text>
                <TouchableOpacity onPress={() => navigateWeek('next')}>
                    <Ionicons name="chevron-forward" size={24} color="#3C3567" />
                </TouchableOpacity>
            </View>

            {/* <FlatList
                ref={flatListRef}
                data={weeks}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={false} // Allow independent smooth scrolling
                getItemLayout={(data, index) => ({ length: 350, offset: 350 * index, index })} // Optimize scroll performance
                renderItem={({ item }) => (
                    <View style={styles.weekContainer}>
                        {item.map((dayItem) => (
                            <TouchableOpacity
                                key={dayItem.fullDate.toDateString()}
                                style={[
                                    styles.dateItem,
                                    selectedDate.toDateString() === dayItem.fullDate.toDateString() && styles.selectedDateStyle,
                                    dayItem.isDisabled && styles.disabledDate,
                                ]}
                                onPress={() => handleDateSelect(dayItem.fullDate)}
                                disabled={dayItem.isDisabled}
                            >
                                <Text style={[styles.dayText, dayItem.isDisabled && styles.disabledDayText]}>
                                    {dayItem.day}
                                </Text>
                                <Text style={[
                                    styles.dateText,
                                    selectedDate.toDateString() === dayItem.fullDate.toDateString() && styles.selectedDateText
                                ]}>
                                    {dayItem.date}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            /> */}

            <FlatList
                ref={flatListRef}
                data={weeks}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={false}
                getItemLayout={(data, index) => ({ length: 350, offset: 350 * index, index })}
                onMomentumScrollEnd={handleScroll} // Update selectedDate when scrolling ends
                renderItem={({ item }) => (
                    <View style={styles.weekContainer}>
                        {item.map((dayItem) => (
                            <TouchableOpacity
                                key={dayItem.fullDate.toDateString()}
                                style={[
                                    styles.dateItem,
                                    selectedDate.toDateString() === dayItem.fullDate.toDateString() && styles.selectedDateStyle,
                                    dayItem.isDisabled && styles.disabledDate,
                                ]}
                                onPress={() => handleDateSelect(dayItem.fullDate)}
                                disabled={dayItem.isDisabled}
                            >
                                <Text style={[styles.dayText, dayItem.isDisabled && styles.disabledDayText]}>
                                    {dayItem.day}
                                </Text>
                                <Text style={[
                                    styles.dateText,
                                    selectedDate.toDateString() === dayItem.fullDate.toDateString() && styles.selectedDateText
                                ]}>
                                    {dayItem.date}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            />
            <TimeTracker selectTime={handleTimeSelect} selectedDate={selectedDate} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 8,
        paddingBottom: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        margin: 20,
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3C3567',
        marginStart: 20,
    },
    monthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    monthText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3C3567',
        marginHorizontal: 10,
    },
    weekContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        // marginHorizontal: 10,
        width: 350, // Ensure each week occupies equal space
    },
    dateItem: {
        alignItems: 'center',
        width: 50,
        paddingVertical: 8,
    },
    selectedDateStyle: {
        paddingVertical: 10,
    },
    disabledDate: {
        opacity: 0.5,
    },
    disabledDayText: {
        color: '#aaa',
    },
    dateText: {
        fontSize: 16,
        color: '#737373',
    },
    selectedDateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    dayText: {
        marginBottom: 5,
    },
});

export default CustomCalendar;
