// Author: Ashutosh Rai
// Component: Booking Confirmation
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomHeader from '../../Reusables/CustomHeader';
import ProgessCard from '../../Reusables/ProgessCard';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../Reusables/CustomButtons';
import { useNavigation } from '@react-navigation/native';

const MyBooking = ({navigation}) => {

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <CustomHeader
          title="My Booking"
          iconPath={require('../../Assets/icbackarrow.png')}
          iconHeight={24}
          iconWidth={24}
          handleLeftIcon={()=>{navigation.goBack()}}
        />
        <ProgessCard />
        <View style={{ marginTop: 21, backgroundColor: "#FFFFFF", marginHorizontal: 16, borderRadius: 4, elevation: 5, borderColor: '#DBDBDB' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 9 }}>
            <View>
              <Text style={{ color: '#555555' }}>Mercedes Benz CLS</Text>
            </View>
            <View>
              <Text>Booking ID: 229675</Text>
            </View>
          </View>
          <Image source={require('../../Assets/cardemo.png')} />
          <View style={{ marginHorizontal: 14 , paddingBottom: 10 , }}>
            <Text style={{color: '#212121', fontWeight: '500', marginVertical: 10 , fontSize: 14}}>Santosh Kumar Jha</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' , marginBottom: 10 }}>
              <Icon name='envelope-o' size={15} />
              <Text style={{marginLeft: 9 , }}>Email ID: santosh@ktc.com</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' , marginBottom: 10}}>
              <Icon name='calendar' size={15} />
              <Text style={{marginLeft: 9 , }}>Booking Date: 10-05-2022</Text>
            </View>
              <CustomButton title={'Track Chauffeur'} btnHeight={32} textSize={14} fontWeight={400} onPress={()=>{navigation.navigate('Track')}}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F1F1F3',
  },

});

export default MyBooking;
