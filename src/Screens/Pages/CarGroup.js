import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../Reusables/CustomHeader'
import CustomCarGrouptile from '../../Reusables/CustomCarGrouptile'

const CarGroup = () => {
    const carGroupTitles = [
        "Mercedes Benz Or Similar",
        "BMW 6 Series Or Similar",
        "Toyota Camry Or Similar",
        "Honda HR-V Or Similar",
        "Toyota Fortuner Or Similar"
      ];      
  return (
    <View style={styles.root}>
        <CustomHeader title={"Car Group"} iconPath={require('../../Assets/icbackarrow.png')} iconHeight={24} iconWidth={24}/>
        {
            carGroupTitles.map((item,id)=>
                <CustomCarGrouptile title={item}/>
            )
        }

    </View>
  )
}

export default CarGroup

const styles = StyleSheet.create({
    root:{
        backgroundColor :"#FFFFFF",
        flex :1 

    },
  
})