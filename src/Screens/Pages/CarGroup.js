// Author: Ashutosh Rai
// Component: Booking Confirmation
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
        {/* <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <CustomButton title={"Next"} borderRadius={0} onPress={()=>{}}/>
        </View> */}

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