import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';


const CustomCarGrouptile = ({ title, onPress , iconName}) => {
  return (
        <TouchableOpacity onPress={onPress} style={styles.contianer}>
            <View style={{flexDirection: 'row' , justifyContent: 'space-between'}}>
            <Text >
                {title}
            </Text>
            <View style={{marginRight: 16}}>
                <Icon name={iconName} />
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
        elevation : 2, 
        height : 48 ,
        // borderWidth: 0.05,
        borderRadius:4 , 
    }
})