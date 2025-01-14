import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput } from 'react-native';

const OTPRegister = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const handleChange = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);
  };

  const handleSubmit = () => {
    const otpCode = otp.join('');
    console.log("OTP Code Submitted:", otpCode);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Verify OTP</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('../../Assets/frgtpwdotp.png')} style={styles.image} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.instructionText}>
            Please enter the OTP received on your registered email address.
          </Text>
        </View>

        <View style={styles.otpInputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              maxLength={1}
              keyboardType="numeric"
              style={styles.otpInputField}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F1F3',
    
  },
  header: {
    backgroundColor: '#3C3567',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  textContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#212121',
    textAlign: 'center',
  },
  otpInputContainer: {
    width: 270,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInputField: {
    width: 40,
    height: 40,
    fontSize: 20,
    textAlign: 'center', 
    borderBottomWidth: 1,
    borderBottomColor: '#1C4096',
    backgroundColor: '#F1F1F3',
  },
  nextButton: {
    backgroundColor: '#3C3567',
    width: '80%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTPRegister;
