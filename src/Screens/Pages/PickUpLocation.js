import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimeTracker from '../../component/TimeTracker';
import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice';

const CustomCalendar = () => {
    const dispatch = useDispatch();
    const today = new Date();
    const flatListRef = useRef(null);
    const [visibleDate, setVisibleDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState(today);
    const [weeks, setWeeks] = useState([]);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [selectedTime, setSelectedTime] = useState(null);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    useEffect(() => {
        generateWeeks();
    }, []);

    useEffect(() => {
        if (weeks.length > 0) {
            const weekIndex = weeks.findIndex(week =>
                week.some(day => day.fullDate.toDateString() === today.toDateString())
            );

            if (weekIndex !== -1) {
                setCurrentWeekIndex(weekIndex);
                setTimeout(() => {
                    flatListRef.current?.scrollToIndex({ index: weekIndex, animated: true });
                }, 100);
            }
        }
    }, [weeks]);

    const generateWeeks = () => {
        let start = new Date(today.getFullYear(), today.getMonth(), 1);
        start.setDate(start.getDate() - start.getDay()); // Start from the first Sunday

        let end = new Date(today.getFullYear(), today.getMonth() + 2, 0);
        end.setDate(end.getDate() + (6 - end.getDay())); // End at the last Saturday

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
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / 350); // Adjust based on fixed width
        if (newIndex !== currentWeekIndex && weeks[newIndex]) {
            setCurrentWeekIndex(newIndex);
            setVisibleDate(weeks[newIndex][0].fullDate);
        }
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split('T')[0];

        dispatch(updateCorporateSlice({
            type: 'selectedDate',
            selectedItem: formattedDate,
        }));

        const weekIndex = weeks.findIndex(week =>
            week.some(day => day.fullDate.toDateString() === date.toDateString())
        );

        if (weekIndex !== -1) {
            setCurrentWeekIndex(weekIndex);
            flatListRef.current.scrollToIndex({ index: weekIndex, animated: true });
        }
    };

    const navigateMonth = (direction) => {
        let newDate = new Date(visibleDate);
        newDate.setMonth(visibleDate.getMonth() + (direction === 'next' ? 1 : -1));

        setVisibleDate(newDate);

        // Find the first week that belongs to the new month
        const weekIndex = weeks.findIndex(week =>
            week.some(day =>
                day.fullDate.getFullYear() === newDate.getFullYear() &&
                day.fullDate.getMonth() === newDate.getMonth()
            )
        );

        if (weekIndex !== -1) {
            setCurrentWeekIndex(weekIndex);
            flatListRef.current?.scrollToIndex({ index: weekIndex, animated: true });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets/car.png')} />
                <Text style={styles.headerText}>Select Date & Reporting Time</Text>
            </View>

            <View style={styles.monthContainer}>
                <TouchableOpacity onPress={() => navigateMonth('prev')}>
                    <Ionicons name="chevron-back" size={24} color="#3C3567" />
                </TouchableOpacity>
                <Text style={styles.monthText}>
                    {visibleDate.toLocaleString('default', { month: 'long' })} {visibleDate.getFullYear()}
                </Text>
                <TouchableOpacity onPress={() => navigateMonth('next')}>
                    <Ionicons name="chevron-forward" size={24} color="#3C3567" />
                </TouchableOpacity>
            </View>

            {/* Weekday Headers */}
            <View style={styles.weekHeader}>
                {dayNames.map((day, index) => (
                    <Text key={index} style={styles.weekDay}>{day}</Text>
                ))}
            </View>

            {/* Dates Scrollable List */}
            <FlatList
                ref={flatListRef}
                data={weeks}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                // getItemLayout={(data, index) => {
                //     const itemWidth = 350; // Fixed width for each item
                //     return { length: itemWidth, offset: itemWidth * index, index };
                // }}
                onMomentumScrollEnd={handleScroll}
                renderItem={({ item }) => (
                    <View style={styles.weekContainer}>
                        {item.map((dayItem, index) => {
                            const isLastItem = index === item.length - 1; // Check if it's the last item

                            return (
                                <View>
                                    
                                </View>
                            );
                        })}
                    </View>
                )}
            />

            <TimeTracker selectTime={(time) => setSelectedTime(time)} selectedDate={selectedDate} />
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
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    monthText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3C3567',
        marginHorizontal: 15,
    },
    weekHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    weekDay: {
        width: 50,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3C3567',
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        width: 350,
        alignSelf: 'center',
    },
    dateItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    selectedDateStyle: {
        backgroundColor: '#3C3567',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledDate: {
        opacity: 0.3,
    },
    dateText: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
    selectedDateText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});


export default CustomCalendar;
