import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CustomCalender = () => {
    return (
        <View style={{ backgroundColor: '#FFFFFF', height: 233, margin: 10, borderWidth: 1, borderColor: "#E5E5E5", }}>
            <View style={{ marginStart: 20, marginTop: 20, flexDirection: "row" }}>
                <Image source={require('../Assets/car.png')} />
                <Text style={{
                    textAlign: 'center', // Center-align the text
                    fontFamily: 'Open Sans', // Font family
                    fontSize: 14, // Font size
                    lineHeight: 19, // Line height
                    fontWeight: 'bold', // Font weight (bold equivalent for Open Sans)
                    letterSpacing: 0, // No letter spacing
                    color: '#3C3567', // Text color
                    opacity: 1,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                    marginStart: 20,

                }}>
                    Select Date & Reporting Time
                </Text>

            </View>
            {/* <WeekViewCalendar/> */}
            <View>
                <Text style={{ fontSize: 12, color: "#737373", textAlign: 'center', fontWeight: 'bold' }}>
                    Slide to Select Date and Time
                </Text>
            </View>
        </View>
    )
}

export default CustomCalender

const styles = StyleSheet.create({

})