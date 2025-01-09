import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute', // To apply `top` and `left`
    top: 340,
    left: 16,
    width: 328,
    height: 48,
    marginTop : 37 ,
    marginStart : 16,  
    backgroundColor: '#3C3567',
    borderRadius: 4,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    opacity: 1,
  },
  buttonText: {
    color: '#FFFFFF', // Button text color
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
