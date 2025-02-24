// import { StyleSheet, Text, View, Image } from 'react-native';
// import { useWindowDimensions } from 'react-native';
// import React from 'react';
// import { TextInput } from 'react-native-paper';
// import CustomButton from '../../component/CustomButtons';
// import CustomHeader from '../../component/CustomHeader';

// const OtpRegister = ({route}) => {
//   const styles = useStyles();
//   const { url, emailId, client_id } = route.params;

//   return (
//     <View style={styles.root}>
//         <CustomHeader title={"Register"}/>
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
//             style={styles.input}
//             theme={{ colors: { background: '#F1F1F3' } }}
//             keyboardType="number-pad"
//             maxLength={1}
//           />
//         ))}
//       </View>
//       <View style={styles.btn}>
//       <CustomButton title="Next" onPress={()=>console.warn("Clicked")} />
//       </View>
//       <View>
//       <Text style={styles.footerText}>
//         Didn't receive the OTP? 
//       </Text>
//       <Text style={styles.footerText2}>
//       Resend code in 00:11
//       </Text>
//       </View>

//     </View>
//   );
// };

// export default OtpRegister;

// function useStyles() {
//   const { width: winwidth, height: winheight } = useWindowDimensions();

//   return StyleSheet.create({
//     root: {
//         flex: 1,
//         backgroundColor: '#F1F1F3',
//         alignItems: 'center', 
//     },
//     img: {
//       marginTop : 47 ,
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
//     footerText: {
//       marginTop: 110, 
//       fontSize: 15,
//       color: '#212121', 
//     },
//     footerText2 : {
//         marginTop: 10, 
//         fontSize: 14,
//         textAlign :'center',
//         color: '#212121', 
//         opacity : 0.54 
//     },
//     btn: {
//         width: winwidth*0.90
//     }
//   });
// }


// import { StyleSheet, Text, View, Image, Alert } from 'react-native';
// import { useWindowDimensions } from 'react-native';
// import React, { useState } from 'react';
// import { TextInput } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import CustomButton from '../../component/CustomButtons';
// import CustomHeader from '../../component/CustomHeader';
// import { verifyOTP } from '../../Api/Authentication'; 
// import RNHash from 'react-native-hash';

// const OtpRegister = ({ route }) => {
//   const {emailId,client_id,url}=route.params;
//   const styles = useStyles();
//   const navigation = useNavigation()

//   console.log(emailId,client_id,url ,"jai hind");



//   const [otp, setOtp] = useState('');
//   const [loader, setLoader] = useState(false);


//   const validateOtp = () => {
//     if (otp.length !== 6) {
//       alert('Please enter a valid 6-digit OTP.');
//       return false;
//     }
//     return true;
//   };


//   const handleSubmit = async () => {
//     if (validateOtp()) {
//       setLoader(true);

//       try {

//         const md5Hash = await RNHash.hashString(otp,'md5');
//         const sha256Hash = await RNHash.hashString(md5Hash,'sha256');


//         const response = await verifyOTP(sha256Hash, url);

//         if (response && response.status === 204) {
//           setLoader(false);
//           alert('OTP verified successfully!');
//           navigation.navigate('Register', { emailId, client_id });
//         } else {
//           setLoader(false);
//           alert('Incorrect OTP, please try again.');
//         }
//       } catch (error) {
//         setLoader(false);
//         console.error('Error verifying OTP:', error);
//         alert('An error occurred while verifying OTP.');
//       }
//     }
//   };

//   return (
//     <View style={styles.root}>
//       <CustomHeader title={"Register"} />
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
//             style={styles.input}
//             theme={{ colors: { background: '#F1F1F3' } }}
//             keyboardType="number-pad"
//             maxLength={1}
//             onChangeText={(value) => {
//               const newOtp = otp.split('');
//               newOtp[index] = value;
//               setOtp(newOtp.join(''));
//             }}
//             value={otp[index] || ''}
//           />
//         ))}
//       </View>

//       <View style={styles.btn}>
//         <CustomButton title={loader ? 'Verifying...' : 'Next'} onPress={handleSubmit} disabled={loader} />
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

// export default OtpRegister;
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
//       opacity: 0.54,
//     },
//     btn: {
//       width: winwidth * 0.90,
//     },
//   });
// }
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import CustomButton from '../../component/CustomButtons';
import CustomHeader from '../../component/CustomHeader';
import { verifyOTP } from '../../Api/Authentication';
import RNHash from 'react-native-hash';
import OtpSvg from '../../assets/svg/otp.svg'
import { AuthStrings } from '../../constants/Strings';

const OtpRegister = () => {
  const route = useRoute()
  // const { emailId, client_id, url } = route.params;
  const [emailId, setEmailId] = useState('')
  const [clientId, setClientId] = useState('')
  const [sub_entity,setSub_entity]=useState('')
  const [url, setUrl] = useState('')
  
  const styles = useStyles();
  const navigation = useNavigation();

  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isValidOtp, setIsValidOtp] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    console.log(route?.params)
    if(route?.params) {
      setEmailId(route?.params?.emailId)
      setClientId(route?.params?.client_id)
      setSub_entity(route?.params?.sub_entity)
      setUrl(route?.params?.url)
    }
  }, [route?.params])

  // Timer for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const validateOtp = () => {
    if (otp.length !== 6) {
      setIsValidOtp(false);
      return false;
    }
    setIsValidOtp(true);
    return true;
  };

  const handleOtpInput = (value, index) => {
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index) => {
    const newOtp = otp.split('');
    newOtp[index] = '';
    setOtp(newOtp.join(''));

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (validateOtp()) {
      setLoader(true);
      try {
        const md5Hash = await RNHash.hashString(otp, 'md5');
        const sha256Hash = await RNHash.hashString(md5Hash, 'sha256');
        console.log("URL" , url);
        
        // const response = await verifyOTP(url, sha256Hash);

          // const response = await verifyOTP(url, sha256Hash);
        const response = await verifyOTP(url, sha256Hash, 'processSignUp');

        if (response.status === 204) {
          setLoader(false);
          Alert.alert('Success', 'OTP verified successfully!');
          navigation.navigate('RegisterPage', { emailId, clientId ,sub_entity});
        } else {
          setLoader(false);
          Alert.alert('Error', 'Incorrect OTP, please try again.');
        }
      } catch (error) {
        setLoader(false);
        console.error('Error verifying OTP:', error);
        Alert.alert('Error', 'An error occurred while verifying OTP.');
      }
    }
  };

  return (
    <View style={styles.root}>
      <CustomHeader title="Register" />
      <View style={styles.img}>
        <OtpSvg height={60} width={122} />
      </View>
      {/* <Image
        source={require('../../assets/frgtpwdotp.png')}
        style={styles.img}
      /> */}
      <Text style={styles.txt}>
        {AuthStrings.PleaseEnterOtpRecieved}
      </Text>

      <View style={styles.txtInputBox}>
        {Array.from({ length: 6 }).map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            theme={{ colors: { background: '#F1F1F3' } }}
            keyboardType="number-pad"
            maxLength={1}
            ref={(ref) => (inputRefs.current[index] = ref)}
            onChangeText={(value) => handleOtpInput(value, index)}
            onKeyPress={({ nativeEvent }) =>
              nativeEvent.key === 'Backspace' && handleBackspace(index)
            }
            value={otp[index] || ''}
            accessible={true}
            accessibilityLabel={`OTP Input ${index + 1}`}
          />
        ))}
      </View>

      {!isValidOtp && (
        <Text style={styles.errorText}>
          {AuthStrings.Enter6Digit}
        </Text>
      )}

      <View style={styles.btn}>
        <CustomButton
          title={loader ? 'Verifying...' : 'Next'}
          onPress={handleSubmit}
          disabled={loader}
        />
      </View>

      <View>
        <Text style={styles.footerText}>
          Didn't receive the OTP?
        </Text>
        <Text
          style={[
            styles.footerText2,
            { color: timer > 0 ? '#999' : '#1C4096' },
          ]}
          onPress={() => timer === 0 && setTimer(30)}
        >
          {timer > 0
            ? `Resend code in 00:${String(timer).padStart(2, '0')}`
            : 'Resend code'}
        </Text>
      </View>
    </View>
  );
};

export default OtpRegister;

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
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 10,
      textAlign: 'center',
    },
    btn: {
      width: winwidth * 0.9,
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
      opacity: 0.54,
    },
  });
}
