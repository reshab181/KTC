import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const TimeTracker = ({ selectTime, selectedDate, initialTime }) => {
  const [timeArray, setTimeArray] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedTime, setSelectedTime] = useState(initialTime || null);
  const scrollViewRef = useRef(null);

  const generateTimeRange = () => {
    const timeRange = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        timeRange.push(formattedTime);
      }
    }
    setTimeArray(timeRange);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = Math.floor(now.getMinutes() / 30) * 30;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${hours}:${formattedMinutes}`;
  };

  const scrollToCurrentTime = () => {
    const index = timeArray.indexOf(currentTime);
    if (index !== -1 && scrollViewRef.current) {
      const scrollPosition = index * 100;
      scrollViewRef.current.scrollTo({ x: scrollPosition, animated: true });
    }
  };

  useEffect(() => {
    generateTimeRange();
    const time = getCurrentTime();
    setCurrentTime(time);
  }, []);

  useEffect(() => {
    if (timeArray.length > 0) {
      scrollToCurrentTime();
    }
  }, [timeArray, currentTime]);

  useEffect(() => {
    setSelectedTime(initialTime);
  }, [initialTime]);

  const isPastTime = (time) => {
    if (!selectedDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const selectedDateStart = new Date(selectedDate);
    selectedDateStart.setHours(0, 0, 0, 0);

    const isToday = selectedDateStart.getTime() === today.getTime();
    if (!isToday) return false;

   
    const [hours, minutes] = time.split(':').map(Number);
    
 
    const timeSlot = new Date();
    timeSlot.setHours(hours, minutes, 0, 0);
    
   
    const now = new Date();
    const minBookingTime = new Date(now.getTime() + (4 * 60 * 60 * 1000)); 
    
  
    return timeSlot <= minBookingTime;
  };

  useEffect(() => {
    if (selectedTime && isPastTime(selectedTime)) {
      setSelectedTime(null);
      selectTime(null); // Also update parent component
    }
  }, [selectedDate]);

  const handleTimeSelect = (time) => {
    if (!isPastTime(time)) {
      setSelectedTime(time);
      selectTime(time); 
    }
  };

  return (
    <View style={{ marginHorizontal: 10 }}>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {timeArray.map((time, index) => {
          const disabled = isPastTime(time);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeBox,
                time === selectedTime ? styles.selectedTimeBox : null,
                disabled ? styles.disabledTimeBox : null,
              ]}
              onPress={() => handleTimeSelect(time)}
              disabled={disabled}
            >
              <Text
                style={[
                  styles.timeText,
                  time === selectedTime ? styles.selectedTimeText : null,
                  disabled ? styles.disabledTimeText : null,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TimeTracker;

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeBox: {
    padding: 2,
    borderRadius: 5,
    marginHorizontal: 5,
    width: 60,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#333',
  },
  selectedTimeBox: {
    backgroundColor: '#3C3567',
    borderRadius: 30,
  },
  selectedTimeText: {
    color: '#fff', 
    fontWeight: '600',
    fontSize: 14,
  },
  disabledTimeBox: {
    // backgroundColor: '#E0E0E0',
  },
  disabledTimeText: {
    color: '#A9A9A9',
    backfaceVisibility: "hidden"
  },
});