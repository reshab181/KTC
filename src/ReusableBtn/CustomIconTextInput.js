import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from vector icons

const CustomIconTextInput = ({placeholder , icon1, icon2 }) => {
  // States to toggle visibility of icons
  const [showLeftIcon, setShowLeftIcon] = useState(icon1? true :false);
  const [showRightIcon, setShowRightIcon] = useState(icon2? true :false);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* Left Icon */}
        {showLeftIcon && (
          <Image style={styles.icon1} source={icon1} />
        )}
        
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#A9A9A9" 
        />
        
        {/* Right Icon */}
        {showRightIcon && (
          <TouchableOpacity onPress={() => setShowRightIcon(false)}>
          <Image style={styles.icon2} source={icon2} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    height: 48,
    paddingHorizontal: 10,
  },
  icon1: {
    height : 24, 
    width: 24,
    marginRight: 10,
  },
  icon2: {
    height : 24, 
    width: 24, 
    marginRight: 0, 
  },
  textInput: {
    flex: 1, 
    height: 40,
    fontSize: 14,
    color: '#737373',
  },
});

export default CustomIconTextInput;
