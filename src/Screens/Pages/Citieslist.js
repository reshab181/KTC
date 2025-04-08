import { SafeAreaView, Text, View, TextInput, TouchableOpacity, useColorScheme, StyleSheet, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../../component/CustomHeader';
import { useDispatch } from 'react-redux';
import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice';
import IcBackArrowSvg from '../../assets/svg/backarrow.svg';
import Icon from "react-native-vector-icons/EvilIcons";
import CloseSvg from '../../assets/svg/closeblack.svg';

const Citieslist = ({ route, navigation }) => {
    const theme = useColorScheme();
    const isDark = theme === 'dark';
    
    const { list = [], type = 'city_of_usage' } = route.params ?? {};
    const [searchText, setSearchText] = useState('');
    const [filteredList, setFilteredList] = useState(list);
    const dispatch = useDispatch();

    console.log("Received List:", list, "Type:", type);

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = list.filter(item =>
            item.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredList(filtered);
    };

    const handleSelect = (selectedItem) => {
        dispatch(updateCorporateSlice({
            type: type,
            selectedItem: selectedItem
        }));
        navigation.goBack();
    };

    const getTitle = () => {
        switch(type) {
            case 'rentalType': return 'Select Rental Type';
            case 'carGroup': return 'Select Car Group';
            case 'city': return 'Select City';
            default: return 'Select ' + type.charAt(0).toUpperCase() + type.slice(1);
        }
    };

    const getPlaceholderText = () => {
        switch(type) {
            case 'rentalType': return 'Search Rental Type';
            case 'carGroup': return 'Search Car Group';
            case 'city': return 'Search City';
            default: return 'Search ' ;
        }
    };

    return (
        <SafeAreaView style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            
            {/* <CustomHeader
                title={getTitle()}
                Iconn={IcBackArrowSvg}
                iconHeight={24}
                iconWidth={24}
                handleLeftIcon={() => navigation.goBack()}
                containerStyle={isDark ? styles.darkHeader : styles.lightHeader}
                titleStyle={isDark ? styles.darkHeaderTitle : styles.lightHeaderTitle}
            /> */}
            
            <View style={[styles.searchContainer, isDark ? styles.darkSearchContainer : styles.lightSearchContainer]}>
                <View style={styles.inputWrapper}>
                    <Icon name="search" size={24} color={isDark ? '#999' : '#666'} style={styles.searchIcon} />
                    <TextInput
                        style={[styles.input, isDark ? styles.darkInput : styles.lightInput]}
                        placeholder={getPlaceholderText()}
                        placeholderTextColor={isDark ? '#999' : '#666'}
                        value={searchText}
                        onChangeText={handleSearch}
                    />
                    {searchText.length > 0 && (
                        <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearButton}>
                            <Icon name="close" size={22} color={isDark ? '#fff' : '#000'} />
                        </TouchableOpacity>
                    )}
                </View>
                
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={[styles.cancelButton, isDark ? styles.darkCancelButton : styles.lightCancelButton]}
                >
                    <Text style={[styles.cancelText, isDark ? styles.darkCancelText : styles.lightCancelText]}>Cancel</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView 
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
            >
                {filteredList.length > 0 ? (
                    filteredList.map((item, index) => (
                        <TouchableOpacity 
                            style={[
                                styles.itemContainer,
                                isDark ? styles.darkItemContainer : styles.lightItemContainer,
                                index === filteredList.length - 1 && styles.lastItem
                            ]} 
                            key={index} 
                            onPress={() => handleSelect(item)}
                        >
                            <Text style={[
                                styles.itemText,
                                isDark ? styles.darkItemText : styles.lightItemText
                            ]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, isDark ? styles.darkEmptyText : styles.lightEmptyText]}>
                            No {type === 'rentalType' ? 'rental types' : type === 'carGroup' ? 'car groups' : 'cities'} found
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    lightSearchContainer: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
    },
    darkSearchContainer: {
        backgroundColor: '#1E1E1E',
        borderBottomColor: '#333',
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 8,
        height: 46,
    },
    lightInput: {
        backgroundColor: '#f2f2f2',
        color: '#333',
    },
    darkInput: {
        backgroundColor: '#2A2A2A',
        color: '#fff',
    },
    input: {
        flex: 1,
        height: 46,
        fontSize: 16,
        paddingLeft: 36,
        borderRadius: 8,
    },
    searchIcon: {
        position: 'absolute',
        left: 12,
        zIndex: 1,
    },
    clearButton: {
        padding: 8,
    },
    cancelButton: {
        marginLeft: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    lightCancelButton: {
        color: '#3C3567',
    },
    darkCancelButton: {
        color: '#a0a0ff',
    },
    cancelText: {
        fontSize: 16,
    },
    lightCancelText: {
        color: '#3C3567',
    },
    darkCancelText: {
        color: '#a0a0ff',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 20,
    },
    itemContainer: {
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    lightItemContainer: {
        borderBottomColor: '#eee',
    },
    darkItemContainer: {
        borderBottomColor: '#333',
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    itemText: {
        fontSize: 16,
    },
    lightItemText: {
        color: '#333',
    },
    darkItemText: {
        color: '#fff',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
    },
    lightEmptyText: {
        color: '#777',
    },
    darkEmptyText: {
        color: '#aaa',
    },
});

export default Citieslist;