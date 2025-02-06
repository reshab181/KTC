// Author: Ashutosh Rai
// Component: CustomButton
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({ title, onPress, borderWidth, textColor, loading, widthSize = "100%", borderRadius = 4, btnHeight, textSize, fontWeight, btnColor, backgroundColor }) => {
  const widthsize = widthSize;
  return (
    <TouchableOpacity
      style={[styles.button,
      {
        width: widthSize,
        borderRadius: borderRadius,
        height: btnHeight ? btnHeight : 48,
        backgroundColor: btnColor ? btnColor : '#3C3567',
        backgroundColor: backgroundColor ? backgroundColor : '#3C3567',
        borderWidth: borderWidth ? borderWidth : 0,
      }]}
      onPress={onPress}>
      {loading ? 
       <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
        : <Text style={[styles.buttonText, {
          color: textColor ? textColor : '#FFFFFF',
          fontSize: textSize ? textSize : 18,
          fontWeight: fontWeight ? fontWeight : '600',
        }]}>{title}</Text>}
      {/* <Text style={[styles.buttonText,
      {
        color: textColor ? textColor : '#FFFFFF',
        fontSize: textSize ? textSize : 18,
        fontWeight: fontWeight ? fontWeight : '600',
      }]}>{title}</Text> */}
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
  button: {
    backgroundColor: '#3C3567',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.7,  // Reduce opacity when loading
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
});

export default CustomButton;
