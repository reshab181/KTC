import { Image, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';

const WalletnUpi = () => {
  const [selectedOption, setSelectedOption] = useState('option1');

  const options = [
    { id: 'option1', image: require('../Assets/PhonePeLogo.png') },
    { id: 'option2', image: require('../Assets/Paytm.png') },
    { id: 'option3', image: require('../Assets/Google.png') },
  ];

  return (
    <View style={styles.container}>
        {options.map((option) => (
          <View style={styles.radioOption} key={option.id}>
            <RadioButton
              color='#3C3567'
              value={option.id}
              status={selectedOption === option.id ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption(option.id)}
            />
            <Image source={option.image} style={styles.img} />
          </View>
        ))}
    </View>
  );
};

export default WalletnUpi;

const styles = StyleSheet.create({
  container: {
    marginTop: 34,
    marginHorizontal: 12, 
    backgroundColor: '#FFFFFF',
  },
  row: {
    
  },
  radioOption: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48, 
    borderBottomWidth: 1 ,
    borderBottomColor: '#E5E5E5',  
    paddingBottom: 10, 
    marginBottom: 10,
  },
  img: {
    height: 24,
    resizeMode: 'contain', // Ensures the image maintains its aspect ratio
  },
});
