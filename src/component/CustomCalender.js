
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCorporateSlice } from '../Redux/slice/CorporateSlice';
import TimeTracker from './TimeTracker';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomCalendar = ({ rentalTypeValue }) => {
  const { width } = useWindowDimensions();
  const today = new Date();
  const dispatch = useDispatch();
  
  // Get state from Redux
  const {
    start_date: startDateFromRedux,
    endate: endDateFromRedux,
    Reporingtime: reportingTimeFromRedux
  } = useSelector(state => state.reviewBooking);

  // Local state
  const [selectedDate, setSelectedDate] = useState(
    startDateFromRedux ? new Date(startDateFromRedux) : today
  );
  const [selectedTime, setSelectedTime] = useState(reportingTimeFromRedux || null);

  // Sync with Redux state changes
  useEffect(() => {
    if (startDateFromRedux) {
      const date = new Date(startDateFromRedux);
      setSelectedDate(date);
      updateEndDate(date);
    }
  }, [startDateFromRedux]);

  useEffect(() => {
    setSelectedTime(reportingTimeFromRedux || null);
  }, [reportingTimeFromRedux]);

  // Update both dates in Redux
  const updateEndDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const endDateValue = rentalTypeValue === 'OUTSTATION' 
      ? calculateOutstationEndDate(date)
      : formattedDate;
    
    dispatch(updateCorporateSlice({
      type: 'endate',
      selectedItem: endDateValue,
    }));
  };

  // Custom logic for OUTSTATION end date (example: +1 day)
  const calculateOutstationEndDate = (startDate) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1); 
    return endDate.toISOString().split('T')[0];
  };

 
  const handleDateSelect = date => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(date);
    
    dispatch(updateCorporateSlice({
      type: 'start_date',
      selectedItem: formattedDate,
    }));

    updateEndDate(date);

  
    setSelectedTime(null);
    dispatch(updateCorporateSlice({
      type: 'Reporingtime',
      selectedItem: null,
    }));
  };


  const handleTimeSelect = time => {
    setSelectedTime(time);
    dispatch(updateCorporateSlice({
      type: 'Reporingtime',
      selectedItem: time,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/car.png')} style={styles.carIcon} />
        <Text style={styles.headerText}>
          {rentalTypeValue === 'OUTSTATION' 
            ? 'Select Start Date & Reporting Time' 
            : 'Select Date & Reporting Time'}
        </Text>
      </View>

      <View style={styles.calendarContainer}>
        <CalendarPicker
          style={{ fontWeight: '600' }}
          weekdays={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          months={[
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          ]}
          startFromMonday={false}
          selectedDayColor="#3C3567"
          selectedDayTextColor="#fff"
          todayBackgroundColor="#cccccc"
          todayTextStyle={styles.todayText}
          previousComponent={<Icon name="angle-left" size={20} color="black" />}
          nextComponent={<Icon name="angle-right" size={20} color="black" />}
          minDate={today}
          onDateChange={handleDateSelect}
          width={width * 0.9}
          selectedDate={selectedDate}
        />

        {/* {rentalTypeValue === 'OUTSTATION' && (
          <Text style={styles.dateInfoText}>
            End date will be automatically set to {calculateOutstationEndDate(selectedDate)}
          </Text>
        )} */}
      </View>

      <View style={styles.timeTrackerContainer}>
        <TimeTracker
          selectTime={handleTimeSelect}
          selectedDate={selectedDate}
          initialTime={selectedTime}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    justifyContent: 'center',
  },
  carIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3C3567',
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  subHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3C3567',
    marginTop: 15,
    textAlign: 'center',
  },
  calendarContainer: {
    paddingVertical: 10,
    marginBottom: 10,
  },
  timeTrackerContainer: {},
  todayText: {
    fontWeight: 'bold',
    color: '#333',
  },

});

export default CustomCalendar;