import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
  } from "react-native";
  import React, { useState } from "react";
  import { useDispatch } from "react-redux";
  import { updateCorporateSlice } from "../Redux/slice/CorporateSlice";
  import TimeTracker from "./TimeTracker";
  import CalendarPicker from "react-native-calendar-picker";
  import Icon from "react-native-vector-icons/FontAwesome";
  
  const CustomCalendar = () => {
    const { width } = useWindowDimensions();
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState(null);
    const dispatch = useDispatch();
  
    // Disable past dates
    const disablePastDates = (date) => date  + 1 < today  ;
  
    // Handle date selection
    const handleDateSelect = (date) => {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split("T")[0];
      dispatch(
        updateCorporateSlice({
          type: "selectedDate",
          selectedItem: formattedDate,
        })
      );
  
      console.log("Selected Date:", formattedDate);
    };
  
    // Handle time selection
    const handleTimeSelect = (time) => {
      setSelectedTime(time);
      dispatch(
        updateCorporateSlice({
          type: "selectedTime",
          selectedItem: time,
        })
      );
  
      console.log("Selected Time:", time);
    };
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require("../assets/car.png")} style={styles.carIcon} />
          <Text style={styles.headerText}>Select Date & Reporting Time</Text>
        </View>
  
        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <CalendarPicker
            weekdays={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
            months={[
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ]}
            startFromMonday={false}
            selectedDayColor="#007AFF"
            selectedDayTextColor="#fff"
            todayBackgroundColor="#cccccc"
            todayTextStyle={styles.todayText}
            previousComponent={<Icon name="angle-left" size={20} color="black" marginLeft={'10%'}/>}
            nextComponent={<Icon name="angle-right" size={20} color="black" marginRight={'10%'}/>}
            disabledDates={disablePastDates}
            restrictMonthNavigation={false} // Allow navigating months freely
            minDate={today}
            enableDateChange={true}
            onDateChange={handleDateSelect} // Now properly updating selected date
            width={width * 0.9} // Reduce width for a better fit
          />
        </View>
  
        {/* Time Selection Below Calendar */}
        <View style={styles.timeTrackerContainer}>
          <TimeTracker selectTime={handleTimeSelect} selectedDate={selectedDate} />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
    //   backgroundColor: "#FFFFFF",
      flex: 1,
      margin: 10,
      borderWidth: 1,
      borderColor: "#E5E5E5",
      borderRadius: 8,
    //   paddingBottom: 10,
    //   alignItems: "center",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      margin: 20,
      justifyContent: 'center'
    },
    carIcon: {
      width: 40,
      height: 40,
      resizeMode: "contain",
    },
    headerText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#3C3567",
      marginLeft: 10,
      textDecorationLine: 'underline'
    },
    calendarContainer: {
    //   width: "90%",
    //   alignSelf: "center",
    //   borderWidth: 1,
    //   borderColor: "#E5E5E5",
    //   borderRadius: 10,
      paddingVertical: 10,
      marginBottom: 10 ,
    //   marginBottom: 20, // Adds spacing before the TimeTracker
    },
    timeTrackerContainer: {
    //   width: "100%",
    //   alignItems: "center",
    //   marginTop: 10,
    },
    todayText: {
      fontWeight: "bold",
      color: "#333",
    },
  });
  
  export default CustomCalendar;
  