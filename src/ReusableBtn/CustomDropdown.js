import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // Ensure you have this package installed.

const CustomDropdown = ({ 
  data, 
  placeholder, 
  searchPlaceholder, 
  labelField = 'label', 
  valueField = 'value', 
  onChange 
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField={labelField}
      valueField={valueField}
      placeholder={!isFocus ? placeholder : '...'}
      searchPlaceholder={searchPlaceholder}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item.value);
        setIsFocus(false);
        if (onChange) {
          onChange(item);
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 12 ,
    marginHorizontal: 12 , 
    height: 48,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#C0C0C0',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#212121',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#212121',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default CustomDropdown;
