import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomIconTextInput = ({
  placeholder,
  Righticon,
  lefticon,
  icon1,

  icon2,
  LeftSvg,
  keyboardType = 'default',
  value,
  iconSize,
  handlePress,
  onChangeText,
}) => {
  const [showLeftimg, setShowLeftimg] = useState(icon1 ? true : false);
  const [showLeftIcon, setShowLeftIcon] = useState(lefticon ? true : false);
  const [showLeftSvg, setShowLeftSvg] = useState(LeftSvg ? true : false);
  const [showRightImg, setShowRightImg] = useState(icon2 ? true : false);

  const [showRightIcon, setShowRightIcon] = useState(Righticon ? true : false);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {showLeftimg && <Image style={styles.icon1} source={icon1} />}
        {showLeftIcon && (
          <Icon name={lefticon} size={iconSize} style={{marginRight: 15}} />
        )}
        {showLeftSvg && <LeftSvg height={24} width={24} />}

        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor="#A9A9A9"
          value={value}
          onChangeText={onChangeText}
        />
        {showRightIcon && (
          <TouchableOpacity onPress={handlePress}>
            <Righticon />
            {/* <Icon name={Righticon} size={iconSize} style={{marginLeft: 10}} /> */}
          </TouchableOpacity>
        )}
        {showRightImg && (
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
    height: 24,
    width: 24,
    // marginRight: 10,
  },
  icon2: {
    height: 24,
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
