
import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, useColorScheme, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInput from '../../component/CustomIconTextInput';
import { fetchLocalities } from '../../Api/CorporateModuleApis';
import { useDispatch } from 'react-redux';
import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import CloseSvg from '../../assets/svg/closeblack.svg';
import MapplsGL from 'mappls-map-react-native';
import CloseIcon from '../../assets/icon/CloseIcon';

const PickUpLocation = ({ navigation, route }) => {
    // const theme = useColorScheme();
    // const isDark = theme === 'dark';
    
    const [searchText, setSearchText] = useState('');
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [geocoding, setGeocoding] = useState(false);
    const [debounceTimer, setDebounceTimer] = useState(null);
    const [manualAddressCache, setManualAddressCache] = useState({});

    const dispatch = useDispatch();
    
    console.log("Route Params:", route.params?.eloc, route.params?.type);

    const geocodeManualAddress = async (address) => {
        try {
            console.log("🔍 Geocoding address:", address);
            const response = await MapplsGL.RestApi.geocode({ 
                address: address,
                itemCount: 1 
            });

            console.log("📍 Geocoding API Response:", response);

            if (response?.results?.length > 0) {
                const result = response.results[0];
                console.log("✅ MapplsPin from API:", result.mapplsPin);
                
                const geocodedData = {
                    placeName: "",
                    placeAddress: address,
                    mapplsPin: result.mapplsPin,
                    latitude: result.latitude,
                    longitude: result.longitude,
                    isManual: true,
                    isGeocoded: true
                };
                
                console.log(" Final geocoded object:", geocodedData);
                return geocodedData;
            }
            return null;
        } catch (error) {
            console.error(" Geocoding failed:", error);
            return null;
        }
    };

    // Debounced search function for autosuggestions only
    const performSearch = (text) => {
        if (text.length > 1 && route.params?.eloc) {
            setLoading(true);
            console.log("Current Search Text:", text, "Eloc:", route.params?.eloc);
    
            fetchLocalities(text, route.params?.eloc)
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
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        const timer = setTimeout(() => {
            performSearch(searchText);
        }, 500); // 500ms delay

        setDebounceTimer(timer);

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [searchText, route.params?.eloc]);
    
    const handleSelectLocation = async (item) => {
        console.log("Selected Location:", item);
        
        // For all locations (manual or autosuggest), use as-is since manual ones are already geocoded
        dispatch(updateCorporateSlice({
            type: route.params?.type,
            selectedItem: item
        }));
        
        navigation.goBack();
    };

    const getDisplayData = async () => {
        if (searchText.length <= 1) {
            return [];
        }

        if (locations.length > 0) {
            // Check if there's an exact match
            const exactMatch = locations.some(loc => 
                loc.placeAddress?.toLowerCase().trim() === searchText.toLowerCase().trim() ||
                loc.placeName?.toLowerCase().trim() === searchText.toLowerCase().trim()
            );

            // If no exact match, show manual entry option with geocoded mapplsPin
            if (!exactMatch) {
                const trimmedAddress = searchText.trim();
                
                // Check if we already have geocoded this address
                if (manualAddressCache[trimmedAddress]) {
                    return [manualAddressCache[trimmedAddress], ...locations];
                }
                
                // Geocode the manual address to get proper mapplsPin
                setGeocoding(true);
                const geocodedAddress = await geocodeManualAddress(trimmedAddress);
                setGeocoding(false);
                
                if (geocodedAddress) {
                    // Cache the geocoded result
                    setManualAddressCache(prev => ({
                        ...prev,
                        [trimmedAddress]: geocodedAddress
                    }));
                    return [geocodedAddress, ...locations];
                } else {
                    // Fallback if geocoding fails
                    const fallbackAddress = {
                        placeName: "Use this address",
                        placeAddress: trimmedAddress,
                        mapplsPin: `manual_${Date.now()}`,
                        isManual: true,
                        isGeocoded: false
                    };
                    return [fallbackAddress, ...locations];
                }
            } else {
                return locations;
            }
        } else {
            // No autosuggest results, geocode the manual entry
            const trimmedAddress = searchText.trim();
            
            // Check if we already have geocoded this address
            if (manualAddressCache[trimmedAddress]) {
                return [manualAddressCache[trimmedAddress]];
            }
            
            setGeocoding(true);
            const geocodedAddress = await geocodeManualAddress(trimmedAddress);
            setGeocoding(false);
            
            if (geocodedAddress) {
                // Cache the geocoded result
                setManualAddressCache(prev => ({
                    ...prev,
                    [trimmedAddress]: geocodedAddress
                }));
                return [geocodedAddress];
            } else {
                // Fallback if geocoding fails
                return [{
                    placeName: "Use this address",
                    placeAddress: trimmedAddress,
                    mapplsPin: `manual_${Date.now()}`,
                    isManual: true,
                    isGeocoded: false
                }];
            }
        }
    };

    const [displayData, setDisplayData] = useState([]);

    // Update display data when search text or locations change
    useEffect(() => {
        const updateDisplayData = async () => {
            const data = await getDisplayData();
            setDisplayData(data);
        };
        
        if (searchText.length > 1) {
            updateDisplayData();
        } else {
            setDisplayData([]);
        }
    }, [searchText, locations]);

    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container,  styles.lightContainer]}>
            <View style={styles.searchContainer}>
                <CustomTextInput
                    lefticon="search"
                    Righticon={CloseIcon}
                    iconSize={20}
                    iconColor={ '#888'}
                    placeholder="Search or enter address"
                    value={searchText}
                    handlePress={() => navigation.goBack()}
                    onChangeText={setSearchText}
                    inputStyle={ styles.lightInput}
                    placeholderTextColor={ '#888'}
                    containerStyle={styles.lightInputContainer}
                />
            </View>

            {(loading || geocoding) ? (
                <View style={styles.loaderWrapper}>
                    <ActivityIndicator size="large" color={ '#2C0CDF'} />
                    <Text style={[styles.loadingText,  styles.lightText]}>
                        {geocoding ? 'Getting location details...' : 'Searching...'}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={displayData}
                    keyExtractor={(item, index) => `${item.mapplsPin}_${index}`}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={[styles.emptyText, styles.lightText]}>
                                {searchText.length > 1 
                                    ? "Start typing to search locations" 
                                    : "Enter an address to search"}
                            </Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => handleSelectLocation(item)} 
                            style={[
                                styles.item, 
                               styles.lightItem,
                                item.isManual && styles.manualItem
                            ]}
                        >
                            <View style={styles.locationContainer}>
                                <View style={[styles.iconContainer, styles.lightIconContainer]}>
                                    <Icon 
                                        name="map-marker" 
                                        size={20} 
                                        color={item.isManual ?  '#673AB7' : ( '#3C3567')} 
                                    />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={[
                                        styles.placeName, 
                                         styles.lightPlaceName,
                                        item.isManual && styles.manualPlaceName
                                    ]}>
                                        {item.placeName}
                                    </Text>
                                    <Text 
                                        style={[
                                            styles.placeAddress, 
                                        styles.lightPlaceAddress,
                                            item.isManual && styles.manualAddress
                                        ]} 
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
        </SafeAreaView>
    );
};

export default PickUpLocation;

const styles = StyleSheet.create({
    safeArea:{
        flex:1
    },
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
    manualItem: {
        borderWidth: 1,
        borderColor: '#333',
        // backgroundColor: 'rgba(44, 12, 223, 0.05)',
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
    manualPlaceName: {
        color: '#2C0CDF',
        fontWeight: '700',
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
    manualAddress: {
        color:  '#673AB7',
        fontWeight: '500',
    },
    loaderWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
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