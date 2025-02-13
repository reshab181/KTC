// Author: Ashutosh Rai
// Component: CustomHeader
import React, { Component } from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ImageProps } from 'react-native-svg';

type CustomHeaderType={
  title?: string; 
  justifyContent?: any; 
  imgPath?:  any; 
  iconPath?:  any; 
  Iconn?: any; 
  iconHeight?: number; 
  handleLeftIcon?: () => void; 
  iconWidth?: number; 
  leftTitle?: string; 
  handlePress?: () => void;
}

const CustomHeader = (props:CustomHeaderType) => {
  const { width: winWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    header: {
      justifyContent: props.justifyContent ? props.justifyContent : '',
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
      textTransform : "capitalize"
    },
    icon: {
      height: props.iconHeight? props.iconHeight:30,
      width: props.iconWidth ? props.iconWidth:25,
    },
    img: {
      height: 27,
      width: 69,
      marginStart: 20,
    },
    ltitle: {
      position: 'absolute',
      right: 20,
    },
    ltitletxt: {
      color: "#FFFFFF",

    }
  });

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={props.handleLeftIcon}>
          {props.Iconn && (
            <TouchableOpacity onPress={props.handleLeftIcon}>
              <props.Iconn height={props.iconHeight} width={props.iconWidth} />
            </TouchableOpacity>
          )}

          {props.iconPath && <Image source={props?.iconPath} style={styles.icon} />}
        </TouchableOpacity>
        {props.imgPath && <Image source={props?.imgPath} style={styles.img} />}
        <Text style={styles.title}>{props?.title}</Text>
        <TouchableOpacity style={styles.ltitle} onPress={props?.handlePress}>
          <Text style={styles.ltitletxt}>{props.leftTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;

