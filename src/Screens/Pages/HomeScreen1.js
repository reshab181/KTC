// Author: Ashutosh Rai
// Component: HomeScreen1
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import CustomIconTextInput from '../../component/CustomIconTextInput';
import CustomTextInpt from '../../component/CustomTextInpt';
import CustomButton from '../../component/CustomButtons';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarTimePicker from '../../component/CalendarTimePicker';
import SidebarMenu from '../../component/SidebarMenu';
import { use } from 'react';
import { useEffect } from 'react';

const HomeScreen1 = ({ navigation }) => {
    const [isVisible, setisVisible] = useState(false);
    const [rentalType, setRentalType] = useState('Rental Type');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [startTrip, setstartTrip] = useState(true);
    const [endTrip, setendTrip] = useState(false);
    const [selectStartDate, setSelectStartDate] = useState();
    const [selectEndDate, setSelectEndDate] = useState();
    const [selectStartTime, setSelectStartTime] = useState();
    const [selectEndTime, setSelectEndTime] = useState();

    useEffect(() => {
        if(selectStartDate && selectStartTime){
            setstartTrip(false)
            setendTrip(true)
        }
    }, [selectStartDate, selectStartTime])
    

    console.log('====================================');
    console.log("Start Date" , selectStartDate);
    console.log("Start Time" , selectStartTime);
    console.log('====================================');

    
    console.log('====================================');
    console.log("End Date" , selectEndDate);
    console.log("End Time" , selectEndTime);

    console.log('====================================');


    const cityData = [
        { label: 'Local Run - Full day', value: 'FD' },
        { label: 'Local Run - Half day', value: 'HD' },
        { label: 'Transfers (Airport)', value: 'Airport' },
        { label: 'Outstation', value: 'Outstation' },
    ];

    const handleItemPress = (item) => {
        setRentalType(item.label);
        setisVisible(false);
    };

    const handleMenuPress = () => {
        setIsSidebarVisible(true);
    };

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.headerContainer}>
                <CustomHeader
                    iconHeight={30}
                    iconWidth={39}
                    islogo={true}
                    imgPath={require('../../assets/ktclogo.png')}
                    iconPath={require('../../assets/menuu.png')}
                    handleLeftIcon={handleMenuPress}
                    isSidebarVisible={isSidebarVisible}
                />
            </View>

            <ScrollView style={styles.ScrollView}>
                <View style={styles.container}>
                    <CustomIconTextInput
                        icon1={require('../../assets/place.png')}
                        icon2={require('../../assets/navigateback.png')}
                        placeholder={'Delhi NCR'}
                    />
                    <CustomTextInpt placeholder={'MapmyIndia Head Office New Delhi, 237, Okh...'} />
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity onPress={() => setisVisible(!isVisible)} style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{rentalType}</Text>
                            <Icon name={isVisible ? 'chevron-up' : 'chevron-down'} size={16} color="#666666" />
                        </TouchableOpacity>
                        {isVisible && (
                            <View style={styles.dropdownList}>
                                {cityData.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => handleItemPress(item)}
                                            style={styles.listItemContainer}
                                        >
                                            <Text style={styles.listItem}>{item.label}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                    <View style={styles.tripContainer}>
                        <View style={styles.tripRow}>
                            <Image source={require('../../assets/car-bg.png')} style={styles.tripIcon} />
                            <TouchableOpacity onPress={() => {
                                setstartTrip(true)
                                setendTrip(false)
                            }}>
                                <Text style={startTrip ? styles.tripText : styles.disableTripText}>Start Trip</Text>
                            </TouchableOpacity>
                            <Icon name="chevron-right" />
                            <TouchableOpacity onPress={() => {
                                setstartTrip(false)
                                setendTrip(true)
                            }}>
                                <Text style={endTrip ? styles.tripText : styles.disableTripText}>End Trip</Text>
                            </TouchableOpacity>
                            <Image source={require('../../assets/carbw.png')} style={styles.tripIcon} />
                        </View>
                        {startTrip ? <CalendarTimePicker selectDate={setSelectStartDate} selectTime={setSelectStartTime} /> : null}
                        {endTrip  ? <CalendarTimePicker selectDate={setSelectEndDate} selectTime={setSelectEndTime} /> : null}


                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton title="Continue" widthSize="100%" borderRadius={0} onPress={() => navigation.navigate('CarGroup')} />
            </View>

            <SidebarMenu isVisible={isSidebarVisible} onClose={() => setIsSidebarVisible(false)} />
        </SafeAreaView>
    );
};

export default HomeScreen1;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F1F1F3',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#FFFFFF',
        elevation: 5, // Add shadow for Android
        shadowColor: '#000', // Add shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    ScrollView: {
        marginTop: 40, // Adjust to prevent overlap with header
    },
    container: {
        margin: 16,
        paddingTop: 16,
    },
    dropdownContainer: {
        marginTop: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        elevation: 1,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
    },
    dropdownText: {
        fontSize: 16,
        color: '#666666',
    },
    dropdownList: {
        marginTop: 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        elevation: 5,
        maxHeight: 150,
    },
    listItemContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    listItem: {
        fontSize: 16,
        color: '#666666',
        borderBottomColor: '#E5E5E5',
    },
    tripContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 16,
        elevation: 5,
        padding: 16,
        borderRadius: 4,
    },
    tripRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tripText: {
        fontSize: 14,
        color: '#3C3567',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    disableTripText: {
        fontSize: 14,
        color: '#B3B0C4',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    tripIcon: {
        height: 40,
        width: 40,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});
