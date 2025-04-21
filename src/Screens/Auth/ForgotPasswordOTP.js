// Ashutosh Rai 
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { useRef, useState, useCallback } from 'react';
import CustomButton from '../../component/CustomButtons';
import CustomHeader from '../../component/CustomHeader';
import { verifyOTP } from '../../Api/Authentication';
import OtpSvg from '../../assets/svg/otp.svg';
import RNHash from 'react-native-hash';
import { AuthStrings, Characters } from '../../constants/Strings';

const ForgotPasswordOTP = ({ route, navigation }) => {
  const styles = useStyles();
  const [otp, setOtp] = useState(""); // Single string for OTP
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { url, email } = route.params;
  
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));

  const handleChangeOtp = useCallback((value, index) => {
    if (!/^\d?$/.test(value)) return; 

    let newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    if (value && index < 5) inputRefs[index + 1]?.current?.focus();
    if (!value && index > 0) inputRefs[index - 1]?.current?.focus();
  }, [otp]);

  const handleSubmit = async () => {
    if (otp.length < 6) {
      setIsError(true);
      Alert.alert("Error", "Please fill all OTP fields.");
      return;
    }

    setLoading(true);
    try {
      const md5hash = await RNHash.hashString(otp, 'md5');
      const sha256hash = await RNHash.hashString(md5hash, 'sha256');
      const passPhrase = sha256hash;

      const response = await verifyOTP(url, passPhrase, 'processForgotPassword');

      if (response?.status === 204) {
        navigation.replace('ResetPassword', { email });
      } else {
        Alert.alert('Error', 'Incorrect OTP entered.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <CustomHeader title={AuthStrings.ForgotPassword} />
      <View style={styles.img}>
        <OtpSvg />
      </View>
      <Text style={styles.txt}>{AuthStrings.PleaseEnterOtpRecieved}</Text>
      <View style={styles.txtInputBox}>
        {Array.from({ length: 6 }).map((_, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={[styles.input, isError && !otp[index] && styles.errorInput]}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[index] || ""}
            onChangeText={(value) => handleChangeOtp(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
                inputRefs[index - 1].current?.focus();
              }
            }}
          />
        ))}
      </View>
      <View style={styles.btn}>
        <CustomButton title={Characters.Next} onPress={handleSubmit} loading={loading} />
      </View>
      <View>
        <Text style={styles.footerText}>{Characters.DidntreceiveOtp}</Text>
        <Text style={styles.footerText2}>{AuthStrings.ResendOtpText} 00:11</Text>
      </View>
    </View>
  );
};

export default ForgotPasswordOTP;

function useStyles() {
  const { width: winwidth } = useWindowDimensions();
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F1F1F3', alignItems: 'center' },
    img: { marginTop: 32, marginBottom: 32, width: 122, height: 100 },
    txt: { width: winwidth * 0.8, textAlign: 'center', fontSize: 16, color: '#212121', opacity: 0.87, fontWeight: '600' },
    txtInputBox: { width: 270, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50 , marginTop: 40 },
    input: { width: 40, height: 40, fontSize: 20, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#1C4096' ,color:"#000"},
    errorInput: { borderBottomColor: '#D32F2F' },
    footerText: { marginTop: 32, fontSize: 15, color: '#212121' },
    footerText2: { marginTop: 10, fontSize: 14, textAlign: 'center', color: '#212121', opacity: 0.54 },
    btn: { width: winwidth * 0.9 },
  });
}

