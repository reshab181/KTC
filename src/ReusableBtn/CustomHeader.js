import React from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Image } from 'react-native';

const CustomHeader = ({ title, imgPath, iconPath, iconHeight = 30, iconWidth = 36 }) => {
  const { width: winWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    header: {
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
  });

  return (
    <View style={styles.header}>
      {iconPath && <Image source={iconPath} style={styles.icon} />}
      {imgPath && <Image source={imgPath} style={styles.img} />}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
