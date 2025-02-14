import React, { useState, useEffect } from 'react';
import { Alert, Image, TouchableOpacity } from 'react-native';
import { Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomTextInpt from '../../component/CustomTextInpt';
import { AuthStrings } from '../../constants/Strings';
import CustomButton from '../../component/CustomButtons';
import { useDispatch, useSelector } from 'react-redux';
import { resetState, verifyEmail } from '../../Redux/slice/VerifyEmailSlice';
import { resetSendOtpState, sendOtp } from '../../Redux/slice/SendOtpSlice';
import { useNavigation } from '@react-navigation/native';
import NavigationService from '../../navigation/NavigationService';
import CloseSvg from '../../assets/svg/close.svg'; 

const VerifyEmailDialog = ({ module, onClose, onSignIn, onSignUp }) => {

  // const[email, setEmail] = useState('ashutosh.rai@mapmyindia.com')
  const navigation = useNavigation();
  const [email, setEmail] = useState('ashutosh.rai@mapmyindia.com')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const dispatch = useDispatch<any>();
  const verifyEmailApiState = useSelector((state: any) => state.verifyEmail);
  const sendOtpApiState = useSelector((state: any) => state.sendOtp);
  const [clientId, setClientId] = useState('')


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

    if (verifyEmailApiState.loading === false && verifyEmailApiState.data && verifyEmailApiState.data !== null) {
      if (verifyEmailApiState.data.message === 'Invalid Domain Name.') {
        Alert.alert('Invalid Domain!', 'Please contact KTC Admin', [
          {
            text: 'OK',
            onPress: () => { },
          },
        ]);
        return;
      }
      if (verifyEmailApiState.data.newuser === 'No') {
        onSignIn(email)
      } else if (verifyEmailApiState.data.newuser === 'Yes') {
        setClientId(verifyEmailApiState.data.client_id)
        dispatch(sendOtp(email))
        // onSignUp(module, email)
      }
    } else if (verifyEmailApiState.loading === false && verifyEmailApiState.error !== null) {
      console.log('Error', verifyEmailApiState.error)
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
  }


  useEffect(() => {
    getSendOtpResponse()
  }, [sendOtpApiState])

  const getSendOtpResponse = () => {

    if (sendOtpApiState.loading === false && sendOtpApiState.data && sendOtpApiState.data !== null) {
      onSignUp(email, sendOtpApiState.data, clientId)
    } else if (sendOtpApiState.loading === false && sendOtpApiState.error !== null) {
      console.log('Error', sendOtpApiState.error)
      Alert.alert('Error', 'Failed to send otp. Please try again.');
    }
  }


  return (
    <Modal animationType="slide" transparent visible={true}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Register</Text>
              <TouchableOpacity onPress={onClose}>
                <CloseSvg/>
                {/* <Image source={require('../../assets/close.png')} /> */}
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 16, marginTop: 14, marginBottom: 19 }}>
              <Text style={styles.instruction}>{AuthStrings.EnterEmail}</Text>
              <CustomTextInpt
                placeholder="Official Email ID"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                secureTextEntry={false}
              />

              {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
            </View>
            <CustomButton
              title={AuthStrings.Submit}

              onPress={handleSubmit}
              borderRadius={0}
              loading={verifyEmailApiState.loading || sendOtpApiState.loading}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalContainer: {
    width: '92.7%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  formContainer: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3C3567',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  instruction: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default VerifyEmailDialog;