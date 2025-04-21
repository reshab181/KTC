import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const CustomDropdown = ({
  data,
  placeholder,
  searchPlaceholder,
  labelField = 'label',
  valueField = 'value',
  onChange,
  openOnLoad = false,
  showSearch = false,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(openOnLoad);
  }, [openOnLoad]);

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
      containerStyle={{zIndex: 0}}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search={showSearch}
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
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 12,
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
