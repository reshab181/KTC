import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
// import ModuleSelectionUI from '../Auth/ModuleSelection';
import { useNavigation } from '@react-navigation/native';


const { height, width } = Dimensions.get('screen');

const Splash = props => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Auth", { screen: "ModuleSelectionUI" });
    }, 3000);
  }, [navigation]);
  

 

    
  return (
    <View style={styles.mainContainer}>
      <Image 
      source={require('../../assets/ktc-logo.png')}
      />
    </View>
  );
};
export default Splash;
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
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
