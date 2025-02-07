// Ashutosh Rai 

import { SafeAreaView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../../component/CustomHeader';
import { useDispatch } from 'react-redux';
import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice';
import IcBackArrowSvg from '../../assets/svg/backarrow.svg'

const Citieslist = ({ route, navigation }) => {
    const { list = [], type = 'city' } = route.params ?? {};
    const [searchText, setSearchText] = useState('');
    const [filteredList, setFilteredList] = useState(list);
    const dispatch = useDispatch();

    console.log("Received List:", list, "Type:", type);

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = list.filter(item =>
            item.toLowerCase().startsWith(text.toLowerCase())
        );
        setFilteredList(filtered);
    };

    const handleSelect = (selectedItem) => {
        console.log('====================================');
        console.log("SELECTED ITEM ", selectedItem);
        console.log('====================================');
        dispatch(updateCorporateSlice({
            type: type,
            selectedItem: selectedItem
        }));
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View>
                    <CustomHeader
                        title={type}
                        Iconn={IcBackArrowSvg}
                        // iconPath={require('../../assets/icbackarrow.png')}
                        iconHeight={24}
                        iconWidth={24}
                        handleLeftIcon={() => navigation.goBack()}
                    />
                </View>
                <View style={{ marginHorizontal: 16, marginTop: 10 }}>
                    <TextInput
                        style={{
                            height: 50,
                            backgroundColor :'white', 
                            paddingHorizontal: 10,
                            fontSize: 16,
                            borderBottomWidth: 1 ,
                        }}
                        placeholder={`Search ${type}`}
                        value={searchText}
                        onChangeText={handleSearch}
                    />
                </View>
                <View style={{ marginHorizontal: 16}}>
                    {filteredList.map((item, index) => (
                        <TouchableOpacity style={{
                            backgroundColor : "white",
                            borderBottomWidth: 0.3,
                            height: 40, 
                            justifyContent: 'center'
                        }} key={index} onPress={() => handleSelect(item)}>
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 16,
                                    marginVertical: 4,
                                    marginHorizontal: 10,
                                }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Citieslist;
