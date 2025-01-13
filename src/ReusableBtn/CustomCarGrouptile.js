import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomCarGrouptile = ({ title, onPress}) => {
  return (
        <TouchableOpacity onPress={()=>{onPress} } style={styles.contianer}>
            <View style={{flexDirection: 'row' , justifyContent: 'space-between'}}>
            <Text >
                {title}
            </Text>
            <View style={{}}>
                <Image source={require('../Assets/navigatenext.png')} style={{height: 24, width : 24 , marginEnd : 20 }}/>
            </View>
            </View>
        </TouchableOpacity>
  )
}

export default CustomCarGrouptile

const styles = StyleSheet.create({
    contianer: {
        paddingStart: 16, 
        justifyContent: 'center',
        fontSize: 16,
        backgroundColor : "#FFFFFF",
        color: '#666666',
        elevation : 4, 
        height : 48 , 
    }
})