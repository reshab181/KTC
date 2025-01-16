import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

const CustomTextInpt = ({ 
  placeholder, 
  value, 
  onChangeText, 
  keyboardType = 'default', 
  secureTextEntry = false,
  error = '',
  style,
  containerStyle ,
  editable=true

}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused, style]}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={editable}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomTextInpt;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  input: {
    height: 48, 
    backgroundColor: '#FFFFFF',
    borderWidth:1.5,
    borderColor: '#E5E5E5',
<<<<<<< HEAD:src/Reusables/CustomTextInpt.js
=======
    marginLeft: 18,
    marginBottom:18,
>>>>>>> 6d0d8cd9a832ff329eac666d16e650ef1b4f2d8e:src/ReusableBtn/CustomTextInpt.js
    borderRadius: 4,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',

  },
  inputFocused: {
    borderColor: '#3C3567', 
    shadowColor: '#3C3567', 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
