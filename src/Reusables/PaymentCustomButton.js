import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import React from 'react';

const PaymentCustomButton = ({ title, onPress, widthSize, textSize, isSelected, imgpath }) => {
  const buttonStyle = {
    backgroundColor: isSelected ? '#3C3567' : '#E5E5E5',
    width: widthSize,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1, 
    borderColor: '#D2D2D2',
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    paddingStart : 26, 
    marginTop: 10 , 
  };

  const textStyle = {
    color: isSelected ? '#FFFFFF' : '#000000',
    fontSize: textSize,
    fontWeight: 'bold',
    marginLeft: 8, 
  };

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      {imgpath && (
        <Image source={imgpath} style={{ height: 24, width: 24  }} />
      )}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PaymentCustomButton;
