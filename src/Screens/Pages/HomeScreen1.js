// Author: Ashutosh Rai
// Component: HomeScreen1
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../../Reusables/CustomHeader';
import CustomIconTextInput from '../../Reusables/CustomIconTextInput';
import CustomTextInpt from '../../Reusables/CustomTextInpt';
import CustomButton from '../../Reusables/CustomButtons';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarTimePicker from '../../Reusables/CalendarTimePicker';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import SidebarMenu from '../../Reusables/SidebarMenu';

const HomeScreen1 = ({ navigation }) => {
    const [isVisible, setisVisible] = useState(false);
    const [rentalType, setRentalType] = useState('Rental Type');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
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
            <ScrollView>
                <CustomHeader
                    iconHeight={30}
                    iconWidth={39}
                    islogo={true}
                    imgPath={require('../../Assets/ktclogo.png')}
                    iconPath={require('../../Assets/menuu.png')}
                    onMenuPress={handleMenuPress}
                    isSidebarVisible={isSidebarVisible}
                />
                <View style={styles.container}>
                    <CustomIconTextInput
                        icon1={require('../../Assets/place.png')}
                        icon2={require('../../Assets/navigateback.png')}
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
                                    return (<TouchableOpacity key={index} onPress={() => handleItemPress(item)} style={styles.listItemContainer}>
                                        <Text style={styles.listItem}>{item.label}</Text>
                                    </TouchableOpacity>)
                                })}
                            </View>
                        )}
                    </View>
                    <View style={styles.tripContainer}>
                        <View style={styles.tripRow}>
                            <Image source={require('../../Assets/car-bg.png')} style={styles.tripIcon} />
                            <TouchableOpacity >
                                <Text style={styles.tripText}>Start Trip</Text>
                            </TouchableOpacity>
                            <Icon name='chevron-right' />
                            <TouchableOpacity>
                                <Text style={styles.tripText}>End Trip</Text>
                            </TouchableOpacity>
                            <Image source={require('../../Assets/carbw.png')} style={styles.tripIcon} />
                        </View>
                        <CalendarTimePicker />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <CustomButton title="Continue" widthSize="100%" borderRadius={0} onPress={() => navigation.navigate('CarGroup')} />
            </View>
            <SidebarMenu
                isVisible={isSidebarVisible}
                onClose={() => setIsSidebarVisible(false)}
            />
        </SafeAreaView>
    );
};

export default HomeScreen1;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F1F1F3',
    },
    container: {
        margin: 16,
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
