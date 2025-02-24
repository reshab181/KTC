import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import verifyOtpStyle from './VerifyOtpStyle';
import CustomHeader from '../../../component/CustomHeader';
import OtpIcon from '../../../assets/icon/OtpIcon';
import { AuthStrings } from '../../../constants/Strings';
import { TextInput } from 'react-native-paper';
import CustomButton from '../../../component/CustomButtons';
import { useNavigation, useRoute } from '@react-navigation/native';
import OtpInput from '../../../component/OtpInput';
import { useDispatch, useSelector } from 'react-redux';
import { resetState, verifyOtp } from '../../../Redux/slice/VerifyOtpSlice';


const VerifyOTPScreen = () => {

  const route = useRoute()
  const navigation = useNavigation<any>();
  const [emailId, setEmailId] = useState('')
  const [clientId, setClientId] = useState('')
  const [url, setUrl] = useState('')
  const [screenType, setScreenType] = useState(1)
    
  const [otp, setOtp] = useState('');
  const inputRefs = useRef([]);
  const dispatch = useDispatch<any>();
  const verifyOtpApiState = useSelector((state: any) => state.verifyOtp);


  useEffect(() => {
    if(route.params) {
      setScreenType(route.params.screenType ?? 1)
      setUrl(route.params?.url)
      setClientId(route.params?.client_id)
    }
    inputRefs.current[0]?.focus();
  }, [route, route.params])

  useEffect(() => {
    return () => {
      dispatch(resetState())
    }
  }, [])

  useEffect(() => {
    if (verifyOtpApiState.loading === false && verifyOtpApiState.data && verifyOtpApiState.data !== null) {
      navigation.replace("RegisterPage", { params: { emailId: emailId, clientId: clientId }})
    } else if (verifyOtpApiState.loading === false && verifyOtpApiState.error !== null) {
      Alert.alert('Error', 'Invalid Otp');
    }
  }, [verifyOtpApiState])

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue)
  }

  const handleSubmit = () => {
    if(otp === "") {
      Alert.alert("Error", "Please enter the OTP.");
      return
    }
    if(otp.length < 6) {
      Alert.alert("Error", "Please enter valid OTP.");
      return
    }
    if(url === '') {
      Alert.alert("Error", "Invalid data");
      navigation.goBack();
      return
    }
    dispatch(verifyOtp({url: url, otp: otp, process: screenType == 0 ? "processSignUp": "processForgotPassword"}))

   }

    return(
        <View style={verifyOtpStyle.root}>
            <CustomHeader title={screenType == 0 ? "Register": "Forgot Password"} />
            <View style={verifyOtpStyle.img}>
                <OtpIcon />
            </View>
      
      <Text style={verifyOtpStyle.txt}>
        {AuthStrings.PleaseEnterOtpRecieved}
      </Text>

      <View style={verifyOtpStyle.txtInputBox}>
        <OtpInput 
        changeOtp={handleOtpChange}/>
      </View>
{/* 
      {!isValidOtp && (
        <Text style={verifyOtpStyle.errorText}>
          {AuthStrings.Enter6Digit}
        </Text>
      )} */}

      <View style={verifyOtpStyle.btn}>
        <CustomButton
          title={verifyOtpApiState.loading ? 'Verifying...' : 'Next'}
          onPress={handleSubmit}
          disabled={verifyOtpApiState.loading}
        />
      </View>
    </View>
    )
}

export default VerifyOTPScreen;