// Ashutosh Rai 
// PickUpLocation
import { FlatList, StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomButton from '../../component/CustomButtons';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInput from '../../component/CustomIconTextInput';
import SearchResultList from '../../component/SearchResultList';
import { fetchLocalities } from '../../Api/CorporateModuleApis';
import { useDispatch } from 'react-redux';
import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import CloseSvg from '../../assets/svg/closeblack.svg'

const PickUpLocation = ({ navigation, route }) => {
    const [searchText, setSearchText] = useState('');
    const [locations, setLocations] = useState([]); // Store API results
    const [loading, setLoading] = useState(false); // Loader state
    const dispatch = useDispatch();
    console.log("Route", route.params?.eloc, route.params?.type);

    useEffect(() => {
        if (searchText.length > 3) {
            setLoading(true); // Show loader
            fetchLocalities(searchText, route.params?.eloc)
                .then(response => {
                    console.log("Response", response);
                    setLocations(response); 
                })
                .catch(error => {
                    console.error("API Error:", error);
                })
                .finally(() => {
                    setLoading(false); 
                });
        } else {
            setLocations([]); 
        }
    }, [searchText]);

    const handleSelectLocation = (item) => {
        console.log("Selected Location:", item);
        dispatch(updateCorporateSlice({
            type: route.params.type,
            selectedItem: item
        }));
        navigation.goBack();
    };

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
                <CustomTextInput 
                lefticon={'search'}
                Righticon={CloseSvg} 
                iconSize={20} 
                placeholder={"Enter Location"} 
                value={searchText} 
                handlePress={()=>{
                    setLocations([]);
                }}
                onChangeText={setSearchText}/>
            </View>

            {loading ? ( // ✅ Show loader when API call is in progress
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item.mapplsPin} // Using unique ID
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
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
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
});
