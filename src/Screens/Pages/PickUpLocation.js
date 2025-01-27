// Author: Ashutosh Rai
// Component: PickUpLocation
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../component/CustomButtons'
import CustomHeader from '../../component/CustomHeader'
import CustomTextInpt from '../../component/CustomTextInpt'
import CustomTextInput from '../../component/CustomIconTextInput'
import SearchResultList from '../../component/SearchResultList'
const DATA = [
    {
        id: '1',
        title: 'First Item',
    },
    {
        id: '2',
        title: 'Second Item',
    },
    {
        id: '3',
        title: 'Third Item',
    },
    {
        id: '4',
        title: 'First Item',
    },
    {
        id: '5',
        title: 'Second Item',
    },
    {
        id: '6',
        title: 'Third Item',
    },
];

const PickUpLocation = ({navigation}) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#F1F1F3' }}>
            <CustomHeader handleLeftIcon={()=>{navigation.goBack()}} islogo={true} title={"Pickup Location"} iconPath={require('../../assets/icbackarrow.png')} iconHeight={24} iconWidth={24}/>
            <View style={{ marginStart: 16, marginEnd: 16, marginTop: 10 }}>
                <CustomTextInput placeholder={"India"} icon1={require('../../assets/Search.png')} icon2={require("../../assets/closee.png")}  />
            </View>
            <View style={{ marginStart: 16, marginEnd: 16, marginTop: 1 }}>
                {
                    DATA.map((item , index)=>{
                        <SearchResultList imgPath={require("../../assets/eye.png")} text1={"Message is 1 "} text2={"message is 2"} />
                    })
                }
            </View>
        </View>
    )
}

export default PickUpLocation

const styles = StyleSheet.create({})