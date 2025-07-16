
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const SearchResultList = ({imgPath, text1 , text2}) => {
    return (
        <View style={{flexDirection : "row" , height : 72 , backgroundColor : "#FFFFFF" , marginTop : 1 , marginBottom : 1}}>
            <View style={{height : 72,  marginStart: 24 , justifyContent : 'center'}}>
                <Image source={imgPath} style={{height: 24 ,width : 24}}/>
            </View>
            <View style={{justifyContent : 'center', marginStart : 26}}>
                <Text>
                    {text1} 
                </Text>
                <Text style={{marginTop : 7}}>
                    {text2} 
                </Text>
            </View>
        </View>
    )
}

export default SearchResultList

const styles = StyleSheet.create({})