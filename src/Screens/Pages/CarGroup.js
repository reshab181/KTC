
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../component/CustomHeader'
import CustomCarGrouptile from '../../component/CustomCarGrouptile'
import CustomButton from '../../component/CustomButtons'
import { useDispatch } from 'react-redux'
import { updateCorporateSlice } from '../../Redux/slice/CorporateSlice'

const CarGroup = ({navigation, route}) => {
    const carGroupTitles = route.params.list || []; 
    const dispatch = useDispatch();
    const handlePress = (selectedItem) => {
        dispatch(updateCorporateSlice({
                type:route.params.type,
                selectedItem:selectedItem
        }));

        navigation.navigate('CarSelection')
    }
  return (
    <View style={styles.root}>
        <CustomHeader title={"Car Group"} iconPath={require('../../assets/icbackarrow.png')} iconHeight={24} iconWidth={24} handleLeftIcon={()=>{navigation.goBack()}}/>
        {
            carGroupTitles.map((item,id)=>
                <CustomCarGrouptile key={id} title={item} onPress={()=>handlePress(item)} iconName={'chevron-right'} />
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
    },
  
})