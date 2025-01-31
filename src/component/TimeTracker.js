import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const TimeTracker = ({ selectTime, selectedDate }) => {
  const [timeArray, setTimeArray] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
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
    const minutes = Math.floor(now.getMinutes() / 15) * 15; // Round down to nearest 15 minutes
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

  const isPastTime = (time) => {
    if (!selectedDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    const isToday = selectedDate.toDateString() === today.toDateString();
    if (!isToday) return false;

    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    return hours < now.getHours() || (hours === now.getHours() && minutes < now.getMinutes());
  };

  useEffect(() => {
    if (selectedTime && isPastTime(selectedTime)) {
      setSelectedTime(null); // Reset selected time if it becomes invalid
      selectTime(null);
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
    backgroundColor: '#4CAF50',
  },
  selectedTimeText: {
    color: '#fff',
  },
  disabledTimeBox: {
    // backgroundColor: '#E0E0E0',
  },
  disabledTimeText: {
    color: '#A9A9A9',
  },
});