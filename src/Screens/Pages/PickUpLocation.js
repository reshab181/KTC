import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../Reusables/CustomButtons'
import CustomHeader from '../../Reusables/CustomHeader'
import CustomTextInpt from '../../Reusables/CustomTextInpt'
import CustomTextInput from '../../Reusables/CustomIconTextInput'
import SearchResultList from '../../Reusables/SearchResultList'
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const PickUpLocation = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#F1F1F3' }}>
            <CustomHeader islogo={true} title={"Pickup Location"} iconPath={require('../../Assets/icbackarrow.png')} iconHeight={24} iconWidth={24}/>
            <View style={{ marginStart: 16, marginEnd: 16, marginTop: 10 }}>
                <CustomTextInput placeholder={"India"} icon1={require('../../Assets/Search.png')} icon2={require("../../Assets/closee.png")} />
            </View>
            <View style={{ marginStart: 16, marginEnd: 16, marginTop: 1 }}>
                <FlatList
                    data={DATA}

                    renderItem={({ item }) =>
                        <SearchResultList imgPath={require("../../Assets/eye.png")} text1={"Message is 1 "} text2={"message is 2"} />

                    }
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

export default PickUpLocation

const styles = StyleSheet.create({})