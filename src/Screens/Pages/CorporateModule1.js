// Author: Ashutosh Rai
// Component: CorporateModule1
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../../Reusables/CustomHeader'
import { useWindowDimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import CustomDropdown from '../../Reusables/CustomDropdown';
import CustomTextInpt from '../../Reusables/CustomTextInpt';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import CustomCalender from '../../Reusables/CustomCalender';
import CustomButton from '../../Reusables/CustomButtons';
import { useNavigation } from '@react-navigation/native';
import CustomCarGrouptile from '../../Reusables/CustomCarGrouptile';
import TimeTracker from '../../Reusables/TimeTracker';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];
const CorporateModule1 = ({ navigation }) => {

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const cityData = [
        { label: 'Delhi', value: 'Delhi' },
        { label: 'Jharkhand', value: 'Jharkhand' },
        { label: 'Ranchi', value: 'Ranchi' },
    ];

    const rentalTypeData = [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
    ];

    const carGroupData = [
        { label: 'Sedan', value: 'sedan' },
        { label: 'SUV', value: 'suv' },
        { label: 'Hatchback', value: 'hatchback' },
    ];

    const styles = useStyles();
    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };
    return (
        <ScrollView>
            <View style={styles.root}>
                <CustomHeader iconHeight={30} iconWidth={39} islogo={true} imgPath={require('../../Assets/ktclogo.png')} iconPath={require('../../Assets/menuu.png')} />
                <View style={styles.container}>
                    <View>
                        <View style={styles.container1}>
                            <Text style={styles.txt}>Car Reservation Details</Text>
                        </View>
                        <View style={[styles.container2, { height: 196 }]}>
                            <View style={{ marginHorizontal: 10 }}>
                                <CustomDropdown
                                    data={cityData}
                                    placeholder="City"
                                    searchPlaceholder="Search City..."
                                    onChange={(item) => console.log('Selected City:', item)}
                                />
                                <CustomDropdown
                                    data={rentalTypeData}
                                    placeholder="Rental Type"
                                    searchPlaceholder="Search Rental Type..."
                                    onChange={(item) => console.log('Selected Rental Type:', item)}
                                />
                                <CustomDropdown
                                    data={carGroupData}
                                    placeholder="Car Groups"
                                    searchPlaceholder="Search Car Group..."
                                    onChange={(item) => console.log('Selected Car Group:', item)}
                                />
                            </View>
                        </View>
                    </View>

                </View>
                <View style={styles.container}>
                    <View>
                        <View style={styles.container1}>
                            <Text style={styles.txt}>Car Reporting Details</Text>
                        </View>
                        <View style={{ backgroundColor: "#FFFFFF"  }}>
                            
                            <CustomCalender />

                        </View>
                        <View style={[styles.container2, { height: 140 }]}>
                            <View style={{ marginHorizontal: 10 }}>
                                <CustomCarGrouptile
                                    title={"Pickup Address"}
                                    onPress={() => navigation.navigate('PickUpLocation')}
                                    iconName={'chevron-down'} />
                                <CustomTextInpt placeholder={"Reporting Landmark (Optional)"} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <View style={styles.container1}>
                            <Text style={styles.txt}>Other Information</Text>
                        </View>
                        <View style={[styles.container2, { height: 208 }]}>
                            <View style={{ marginHorizontal: 10 }}>
                                <CustomTextInpt placeholder={"Flight/Train info"} />
                                <CustomTextInpt placeholder={"Special Instruction (Optional)"} />
                                <CustomDropdown
                                    data={cityData}
                                    placeholder="Payment Mode"
                                    searchPlaceholder="Search City..."
                                    onChange={(item) => console.log('Selected City:', item)}
                                />
                            </View>
                        </View>
                    </View>

                </View>
                <CustomButton title={"Next"} borderRadius={0} onPress={() => { navigation.navigate('HomeScreen1') }} />
            </View>
        </ScrollView>
    )
}

export default CorporateModule1

function useStyles() {
    const { width: winwidth, height: winheight } = useWindowDimensions();
    return StyleSheet.create({
        root: {
            backgroundColor: "#F1F1F3",
        },
        container: {
            // position: "relative",
            margin: 16,
            backgroundColor: "#F1F1F3",
            elevation: 5,
        },
        container1: {
            height: 32,
            backgroundColor: '#374852',
            borderStartStartRadius: 4,
            borderTopEndRadius: 4,
            justifyContent: 'center',
            paddingStart: 10,
        },
        container2: {
            backgroundColor: "#FFFFFF",
        },
        txt: {
            color: "#FFFFFF",
            fontSize: 12,
        },
        dropdown: {

            marginTop: 10,
            marginHorizontal: 10,
            height: 50,
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
        },
        icon: {
            marginRight: 5,
        },
        label: {
            position: 'absolute',
            backgroundColor: 'white',
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: 14,
        },
        placeholderStyle: {
            fontSize: 16,
        },
        selectedTextStyle: {
            fontSize: 16,
        },


    })
}