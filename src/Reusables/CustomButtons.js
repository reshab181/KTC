import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, onPress,borderWidth,textColor, widthSize = "100%", borderRadius = 4, btnHeight, textSize, fontWeight, btnColor, backgroundColor }) => {
  const widthsize = widthSize;
  return (
    <TouchableOpacity
      style={[styles.button, 
        { width: widthSize, 
          borderRadius: borderRadius, 
          height: btnHeight ? btnHeight : 48, 
          backgroundColor: btnColor ? btnColor : '#3C3567', 
          backgroundColor: backgroundColor? backgroundColor : '#3C3567',
          borderWidth: borderWidth ? borderWidth : 0 , 
        }]}
      onPress={onPress}>
      <Text style={[styles.buttonText,
      {
        color : textColor? textColor: '#FFFFFF',
        fontSize: textSize ? textSize : 18,
        fontWeight: fontWeight ? fontWeight : '600',
      }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // marginTop : 32 , 
    height: 48,
    backgroundColor: '#3C3567',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 4,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    opacity: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,

  },
});

export default CustomButton;
