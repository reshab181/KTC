import React from 'react';
import { useWindowDimensions } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import Backarrow from '../Assets/backarrow';

const CustomHeader = ({ title, imgPath, iconPath, iconHeight, iconWidth }) => {
  const styles = useStyles();
  return (
    <View style={styles.header}>
        {iconPath ? <Image source={iconPath} style={[styles.icon,{height: iconHeight,width: iconWidth}]} /> : null}
        {imgPath ? <Image source={imgPath} style={styles.img} /> : null}
      <Text style={styles.title}>{title}</Text>

    </View>
  );
};

export default CustomHeader;

function useStyles(){
    const { width: winwidth, height: winheight } = useWindowDimensions();
    return styles = StyleSheet.create({
        header: {
          width: winwidth, 
          height: 60,
          backgroundColor: '#3C3567',
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
        },
        title: {
          fontSize: 24,
          marginStart : 16, 
          color: '#FFFFFF', 
          fontWeight: '600',
        },
        icon : {
            height: 30 , 
            width: 36, 
            marginStart : 10

    },
    img: {
      height: 27,
      width: 69,
      marginStart: 20,
    }
  });
}
