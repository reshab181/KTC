// Ashutosh Rai 

import { SafeAreaView, Text, View, TextInput, TouchableOpacity,useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../../component/CustomHeader';
import { useDispatch } from 'react-redux';
import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice';
import IcBackArrowSvg from '../../assets/svg/backarrow.svg'
import Icon from "react-native-vector-icons/EvilIcons";
import CloseSvg from '../../assets/svg/closeblack.svg';
const Citieslist = ({ route, navigation }) => {
      const theme = useColorScheme(); // Detect theme
    const isDark = theme === 'dark';
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
        // console.log('====================================');
        // console.log("SELECTED ITEM ", selectedItem);
        // console.log('====================================');
        dispatch(updateCorporateSlice({
            type: type,
            selectedItem: selectedItem
        }));
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor : 'white'}}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View>
                    {/* <CustomHeader
                        title={type}
                        Iconn={IcBackArrowSvg}
                        // iconPath={require('../../assets/icbackarrow.png')}
                        iconHeight={24}
                        iconWidth={24}
                        handleLeftIcon={() => navigation.goBack()}
                    /> */}
                </View>
                <View style={{ flexDirection : "row" , alignItems : "center" ,borderBottomWidth: 0.4 , borderColor: '#000000' , backgroundColor : 'white',  }}>
                    <TextInput
                        style={{
                            margin: 5 , 
                            borderWidth: 0.5,
                            borderColor: "#000000",  
                            borderRadius: 4,
                            height: 40,
                            // color: isDark ? '#000' : '#000' ,
                            backgroundColor :'white', 
                            paddingHorizontal: 10,
                            fontSize: 16,
                            width: '90%'
                        }}
                        placeholder={`Search ${type === 'rentalType' ? 'Rental Type' : type=== 'carGroup' ? 'Car Group' : type === 'city' ? 'City' : ""}`}
                        placeholderTextColor={isDark ? '#B0B0B0' : '#666666'}
                        value={searchText}
                        onChangeText={handleSearch}
                    />
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Icon name='close' size={24} color={'#000000'}/>
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 16}}>
                    {filteredList.map((item, index) => (
                        <TouchableOpacity style={{
                            // backgroundColor : "white",
                            // borderBottomWidth: 0.3,
                            height: 35, 
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
