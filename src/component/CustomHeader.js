// Author: Ashutosh Rai
// Component: CustomHeader
import React from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const CustomHeader = ({ title,justifyContent, imgPath, iconPath, iconHeight = 30,handleLeftIcon,  iconWidth = 36 , leftTitle, handlePress}) => {
  const { width: winWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    header: {
      justifyContent: justifyContent? justifyContent: '',
      width: winWidth,
      height: 60,
      backgroundColor: '#3C3567',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 20,
      marginStart: 16,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    icon: {
      height: iconHeight,
      width: iconWidth,
    },
    img: {
      height: 27,
      width: 69,
      marginStart: 20,
    },
    ltitle:{
      position: 'absolute',
      right: 20, 
    },
    ltitletxt: {
      color: "#FFFFFF", 

    }
  });
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
      <TouchableOpacity onPress={handleLeftIcon}>
      {iconPath && <Image source={iconPath} style={styles.icon} />}
      </TouchableOpacity>
      {imgPath && <Image source={imgPath} style={styles.img} />}
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.ltitle} onPress={handlePress}>
        <Text style={styles.ltitletxt}>{leftTitle}</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default CustomHeader;

