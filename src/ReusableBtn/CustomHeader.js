import React from 'react';
import { useWindowDimensions } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

const CustomHeader = ({ title }) => {
    const useStyle = useStyles() ;
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomHeader;

function useStyles(){
    const { width: winwidth, height: winheight } = useWindowDimensions();
    return styles = StyleSheet.create({
        header: {
          position: 'absolute', // Makes it stick to the top
          top: 0,
          left: 0,
          width: winwidth, // Fixed width as per given properties
          height: 60,
          backgroundColor: '#3C3567',
          justifyContent: 'center', // Center content vertically
          alignItems: 'flex-start', // Center content horizontally
          opacity: 1, // Fully visible
        },
        title: {
          fontSize: 20,
          marginStart : 16, 
          color: '#FFFFFF', // Contrast text color
          fontWeight: 'normal',
        },
      });
}
