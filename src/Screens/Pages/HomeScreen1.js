import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import CustomHeader from '../../Reusables/CustomHeader';
import CustomIconTextInput from '../../Reusables/CustomIconTextInput';
import CustomTextInpt from '../../Reusables/CustomTextInpt';
import CustomButton from '../../Reusables/CustomButtons';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen1 = () => {
    const [rentalType, setRentalType] = useState('Rental Type'); // State to hold the selected rental type
    const cityData = [
        { label: 'Local Run - Full day', value: 'FD' },
        { label: 'Local Run - Half day', value: 'HD' },
        { label: 'Transfers (Airport)', value: 'Airport' },
        { label: 'Outstation', value: 'Outstation' },
    ];

    const handleItemPress = (item) => {
        setRentalType(item.label); // Update the Rental Type input with the clicked item's label
    };

    return (
            <View style={styles.root}>
                    <CustomHeader
                        iconHeight={30}
                        iconWidth={39}
                        islogo={true}
                        imgPath={require('../../Assets/ktclogo.png')}
                        iconPath={require('../../Assets/menuu.png')}
                    />
                    <View style={styles.container}>
                        <CustomIconTextInput
                            icon1={require('../../Assets/place.png')}
                            icon2={require('../../Assets/navigateback.png')}
                            placeholder={'Delhi NCR'}
                        />
                        <CustomTextInpt placeholder={'MapmyIndia Head Office New Delhi, 237, Okh...'} />
                        <View style={{ marginTop: 16 }}>
                            <CustomIconTextInput
                                placeholder={rentalType} // Display the selected rental type here
                                icon2={require('../../Assets/arrowdown.png')}
                            />
                        </View>
                        <View style={{ elevation: 5, backgroundColor: '#FFFFFF', height: 155, marginTop: 2, marginHorizontal: 1, borderRadius: 2 }}>
                            <FlatList
                                data={cityData}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                                        <Text style={styles.listItem}>{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={{ height: 272, backgroundColor: '#FFFFFF', marginTop: 16, elevation: 5, padding: 16, borderRadius: 4 }}>
                            < View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 40 }}>
                                <View>
                                    <Image source={require('../../Assets/car-bg.png')} style={{ height: 40, width: 40 }} />
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 14, color: "#3C3567", fontWeight: "bold", textDecorationLine: "underline" }}>
                                        Start Trip
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Image source={require('../../Assets/navigateback.png')} />
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
                                        End Trip
                                    </Text>
                                </View>
                                <View>
                                    <Image source={require('../../Assets/carbw.png')} style={{ height: 40, width: 40 }} />
                                </View>
                            </View>
                        </View>
                        <View>

                        </View>

                    </View>
                <CustomButton title={"Continue"} widthSize='100%' borderRadius={0} />

                </View>
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
    listItem: {
        padding: 8,
        fontSize: 16,
        borderBottomColor: '#E5E5E5',
        color: '#666666',
    },
});
