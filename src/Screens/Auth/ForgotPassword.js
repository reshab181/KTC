import React from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native';
import CustomButton from '../../ReusableBtn/CustomButtons';
const { height, width } = Dimensions.get('screen');

const ForgotPassword = props => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Forgot Password</Text>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.emailContainer}>
        <TextInput
          editable={false}
          value="pre-filled-email@example.com"
          style={styles.emailText}
          placeholder="please use prefilled email id"
          placeholderTextColor="#212121"
        />
      </View>

      <TouchableOpacity>
        <View style={[styles.submitButton, { alignItems: 'center', justifyContent: 'center' }]}>
        <CustomButton title={"Next"}/>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
      height: height,
      width: width,
      backgroundColor: '#F1F1F3',
    
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#3C3567',
      alignItems: 'center',
      paddingHorizontal: 25,
      paddingVertical: 20,  
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5, 
    },
    headerText: {
      fontSize: 20,  
      fontWeight: 'bold',
      color: '#FFF',
    },
    skipText: {
      fontSize: 16,
      color: '#FFF',
    },
    emailContainer: {
      height: height / 15,
      width: width / 1.1,
      backgroundColor: '#FFFFFF',
      marginTop: 50,  
      alignSelf: 'center',
      borderRadius: 8,  
      paddingHorizontal: 15,  
      justifyContent: 'center',
      elevation: 3,  
    },
    emailText: {
      height: height / 13,
      fontSize: 16, 
      color: '#212121',
      paddingLeft: 10,  
    },
    submitButton: {
      height: height / 12,
      width: width / 1.1,
      backgroundColor: '#3C3567',
      borderRadius: 8,  
      marginTop: 60,  
      alignSelf: 'center',
      justifyContent: 'center',
      elevation: 4,  
    },
    submitButtonText: {
      alignSelf: 'center',
      color: '#FFFFFF',
      fontSize: 18,  
      fontWeight: 'bold',
    },
  });
  

export default ForgotPassword;
