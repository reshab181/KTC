// Author: Ashutosh Rai
// Component: CarCard
import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import CustomButton from './CustomButtons';

const CarCard = ({
  imgPath,
  iconPath,
  isSaved = false,
  height = 126,
  onIconPress,
  onBtnPress,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: height,
        width: '100%',
        backgroundColor: '#FFFFFF',
        elevation: 3,
        borderRadius: 4,
        marginBottom: 10,
      }}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 4,
          borderBottomRightRadius: 4,
          borderRightWidth: 2,
          borderRightColor: '#F1F1F3',
          marginRight: 10,
        }}>
        <Image
          source={imgPath}
          style={{height: 88, width: 158, marginTop: 19, marginLeft: 4}}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 11,
          marginRight: 8,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              flexWrap: 'wrap',
              width: 70,
              fontWeight: 600,
              color: '#212121',
            }}>
            Mercedes Benz CLS
          </Text>
          <Image source={iconPath} style={{height: 19, width: 20}} />
        </View>
        <View style={{}}>
          <Text style={{}}>Basic Rental : Amount</Text>
          <Text>You Save : Amount</Text>
        </View>
        <View style={{}}>
          <CustomButton
            title={'Book Now'}
            textSize={12}
            btnHeight={24}
            onPress={onBtnPress}
          />
        </View>
      </View>
    </View>
  );
};

export default CarCard;

const styles = StyleSheet.create({});
