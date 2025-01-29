// Ashutosh Rai 
import { StyleSheet, Text, View, Image, Alert, TextInput } from 'react-native';
import { useWindowDimensions } from 'react-native';
import CustomButton from '../../component/CustomButtons';
import CustomHeader from '../../component/CustomHeader';
import { verifyOTP } from '../../Api/Authentication';
import { useRef, useState } from 'react';
import RNHash from 'react-native-hash';
const ForgotPasswordOTP = ({ navigation }) => {
  const styles = useStyles();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Ref array to focus inputs
  const inputRefs = Array.from({ length: 6 }).map(() => useRef(null));

  const handleChangeOtp = (value, index) => {
    if (value.length > 1) {
      // Take the last digit only if multiple characters are entered
      value = value[value.length - 1];
    }

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsError(false);

    // Automatically move to the next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }

    // Move focus to the previous input if empty
    if (!value && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // const handleSubmit = async () => {
  //   if (otp.some(value => value === "")) {
  //     setIsError(true);
  //     Alert.alert("Error", "Please fill all OTP fields.");
  //     return;
  //   }

  //   const otpp = otp.join("");
  //   console.log('====================================');
  //   console.log(otpp, "code");
  //   const md5hash = RNHash.hashString(otpp, 'md5')
  //   const sha256hash = RNHash.hashString(md5hash , 'sha256')
  //   // console.log("ye aya hai converted value ", sha256hash)
  //   const passPhrase = sha256hash; 

  //   console.log('====================================');
  //   setIsLoading(true);

  //   try {
  //     const url = `https://anchor.mapmyindia.com/api/otp/otp1738057306i1090519040/validate?passPhrase=${passPhrase}`
  //     const response = await verifyOTP( url);

  //     if (response) {
  //       navigation.navigate('ResetPassword');
  //     } else {
  //       setIsError(true);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async () => {
    if (otp.some(value => value === "")) {
      setIsError(true);
      Alert.alert("Error", "Please fill all OTP fields.");
      return;
    }
  
    // Join the OTP array into a single string
    const otpp = otp.join("");
    console.log('Entered OTP:', otpp);
  
    try {
      // Generate MD5 hash
      const md5hash = await RNHash.hashString(otpp, 'md5'); // Ensure you await RNHash
      console.log('MD5 Hash:', md5hash);
  
      // Generate SHA256 hash
      const sha256hash = await RNHash.hashString(md5hash, 'sha256'); // Ensure you await RNHash
      console.log('SHA256 Hash:', sha256hash);
  
      const passPhrase = sha256hash;
  
      setIsLoading(true);
  
      const url = `https://anchor.mapmyindia.com/api/otp/otp1738057306i1090519040/validate?passPhrase=${passPhrase}`;
      const response = await verifyOTP(url); // Pass the correct hashed value to your API
  
      if (response) {
        navigation.navigate('ResetPassword');
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.root}>
      <CustomHeader title={"Forgot Password"} />
      <Image
        source={require('../../assets/frgtpwdotp.png')}
        style={styles.img}
      />
      <Text style={styles.txt}>
        Please enter the OTP received on your registered email address.
      </Text>
      <View style={styles.txtInputBox}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]} // Reference for the current input
            style={[styles.input, isError && otp[index] === "" && styles.errorInput]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={value => handleChangeOtp(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
                inputRefs[index - 1].current?.focus(); // Move focus to the previous input
              }
            }}
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

// import { StyleSheet, Text, View, Image, Alert,TextInput } from 'react-native';
// import { useWindowDimensions } from 'react-native';
// import React, { useState } from 'react';
// import CustomButton from '../../component/CustomButtons';
// import CustomHeader from '../../component/CustomHeader';
// import { verifyOTP } from '../../Api/Authentication';



// const ForgotPasswordOTP = ({ navigation }) => {
//   const styles = useStyles();
  
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [isError, setIsError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChangeOtp = (value, index) => {
//     let newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     setIsError(false);
//   };

//   const handleSubmit = async () => {
    
//     if (otp.some(value => value === "")) {
//       setIsError(true);
//       Alert.alert("Error", "Please fill all OTP fields.");
//       return;
//     }

    
//     const passPhrase = otp.join("");
    
//     setIsLoading(true);

//     try {
  
//       const url = 'https://anchor.mapmyindia.com/api/otp/otp1737110437i939524096/validate';
      
    
//       const response = await verifyOTP(passPhrase, url);

   
//       if (response) {
//         navigation.navigate('ResetPassword');
//       } else {
//         setIsError(true);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.root}>
//       <CustomHeader title={"Forgot Password"}  />
//       <Image
//         source={require('../../assets/frgtpwdotp.png')}
//         style={styles.img}
//       />
//       <Text style={styles.txt}>
//         Please enter the OTP received on your registered email address.
//       </Text>
//       <View style={styles.txtInputBox}>
//         {Array.from({ length: 6 }).map((_, index) => (
//           <TextInput
//             key={index}
//             style={[styles.input, isError && otp[index] === "" && styles.errorInput]}
//             theme={{ colors: { background: '#F1F1F3' } }}
//             keyboardType="number-pad"
//             maxLength={1}
//             value={otp[index]}
//             onChangeText={value => handleChangeOtp(value, index)}
//           />
//         ))}
//       </View>
//       <View style={styles.btn}>
//         <CustomButton 
//           title={isLoading ? "Verifying..." : "Next"} 
//           onPress={handleSubmit} 
//           disabled={isLoading} 
//         />
//       </View>
//       <View>
//         <Text style={styles.footerText}>
//           Didn't receive the OTP?
//         </Text>
//         <Text style={styles.footerText2}>
//           Resend code in 00:11
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default ForgotPasswordOTP;

// function useStyles() {
//   const { width: winwidth, height: winheight } = useWindowDimensions();

//   return StyleSheet.create({
//     root: {
//       flex: 1,
//       backgroundColor: '#F1F1F3',
//       alignItems: 'center',
//     },
//     img: {
//       marginTop: 47,
//       marginBottom: 32,
//       width: 122.1,
//       height: 100,
//       resizeMode: 'contain',
//     },
//     txt: {
//       width: winwidth * 0.8,
//       marginBottom: 32,
//       textAlign: 'center',
//       fontSize: 16,
//       fontStyle: 'normal',
//       color: '#212121',
//       opacity: 0.87,
//       fontWeight: '600',
//     },
//     txtInputBox: {
//       width: 270,
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 32,
//     },
//     input: {
//       width: 40,
//       height: 40,
//       fontSize: 20,
//       textAlign: 'center',
//       borderBottomWidth: 1,
//       borderBottomColor: '#1C4096',
//       backgroundColor: '#F1F1F3',
//     },
//     errorInput: {
//       borderBottomColor: '#D32F2F',
//     },
//     footerText: {
//       marginTop: 110,
//       fontSize: 15,
//       color: '#212121',
//     },
//     footerText2: {
//       marginTop: 10,
//       fontSize: 14,
//       textAlign: 'center',
//       color: '#212121',
//       opacity: 0.54
//     },
//     btn: {
//       width: winwidth * 0.90
//     }
//   });
// }