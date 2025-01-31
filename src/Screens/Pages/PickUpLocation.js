import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomButton from '../../component/CustomButtons';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInput from '../../component/CustomIconTextInput';
import SearchResultList from '../../component/SearchResultList';
import { fetchLocalities } from '../../Api/CorporateModuleApis';

const PickUpLocation = ({ navigation, route }) => {
    const [searchText, setSearchText] = useState('');
    const [locations, setLocations] = useState([]); // Store API results
    console.log('====================================');
    console.log("Route", route.params?.eloc);

    console.log('====================================');
    useEffect(() => {
        if (searchText.length > 3) {
            fetchLocalities(searchText , route.params?.eloc )
                .then(response => {
                    console.log("Response", response);
                    setLocations(response); // ✅ Update state with API data
                })
                .catch(error => {
                    console.error("API Error:", error);
                });
        } else {
            setLocations([]); // Clear results if input is less than 4 chars
        }
    }, [searchText]);
    return (
        <View style={{ flex: 1, backgroundColor: '#F1F1F3' }}>
            <CustomHeader
                handleLeftIcon={() => { navigation.goBack(); }}
                islogo={true}
                title={"Pickup Location"}
                iconPath={require('../../assets/icbackarrow.png')}
                iconHeight={24}
                iconWidth={24}
            />

            <View style={{ marginStart: 16, marginEnd: 16, marginTop: 10 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter location"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <FlatList
                data={locations}
                keyExtractor={(item) => item.mapplsPin} // Using unique ID
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.placeName}>{item.placeName}</Text>
                        <Text style={styles.placeAddress}>{item.placeAddress}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default PickUpLocation;

const styles = StyleSheet.create({
        input: {
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ccc',
        },
        item: {
            backgroundColor: '#fff',
            padding: 10,
            marginVertical: 5,
            borderRadius: 5,
        },
        placeName: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        placeAddress: {
            fontSize: 14,
            color: 'gray',
        },
});
