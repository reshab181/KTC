import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

const PaymentCustomButton = ({ title, onPress, widthSize, textSize, isSelected }) => {
  const buttonStyle = {
    backgroundColor: isSelected ? '#3C3567' : '#E5E5E5',
    width: widthSize,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  };

  const textStyle = {
    color: isSelected ? '#FFFFFF' : '#000000',
    fontSize: textSize,
    fontWeight: 'bold',
  };

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PaymentCustomButton;
