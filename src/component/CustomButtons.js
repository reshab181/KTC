import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ 
  title, 
  onPress, 
  borderWidth, 
  textColor, 
  loading, 
  disabled,   // ✅ Add this prop
  widthSize = "100%", 
  borderRadius = 4, 
  btnHeight, 
  textSize, 
  fontWeight, 
  btnColor, 
  backgroundColor 
}) => {

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: widthSize,
          borderRadius: borderRadius,
          height: btnHeight ? btnHeight : 48,
          backgroundColor: btnColor ? btnColor : '#3C3567',
          backgroundColor: backgroundColor ? backgroundColor : '#3C3567',
          borderWidth: borderWidth ? borderWidth : 0,
          opacity: disabled ? 0.5 : 1,  // ✅ Reduce opacity when disabled
        }
      ]}
      onPress={!disabled ? onPress : null}  // ✅ Prevent click when disabled
      disabled={disabled}  // ✅ Apply disabled state
    >
      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
      ) : (
        <Text style={[styles.buttonText, {
          color: textColor ? textColor : '#FFFFFF',
          fontSize: textSize ? textSize : 18,
          fontWeight: fontWeight ? fontWeight : '600',
        }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3C3567',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.5,  // Reduce opacity when disabled
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default CustomButton;
