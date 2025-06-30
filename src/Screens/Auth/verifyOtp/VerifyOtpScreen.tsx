



import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import verifyOtpStyle from './VerifyOtpStyle';
import CustomHeader from '../../../component/CustomHeader';
import OtpIcon from '../../../assets/icon/OtpIcon';
import { AuthStrings } from '../../../constants/Strings';
import CustomButton from '../../../component/CustomButtons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { resetState, verifyOtp} from '../../../Redux/slice/VerifyOtpSlice';

type VerifyOtpScreenParams = {
  screenType?: number;
  url?: string;
  client_id?: string;
  emailId?: string;
  sub_entity?: string;
};

const VerifyOTPScreen = () => {
  const route = useRoute<RouteProp<{ VerifyOTPScreen: VerifyOtpScreenParams }, 'VerifyOTPScreen'>>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const [emailId, setEmailId] = useState('');
  const [clientId, setClientId] = useState('');
  const [sub_entity, setSub_entity] = useState('');
  const [url, setUrl] = useState('');
  const [screenType, setScreenType] = useState(1);
  const [otp, setOtp] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);

  const inputRefs = useRef<TextInput[]>([]);
  const verifyOtpApiState = useSelector((state: any) => state.verifyOtp);
  // console.log('Navigating with:', { emailId, clientId, sub_entity });

  useEffect(() => {
    if (route.params && typeof route.params === 'object') { 
      setScreenType(route.params.screenType ?? 1);
      setUrl(route.params.url ?? '');
      setClientId(route.params.client_id ?? '');
      setEmailId(route.params.emailId ?? ''); 
      setSub_entity(route.params.sub_entity ?? '');
    }
  }, [route.params]);

  useEffect(() => {
    if (verifyOtpApiState.loading === false) {
      if (verifyOtpApiState.data) {
        console.log('Navigating to:', screenType === 0 ? 'RegisterPage' : 'ForgotPassword');
        console.log('Params being sent:', { emailId, clientId, sub_entity });
        navigation.replace(screenType === 0 ? 'RegisterPage' : 'ForgotPassword', { 
        emailId, 
        clientId, 
        sub_entity 
      });
      } else if (verifyOtpApiState.error) {
        Alert.alert('Verification Failed', verifyOtpApiState.error.message || 'Invalid OTP. Try again.');
      }
    }
    console.log("verifyOtpApiState", verifyOtpApiState)
  }, [verifyOtpApiState, screenType, emailId, clientId, sub_entity]);

  
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; 
    const otpArray = otp.split('');
    otpArray[index] = value;
    const updatedOtp = otpArray.join('');
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };


  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace') {
      const otpArray = otp.split('');
  
      if (index > 0 && !otpArray[index]) {
      
        otpArray[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
      } else {
    
        otpArray[index] = '';
      }
  
      setOtp(otpArray.join(''));
    }
  };
  


  const handleSubmit = () => {
    if (!otp || otp.length < 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }

    if (!url) {
      Alert.alert('Error', 'Invalid data');
      navigation.goBack();
      return;
    }

    if (verifyOtpApiState.loading) return; 

    dispatch(
      verifyOtp({
        url: url,
        otp: otp,
        process: screenType === 0 ? 'processSignUp' : 'processForgotPassword',
      })
    );
  };

  
  return (
    <SafeAreaView style={verifyOtpStyle.safeArea}>
      <View style={verifyOtpStyle.root}>
        <CustomHeader title={screenType === 0 ? 'Register' : 'Forgot Password'} handlePress={undefined} />
        <View style={verifyOtpStyle.img}>
          <OtpIcon />
        </View>

        <Text style={verifyOtpStyle.txt}>{AuthStrings.PleaseEnterOtpRecieved}</Text>

        <View style={verifyOtpStyle.txtInputBox}>
          {Array(6)
            .fill('')
            .map((_, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el as TextInput)}
                style={verifyOtpStyle.otpInput}
                maxLength={1}
                keyboardType="numeric"
                value={otp[index] || ''}
                onChangeText={(text) => handleOtpChange(index, text)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                caretHidden={true} 
                selectTextOnFocus={false} 
              />
            ))}
        </View>

        <View style={verifyOtpStyle.btn}>
          <CustomButton
            title={verifyOtpApiState.loading ? 'Verifying...' : 'Next'}
            onPress={handleSubmit}
            loading={verifyOtpApiState.loading}
            disabled={verifyOtpApiState.loading}
            borderWidth={undefined}
            textColor={undefined}
            btnHeight={undefined}
            textSize={undefined}
            fontWeight={undefined}
            btnColor={undefined}
            backgroundColor={undefined}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOTPScreen;






