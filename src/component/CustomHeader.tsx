import React from 'react';
import {
  useWindowDimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

type CustomHeaderType = {
  handlePress: ((event: GestureResponderEvent) => void) | undefined;
  title?: string;
  justifyContent?: any;
  leftTitle?: string;
  imgPath?: any;
  iconPath?: any;
  leftIcon?: any;
  rightIcon?: any;
  iconHeight?: number;
  iconWidth?: number;
  handleLeftIcon?: () => void;
  handleRightIcon?: () => void;
  unreadCount?: number;
};

const CustomHeader = (props: CustomHeaderType) => {
  const {width: winWidth} = useWindowDimensions();

  const styles = StyleSheet.create({
    header: {
      width: '100%',
      height: 60,
      backgroundColor: '#3C3567',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: props.justifyContent ? props.justifyContent : '',
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 20,
      marginLeft: 10,
      color: '#FFFFFF',
      fontWeight: '600',
      textTransform: 'capitalize',
      // flex: 1,
    },
    icon: {
      // color:'#ffffff',
      height: props.iconHeight || 30,
      width: props.iconWidth || 30,
    },
    img: {
      height: 27,
      width: 69,
      marginStart: 20,
    },
    ltitle: {
      position: 'absolute',
      right: 20,
    },
    ltitletxt: {
      color: '#FFFFFF',
    },
  });

  return (
    <View style={styles.header}>
      {/* Left Icon (Menu) */}
      <TouchableOpacity onPress={props.handleLeftIcon}>
        {props.leftIcon && (
          <props.leftIcon height={props.iconHeight} width={props.iconWidth} />
        )}
        {props.iconPath && (
          <Image source={props?.iconPath} style={styles.icon} />
        )}
      </TouchableOpacity>

      {/* Title (Centered) */}
      {props.imgPath && <Image source={props?.imgPath} style={styles.img} />}
      <Text style={styles.title}>{props?.title}</Text>
      <TouchableOpacity style={styles.ltitle} onPress={props?.handlePress}>
        <Text style={styles.ltitletxt}>{props.leftTitle}</Text>
      </TouchableOpacity>

      {/* Right Icon (Notifications) */}
      <TouchableOpacity onPress={props.handleRightIcon}>
        {props.rightIcon && (
          <props.rightIcon height={props.iconHeight} width={props.iconWidth} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
