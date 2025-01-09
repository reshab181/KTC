import { StyleSheet, Text, View, Image } from 'react-native';
import { useWindowDimensions } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import CustomButton from '../../ReusableBtn/CustomButtons';
import CustomHeader from '../../ReusableBtn/CustomHeader';

const ForgotPasswordOTP = () => {
  const styles = useStyles();

  return (
    <View style={styles.root}>
        <CustomHeader title={"Forgot Password"}/>
      {/* Image Section */}
      <Image
        source={require('../../Assets/frgtpwdotp.png')}
        style={styles.img}
      />

      {/* Text Section */}
      <Text style={styles.txt}>
        Please enter the OTP received on your registered email address.
      </Text>

      {/* OTP Input Section */}
      <View style={styles.txtInputBox}>
        {Array.from({ length: 4 }).map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            theme={{ colors: { background: '#F1F1F3' } }}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      {/* Button Section */}
      <CustomButton title="Next" />

      {/* Footer Text Section */}
      <View>
      <Text style={styles.footerText}>
        Didn't receive the OTP? 
      </Text>
      <Text style={styles.footerText2}>
      Resend code in 00:11
      </Text>
      </View>
      
    </View>
  );
};

export default ForgotPasswordOTP;

function useStyles() {
  const { width: winwidth, height: winheight } = useWindowDimensions();

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#F1F1F3',
      alignItems: 'center',
      paddingTop: winheight * 0.1, 
    },
    img: {
      marginBottom: 24, 
      width: 122.1,
      height: 100,
      resizeMode: 'contain',
    },
    txt: {
      width: winwidth * 0.8,
      marginBottom: 32, 
      textAlign: 'center',
      fontSize: 16,
      fontStyle: 'normal',
      color: '#212121',
      opacity: 0.87,
      fontWeight: '600',
    },
    txtInputBox: {
      width: 270,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 32,
    },
    input: {
      width: 40,
      height: 40,
      fontSize: 20,
      textAlign: 'center', 
      borderBottomWidth: 2,
      borderBottomColor: '#1C4096',
      backgroundColor: '#F1F1F3',
    },
    footerText: {
      marginTop: 110, 
      fontSize: 15,
      color: '#212121', 
    },
    footerText2 : {
        marginTop: 10, 
        fontSize: 14,
        textAlign :'center',
        color: '#212121', 
        opacity : 0.54 
    }
  });
}
