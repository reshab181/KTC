// Author: Ashutosh Rai
// Component: CustomHeader
import React from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const CustomHeader = ({ title,justifyContent, imgPath, iconPath, iconHeight = 30,handleLeftIcon,  iconWidth = 36 , leftTitle, handlePress,onMenuPress}) => {
  const { width: winWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    header: {
      justifyContent: justifyContent? justifyContent: '',
      width: winWidth,
      height: 60,
      backgroundColor: '#3C3567',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 20,
      marginStart: 16,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    icon: {
      height: iconHeight,
      width: iconWidth,
    },
    img: {
      height: 27,
      width: 69,
      marginStart: 20,
    },
    ltitle:{
      position: 'absolute',
      right: 20, 
    },
    ltitletxt: {
      color: "#FFFFFF", 

    }
  });

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress}>
      {iconPath && <Image source={iconPath} style={styles.icon} />}
      </TouchableOpacity>
      {imgPath && <Image source={imgPath} style={styles.img} />}
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.ltitle} onPress={handlePress}>
        <Text style={styles.ltitletxt}>{leftTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;


// Author: Ashutosh Rai
// Component: CustomHeader
// import React from 'react';
// import { useWindowDimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';

// const CustomHeader = ({
//   title,
//   justifyContent = 'flex-start',
//   imgPath,
//   iconPath,
//   iconHeight = 30,
//   iconWidth = 36,
//   handleLeftIcon,
//   leftTitle,
//   handlePress,
//   onMenuPress
// }) => {
//   const { width: winWidth } = useWindowDimensions();

//   const styles = StyleSheet.create({
//     header: {
//       justifyContent: justifyContent || 'flex-start',
//       width: winWidth,
//       height: 60,
//       backgroundColor: '#3C3567',
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingHorizontal: 10,
//     },
//     title: {
//       fontSize: 20,
//       marginStart: 16,
//       color: '#FFFFFF',
//       fontWeight: '600',
//     },
//     icon: {
//       height: iconHeight,
//       width: iconWidth,
//     },
//     img: {
//       height: 27,
//       width: 69,
//       marginStart: 20,
//     },
//     ltitle: {
//       marginLeft: 'auto', 
//       paddingHorizontal: 10,
//     },
//     ltitletxt: {
//       color: '#FFFFFF',
//     },
//   });

//   return (
//     <View style={styles.header}>
//       <TouchableOpacity onPress={onMenuPress} accessible accessibilityLabel="Left Icon">
//         {iconPath && <Image source={iconPath} style={styles.icon} />}
//       </TouchableOpacity>
//       {imgPath && <Image source={imgPath} style={styles.img} />}
//       <Text style={styles.title}>{title}</Text>
//       <TouchableOpacity style={styles.ltitle} onPress={handlePress} accessible accessibilityLabel="Right Button">
//         <Text style={styles.ltitletxt}>{leftTitle}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // Prop Validation
// CustomHeader.propTypes = {
//   title: PropTypes.string.isRequired,
//   justifyContent: PropTypes.string,
//   imgPath: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//   iconPath: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//   iconHeight: PropTypes.number,
//   iconWidth: PropTypes.number,
//   onMenuPress: PropTypes.func,
//   leftTitle: PropTypes.string,
//   handlePress: PropTypes.func,
// };

// export default CustomHeader;

