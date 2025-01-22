// import { StyleSheet, Text, View, Image } from 'react-native';
// import { useWindowDimensions } from 'react-native';
// import React from 'react';
// import { TextInput } from 'react-native-paper';
// import CustomButton from '../../Reusables/CustomButtons';
// import CustomHeader from '../../Reusables/CustomHeader';

// const OtpRegister = ({route}) => {
//   const styles = useStyles();
//   const { url, emailId, client_id } = route.params;

//   return (
//     <View style={styles.root}>
//         <CustomHeader title={"Register"}/>
//       <Image
//         source={require('../../Assets/frgtpwdotp.png')}
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


import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import CustomButton from '../../Reusables/CustomButtons';
import CustomHeader from '../../Reusables/CustomHeader';
import { verifyOTP } from '../../Api/Authentication'; 

const OtpRegister = ({ route }) => {
  const styles = useStyles();
  const { url, emailId, client_id } = route.params;

 
  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);

  
  const validateOtp = () => {
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP.');
      return false;
    }
    return true;
  };

  
  const handleSubmit = async () => {
    if (validateOtp()) {
      setLoader(true);

      try {
       
        const md5Hash = crypto.createHash('md5').update(otp).digest('hex');
        const sha256Hash = crypto.createHash('sha256').update(md5Hash).digest('hex');

       
        const response = await verifyOTP(sha256Hash, url);

       
        if (response && response.status === 204) {
          setLoader(false);
          alert('OTP verified successfully!');
          
          props.navigation.navigate('Register', { emailId, client_id });
        } else {
          setLoader(false);
          alert('Incorrect OTP, please try again.');
        }
      } catch (error) {
        setLoader(false);
        console.error('Error verifying OTP:', error);
        alert('An error occurred while verifying OTP.');
      }
    }
  };

  return (
    <View style={styles.root}>
      <CustomHeader title={"Register"} />
      <Image
        source={require('../../Assets/frgtpwdotp.png')}
        style={styles.img}
      />
      <Text style={styles.txt}>
        Please enter the OTP received on your registered email address.
      </Text>

     
      <View style={styles.txtInputBox}>
        {Array.from({ length: 6 }).map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            theme={{ colors: { background: '#F1F1F3' } }}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(value) => {
              const newOtp = otp.split('');
              newOtp[index] = value;
              setOtp(newOtp.join(''));
            }}
            value={otp[index] || ''}
          />
        ))}
      </View>

      <View style={styles.btn}>
        <CustomButton title={loader ? 'Verifying...' : 'Next'} onPress={handleSubmit} disabled={loader} />
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
    btn: {
      width: winwidth * 0.90,
    },
  });
}
