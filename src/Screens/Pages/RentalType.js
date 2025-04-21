
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../../component/CustomHeader';
import { useDispatch } from 'react-redux';
import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice';

const RentalType = ({ route, navigation }) => {
    const { list = [],type = 'assignment'} = route.params ?? {};
    const [searchText, setSearchText] = useState('');
    const [filteredList, setFilteredList] = useState(list);
    const dispatch = useDispatch();


    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = list.filter(item => 
            item.toLowerCase().startsWith(text.toLowerCase())
        );
        setFilteredList(filtered);
    };

    const handleSelect = (selectedItem) => {
        dispatch(updateCorporateSlice({
            type: type,
            selectedItem: selectedItem
        }))
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View>
                    <CustomHeader
                        title={"Select Rental Type"}
                        iconPath={require('../../assets/icbackarrow.png')}
                        iconHeight={24}
                        iconWidth={24}
                    />
                </View>
                <View style={{ marginHorizontal: 16, marginTop: 10 }}>
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: 10,
                            fontSize: 16,
                            color: 'black',
                        }}
                        placeholder={`Search Rental Type"`}
                        value={searchText}
                        onChangeText={handleSearch}
                    />
                </View>
                <View style={{ margin: 16 }}>
                    {filteredList.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handleSelect(item)}>
                            <Text style={{ color: 'black', fontSize: 16, marginVertical: 4 }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
  )
}

export default RentalType

const styles = StyleSheet.create({})