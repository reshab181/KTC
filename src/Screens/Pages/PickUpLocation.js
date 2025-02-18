import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInput from '../../component/CustomIconTextInput';
import { fetchLocalities } from '../../Api/CorporateModuleApis';
import { useDispatch, useSelector } from 'react-redux';
import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import CloseSvg from '../../assets/svg/closeblack.svg';

const PickUpLocation = ({ navigation, route }) => {
    const [searchText, setSearchText] = useState('');
    const [locations, setLocations] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const dispatch = useDispatch();
    
    console.log("Route Params:", route.params?.eloc, route.params?.type);

    // useEffect(() => {
    //     if (searchText.length > 1) {
    //         setLoading(true); 
    //         console.log("Current Search Text:", searchText , route.params?.eloc);

    //         fetchLocalities(searchText, route.params?.eloc)
    //             .then(response => {
    //                 console.log("API Response:", response);
    //                 setLocations(response);
    //             })
    //             .catch(error => {
    //                 console.error("API Error:", error);
    //             })
    //             .finally(() => {
    //                 setLoading(false);
    //             });
    //     } else {
    //         setLocations([]); // Clear locations if input is too short
    //     }
    // }, [searchText]);
    useEffect(() => {
        if (searchText.length > 1 && route.params?.eloc) { 
            setLoading(true); 
            console.log("Current Search Text:", searchText, "Eloc:", route.params?.eloc);
    
            fetchLocalities(searchText, route.params?.eloc)
                .then(response => {
                    if (Array.isArray(response)) {
                        console.log("API Response:", response);
                        setLocations(response);
                    } else {
                        console.error("Unexpected API Response Format:", response);
                        setLocations([]); 
                    }
                })
                .catch(error => {
                    console.error("API Error:", error);
                    setLocations([]); 
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLocations([]); 
        }
    }, [searchText, route.params?.eloc]);
    
    
    const handleSelectLocation = (item) => {
        console.log("Selected Location:", item);
        dispatch(updateCorporateSlice({
            type: route.params?.type,
            selectedItem: item
        }));
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F1F1F3' }}>
            {/* Header */}
            {/* <CustomHeader
                handleLeftIcon={() => navigation.goBack()}
                islogo={true}
                title="Pickup Location"
                iconPath={require('../../assets/icbackarrow.png')}
                iconHeight={24}
                iconWidth={24}
            /> */}

            <View style={{ marginHorizontal: 16, marginTop: 10 }}>
                <CustomTextInput
                    lefticon="search"
                    Righticon={CloseSvg}
                    iconSize={20}
                    placeholder="Enter Location"
                    value={searchText}
                    handlePress={() => navigation.goBack() } 
                    onChangeText={setSearchText}
                />
            </View>

            {loading ? (
                <View style={styles.modalBackground}>
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                </View>
            ) : (
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item.mapplsPin.toString()} 
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSelectLocation(item)} style={styles.item}>
                            <View style={styles.locationContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon name="map-marker" size={20} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.placeName}>{item.placeName}</Text>
                                    <Text style={styles.placeAddress} numberOfLines={2} ellipsizeMode="tail">
                                        {item.placeAddress}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default PickUpLocation;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 10,
        marginHorizontal: 16,
        borderBottomWidth: 0.3,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    textContainer: {
        flex: 1,
    },
    placeName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    placeAddress: {
        fontSize: 12,
        color: 'gray',
        flexShrink: 1,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
        width: 80,
        height: 80,
        backgroundColor: 'rgba(44, 12, 223, 0.1)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
