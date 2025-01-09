import React from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native';
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
          <Text style={styles.submitButtonText}>Next</Text>
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
      paddingVertical: 20,  // Increased padding for better header spacing
      
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5, // For Android shadow effect
    },
    headerText: {
      fontSize: 20,  // Increased font size for header text to make it more prominent
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
      marginTop: 50,  // Increased margin top for better separation from previous element
      alignSelf: 'center',
      borderRadius: 8,  // Rounded corners for a modern look
      paddingHorizontal: 15,  // Added more padding for better input alignment
      justifyContent: 'center',
      elevation: 3,  // Added subtle shadow for depth
    },
    emailText: {
      height: height / 13,
      fontSize: 16,  // Slightly larger font size for readability
      color: '#212121',
      paddingLeft: 10,  // Added left padding to align text within the container
    },
    submitButton: {
      height: height / 12,
      width: width / 1.1,
      backgroundColor: '#3C3567',
      borderRadius: 8,  // Rounded corners for a modern touch
      marginTop: 60,  // Increased top margin for better spacing from inputs
      alignSelf: 'center',
      justifyContent: 'center',
      elevation: 4,  // Added shadow to give it a floating effect
    },
    submitButtonText: {
      alignSelf: 'center',
      color: '#FFFFFF',
      fontSize: 18,  // Increased font size for better visibility
      fontWeight: 'bold',
    },
  });
  

export default ForgotPassword;
