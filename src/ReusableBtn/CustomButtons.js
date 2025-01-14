import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, onPress ,widthSize = "100%", borderRadius = 4}) => {
  
  return (
    <TouchableOpacity 
    style={[styles.button, { width: widthSize , borderRadius : borderRadius}]} 
    onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop : 32 , 
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
    fontWeight: '600',
  },
});

export default CustomButton;
