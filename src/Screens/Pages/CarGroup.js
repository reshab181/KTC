// Author: Ashutosh Rai
// Component: Car Group
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../Reusables/CustomHeader'
import CustomCarGrouptile from '../../Reusables/CustomCarGrouptile'
import CustomButton from '../../Reusables/CustomButtons'

const CarGroup = ({navigation}) => {
    const carGroupTitles = [
        "Mercedes Benz Or Similar",
        "BMW 6 Series Or Similar",
        "Toyota Camry Or Similar",
        "Honda HR-V Or Similar",
        "Toyota Fortuner Or Similar"
      ];      
  return (
    <View style={styles.root}>
        <CustomHeader title={"Car Group"} iconPath={require('../../Assets/icbackarrow.png')} iconHeight={24} iconWidth={24} handleLeftIcon={()=>{navigation.goBack()}}/>
        {
            carGroupTitles.map((item,id)=>
                <CustomCarGrouptile key={id} title={item} onPress={()=>navigation.navigate('CarSelection')} iconName={'chevron-right'} />
            )
        }
       

    </View>
  )
}

export default CarGroup

const styles = StyleSheet.create({
    root:{
        backgroundColor :"#FFFFFF",
        flex :1 , 
        // marginBottom: 20

    },
  
})