import React, { useState, useEffect } from 'react';
import { Alert, Image, TouchableOpacity } from 'react-native';
import { Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomTextInpt from '../../../component/CustomTextInpt';
import { AuthStrings } from '../../../constants/Strings';
import CustomButton from '../../../component/CustomButtons';
import { useDispatch, useSelector } from 'react-redux';
import { resetState, verifyEmail } from '../../../Redux/slice/VerifyEmailSlice';
import { resetSendOtpState, sendOtp } from '../../../Redux/slice/SendOtpSlice';
import { useNavigation } from '@react-navigation/native';
import NavigationService from '../../../navigation/NavigationService';
import verifyEmailStyle from './VerifyEmailStyle';
import CloseIcon from '../../../assets/icon/CloseIcon';

const VerifyEmailDialog = ({ module, onClose, onSignIn, onSignUp }) => {

  // const[email, setEmail] = useState('ashutosh.rai@mapmyindia.com')
  const navigation = useNavigation();
  const [email, setEmail] = useState('saksham.tyagi@mapmyindia.com')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const dispatch = useDispatch<any>();
  const verifyEmailApiState = useSelector((state: any) => state.verifyEmail);
  const sendOtpApiState = useSelector((state: any) => state.sendOtp);
  const [clientId, setClientId] = useState('')
  const [sub_entity,setSub_entity] = useState('')


  const handleSubmit = async () => {
    if (email && email !== '') {
      if (!emailRegex.test(email)) {
        setErrorMessage('Invalid Email address')
      } else {
        dispatch(verifyEmail({ email: email, module: module }))
      }
    } else {
      setErrorMessage('Email is required')
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetState())
      dispatch(resetSendOtpState())
    }
  }, [])

  useEffect(() => {
    getVerifyEmailResponse()
  }, [verifyEmailApiState])

  const getVerifyEmailResponse = () => {

    if (verifyEmailApiState.loading === false && verifyEmailApiState.data) {
      const { message, newuser, sub_entity, client_id } = verifyEmailApiState.data;
    
      if (message === 'Invalid Domain Name.') {
        Alert.alert('Invalid Domain!', 'Please contact KTC Admin');
        return;
      }
    
      if (newuser === 'No') {
        onSignIn(email);
      } else if (newuser === 'Yes') {
        setClientId(client_id);
        
        setSub_entity(sub_entity);
        dispatch(sendOtp(email));
      }
    } else if (verifyEmailApiState.loading === false && verifyEmailApiState.error !== null) {
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
    
  }


  useEffect(() => {
    getSendOtpResponse()
  }, [sendOtpApiState])

  const getSendOtpResponse = () => {

    if (sendOtpApiState.loading === false && sendOtpApiState.data && sendOtpApiState.data !== null) {
      console.log(sendOtpApiState.data)
      onSignUp(email, sendOtpApiState.data, clientId,sub_entity)
    } else if (sendOtpApiState.loading === false && sendOtpApiState.error !== null) {
      Alert.alert('Error', 'Failed to send otp. Please try again.');
    }
  }


  return (
    <Modal animationType="slide" transparent visible={true}>
      <SafeAreaView style={verifyEmailStyle.overlay}>
        <View style={verifyEmailStyle.modalContainer}>
          <View style={verifyEmailStyle.formContainer}>
            <View style={verifyEmailStyle.header}>
              <Text style={verifyEmailStyle.headerText}>Register</Text>
              <TouchableOpacity activeOpacity={1.0} onPress={onClose}>
                <CloseIcon/>
                {/* <Image source={require('../../assets/close.png')} /> */}
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 16, marginTop: 14, marginBottom: 19 }}>
              <Text style={verifyEmailStyle.instruction}>{AuthStrings.EnterEmail}</Text>
              <CustomTextInpt
                placeholder="Official Email ID"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                secureTextEntry={false} style={undefined} containerStyle={undefined}              />

              {errorMessage && <Text style={verifyEmailStyle.errorText}>{errorMessage}</Text>}
            </View>
            <CustomButton
              title={AuthStrings.Submit}

              onPress={handleSubmit}
              borderRadius={0}
              loading={verifyEmailApiState.loading || sendOtpApiState.loading} borderWidth={undefined} textColor={undefined} btnHeight={undefined} textSize={undefined} fontWeight={undefined} btnColor={undefined} backgroundColor={undefined}            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default VerifyEmailDialog;