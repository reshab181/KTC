import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const CustomTextInpt = ({ placeholder, value, onChangeText, keyboardType = 'default', secureTextEntry = false}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9" // Optional: Add a placeholder color
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomTextInpt;

const styles = StyleSheet.create({
  container: {
    marginTop : 10,
  },
  input: {
    height: 48, 
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    paddingHorizontal: 16, 
    fontSize: 16,
    color: '#000', // Text color
    opacity: 1, // Ensure it's fully visible
  },
});
