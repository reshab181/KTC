import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import ModuleSelectionUI from '../Auth/ModuleSelection';


const { height, width } = Dimensions.get('screen');

const Splash = props => {
    // useEffect(() => {
   
    //     setTimeout(() => {
         
    //       props.navigation.replace(<ModuleSelectionUI/>)
    //     }, 3000); 
    //   }, []);
    
  return (
    <View style={styles.mainContainer}>
      <Image 
      source={require('../../Assets/ktc-logo.png')}
      />
    </View>
  );
};
export default Splash;
const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3C3567',
  },
  txt: {
    fontSize: height / 25,
    fontWeight: 'bold',
    fontFamily: 'cochin',
    color: 'indigo',
    textDecorationLine: 'underline',
  },
});
