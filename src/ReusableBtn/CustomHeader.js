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
          position: 'absolute', 
          top: 0,
          left: 0,
          width: winwidth,
          height: 60,
          backgroundColor: '#3C3567',
          justifyContent: 'center',
          alignItems: 'flex-start',
        },
        title: {
          fontSize: 20,
          marginStart : 16, 
          color: '#FFFFFF', 
          fontWeight: 'normal',
        },
      });
}
