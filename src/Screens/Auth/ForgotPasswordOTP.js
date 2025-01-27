import { StyleSheet, Text, View, Image, Alert,TextInput } from 'react-native';
import { useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
// import { TextInput } from 'react-native-paper';
import CustomButton from '../../component/CustomButtons';
import CustomHeader from '../../component/CustomHeader';
import { verifyOTP } from '../../Api/Authentication';



const ForgotPasswordOTP = ({ navigation }) => {
  const styles = useStyles();
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeOtp = (value, index) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsError(false);
  };

  const handleSubmit = async () => {
    
    if (otp.some(value => value === "")) {
      setIsError(true);
      Alert.alert("Error", "Please fill all OTP fields.");
      return;
    }

    
    const passPhrase = otp.join("");
    
    setIsLoading(true);

    try {
  
      const url = 'https://anchor.mapmyindia.com/api/otp/otp1737110437i939524096/validate';
      
    
      const response = await verifyOTP(passPhrase, url);

   
      if (response) {
        navigation.navigate('ResetPassword');
      } else {
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <CustomHeader title={"Forgot Password"}  />
      <Image
        source={require('../../assets/frgtpwdotp.png')}
        style={styles.img}
      />
      <Text style={styles.txt}>
        Please enter the OTP received on your registered email address.
      </Text>
      <View style={styles.txtInputBox}>
        {Array.from({ length: 6 }).map((_, index) => (
          <TextInput
            key={index}
            style={[styles.input, isError && otp[index] === "" && styles.errorInput]}
            theme={{ colors: { background: '#F1F1F3' } }}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[index]}
            onChangeText={value => handleChangeOtp(value, index)}
          />
        ))}
      </View>
      <View style={styles.btn}>
        <CustomButton 
          title={isLoading ? "Verifying..." : "Next"} 
          onPress={handleSubmit} 
          disabled={isLoading} 
        />
      </View>
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
    },
    img: {
      marginTop: 47,
      marginBottom: 32,
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
      borderBottomWidth: 1,
      borderBottomColor: '#1C4096',
      backgroundColor: '#F1F1F3',
    },
    errorInput: {
      borderBottomColor: '#D32F2F',
    },
    footerText: {
      marginTop: 110,
      fontSize: 15,
      color: '#212121',
    },
    footerText2: {
      marginTop: 10,
      fontSize: 14,
      textAlign: 'center',
      color: '#212121',
      opacity: 0.54
    },
    btn: {
      width: winwidth * 0.90
    }
  });
}