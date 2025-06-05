import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, useColorScheme } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInput from '../../component/CustomIconTextInput';
import { fetchLocalities } from '../../Api/CorporateModuleApis';
import { useDispatch } from 'react-redux';
import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import CloseSvg from '../../assets/svg/closeblack.svg';

const PickUpLocation = ({ navigation, route }) => {
    const theme = useColorScheme();
    const isDark = theme === 'dark';
    
    const [searchText, setSearchText] = useState('');
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mapplsPins, setMapplsPins] = useState([]);
    const [manualAddress, setManualAddress] = useState('');

    const dispatch = useDispatch();
    
    console.log("Route Params:", route.params?.eloc, route.params?.type);

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
    const allLocations = searchText.length > 1 && locations.length === 0
        ? [{ 
            placeName: "", 
            placeAddress: searchText,
            mapplsPin: `manual_${Date.now()}` // Unique ID for manual entry
          }]
        : locations;
    // return (
    //     <View style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
    //         {/* <CustomHeader
    //             handleLeftIcon={() => navigation.goBack()}
    //             islogo={true}
    //             title="Pickup Location"
    //             iconPath={require('../../assets/icbackarrow.png')}
    //             iconHeight={24}
    //             iconWidth={24}
    //             titleStyle={isDark ? styles.darkHeaderTitle : styles.lightHeaderTitle}
    //             containerStyle={isDark ? styles.darkHeader : styles.lightHeader}
    //         /> */}

    //         <View style={styles.searchContainer}>
    //             <CustomTextInput
    //                 lefticon="search"
    //                 Righticon={CloseSvg}
    //                 iconSize={20}
    //                 iconColor={isDark ? '#fff' : '#000'}
    //                 placeholder="Enter Location"
    //                 value={searchText}
    //                 handlePress={() => navigation.goBack()}
    //                 onChangeText={setSearchText}
    //                 inputStyle={isDark ? styles.darkInput : styles.lightInput}
    //                 placeholderTextColor={isDark ? '#aaa' : '#888'}
    //                 containerStyle={isDark ? styles.darkInputContainer : styles.lightInputContainer}
    //             />
    //         </View>

    //         {loading ? (
    //             <View style={styles.loaderWrapper}>
    //                 <View style={[styles.loaderContainer, isDark ? styles.darkLoader : styles.lightLoader]}>
    //                     <ActivityIndicator size="large" color={isDark ? '#fff' : '#2C0CDF'} />
    //                 </View>
    //             </View>
    //         ) : (
    //             <FlatList
    //                 data={locations}
    //                 keyExtractor={(item) => item.mapplsPin.toString()}
    //                 ListEmptyComponent={() => (
    //                     searchText.length > 1 ? (
    //                         <View style={styles.emptyContainer}>
    //                             <Text style={[styles.emptyText, isDark ? styles.darkText : styles.lightText]}>
    //                                 No locations found
    //                             </Text>
    //                         </View>
    //                     ) : null
    //                 )}
    //                 renderItem={({ item }) => (
    //                     <TouchableOpacity 
    //                         onPress={() => handleSelectLocation(item)} 
    //                         style={[styles.item, isDark ? styles.darkItem : styles.lightItem]}
    //                     >
    //                         <View style={styles.locationContainer}>
    //                             <View style={[styles.iconContainer, isDark ? styles.darkIconContainer : styles.lightIconContainer]}>
    //                                 <Icon name="map-marker" size={20} color={isDark ? '#fff' : '#3C3567'} />
    //                             </View>
    //                             <View style={styles.textContainer}>
    //                                 <Text style={[styles.placeName, isDark ? styles.darkPlaceName : styles.lightPlaceName]}>
    //                                     {item.placeName}
    //                                 </Text>
    //                                 <Text 
    //                                     style={[styles.placeAddress, isDark ? styles.darkPlaceAddress : styles.lightPlaceAddress]} 
    //                                     numberOfLines={2} 
    //                                     ellipsizeMode="tail"
    //                                 >
    //                                     {item.placeAddress}
    //                                 </Text>
    //                             </View>
    //                         </View>
    //                     </TouchableOpacity>
    //                 )}
    //                 contentContainerStyle={styles.listContent}
    //             />
    //         )}
    //     </View>
    // );
    return (
        <View style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
            <View style={styles.searchContainer}>
                <CustomTextInput
                    lefticon="search"
                    Righticon={CloseSvg}
                    iconSize={20}
                    iconColor={isDark ? '#fff' : '#000'}
                    placeholder="Search or enter address"
                    value={searchText}
                    handlePress={() => navigation.goBack()}
                    onChangeText={setSearchText}
                    inputStyle={isDark ? styles.darkInput : styles.lightInput}
                    placeholderTextColor={isDark ? '#aaa' : '#888'}
                    containerStyle={isDark ? styles.darkInputContainer : styles.lightInputContainer}
                />
            </View>

            {loading ? (
                <View style={styles.loaderWrapper}>
                    <ActivityIndicator size="large" color={isDark ? '#fff' : '#2C0CDF'} />
                </View>
            ) : (
                <FlatList
                    data={allLocations}
                    keyExtractor={(item) => item.mapplsPin.toString()}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={[styles.emptyText, isDark ? styles.darkText : styles.lightText]}>
                                {searchText.length > 1 
                                    ? "No locations found" 
                                    : "Start typing to search locations"}
                            </Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => handleSelectLocation(item)} 
                            style={[styles.item, isDark ? styles.darkItem : styles.lightItem]}
                        >
                            <View style={styles.locationContainer}>
                                {/* <View style={[styles.iconContainer, isDark ? styles.darkIconContainer : styles.lightIconContainer]}>
                                    <Icon 
                                        name={item.mapplsPin.startsWith('manual') ? "edit" : "map-marker"} 
                                        size={20} 
                                        color={isDark ? '#fff' : '#3C3567'} 
                                    />
                                </View> */}
                                <View style={styles.textContainer}>
                                    <Text style={[styles.placeName, isDark ? styles.darkPlaceName : styles.lightPlaceName]}>
                                        {item.placeName}
                                    </Text>
                                    <Text 
                                        style={[styles.placeAddress, isDark ? styles.darkPlaceAddress : styles.lightPlaceAddress]} 
                                        numberOfLines={2} 
                                        ellipsizeMode="tail"
                                    >
                                        {item.placeAddress}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

export default PickUpLocation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lightContainer: {
        backgroundColor: '#F8F8FA',
    },
    darkContainer: {
        backgroundColor: '#121212',
    },
    lightHeader: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    darkHeader: {
        backgroundColor: '#1E1E1E',
        borderBottomColor: '#333',
        borderBottomWidth: 1,
    },
    lightHeaderTitle: {
        color: '#333',
    },
    darkHeaderTitle: {
        color: '#fff',
    },
    searchContainer: {
        marginHorizontal: 16,
        marginVertical: 12,
    },
    lightInput: {
        color: '#333',
    },
    darkInput: {
        color: '#fff',
    },
    lightInputContainer: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    darkInputContainer: {
        backgroundColor: '#2A2A2A',
        borderColor: '#444',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    listContent: {
        paddingBottom: 20,
    },
    item: {
        padding: 14,
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 8,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    lightItem: {
        backgroundColor: '#fff',
        borderBottomWidth: 0,
    },
    darkItem: {
        backgroundColor: '#2A2A2A',
        borderBottomWidth: 0,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    lightIconContainer: {
        backgroundColor: '#F0F0FF',
    },
    darkIconContainer: {
        backgroundColor: '#333',
    },
    textContainer: {
        flex: 1,
    },
    placeName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    lightPlaceName: {
        color: '#333',
    },
    darkPlaceName: {
        color: '#fff',
    },
    placeAddress: {
        fontSize: 13,
        flexShrink: 1,
    },
    lightPlaceAddress: {
        color: '#777',
    },
    darkPlaceAddress: {
        color: '#aaa',
    },
    loaderWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightLoader: {
        backgroundColor: 'rgba(44, 12, 223, 0.1)',
    },
    darkLoader: {
        backgroundColor: 'rgba(60, 53, 103, 0.3)',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
    },
    lightText: {
        color: '#777',
    },
    darkText: {
        color: '#aaa',
    },
});