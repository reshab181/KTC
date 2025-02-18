// Ashutosh Rai
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { fetchJwtAccess } from '../../Utils/JwtHelper';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInpt from '../../component/CustomTextInpt';
import CustomButton from '../../component/CustomButtons';
import { emailsms } from '../../Api/Authentication';
import { AuthStrings, Characters } from '../../constants/Strings';
import { useDispatch, useSelector } from 'react-redux';
import { resetSendOtpState, sendOtp } from '../../Redux/slice/SendOtpSlice';
import { resetState } from '../../Redux/slice/VerifyEmailSlice';
import { Alert } from 'react-native';

const { height, width } = Dimensions.get('screen');

const ForgotPassword = ({ route, navigation }) => {
  const { email } = route.params || {};
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const sendOtpApiState = useSelector((state) => state.sendOtp);


  useEffect(() => {
    // setLoading(true)
    getSendOtpResponse()
    // setLoading(false)
  }, [sendOtpApiState])

  const getSendOtpResponse = () => {

    if (sendOtpApiState.loading === false && sendOtpApiState.data && sendOtpApiState.data !== null) {
       navigation.replace('ForgotPasswordOTP', {
        url: sendOtpApiState.data,
        email,
        from: 'ForgotPassword',
        accessToken,
      });
    } else if (sendOtpApiState.loading === false && sendOtpApiState.error !== null) {
      console.log('Error', sendOtpApiState.error)
      Alert.alert('Error', 'Failed to send otp. Please try again.');
    }
  }

  // useEffect(() => {
  //   const getAccessToken = async () => {
  //     try {
  //       console.log('Fetching JWT Access Token...');
  //       const token = await fetchJwtAccess();
  //       console.log('Fetched JWT Access Token:', token);
  //       if (token) {
  //         setAccessToken(token);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching JWT access token:', error.message);
  //       setError('Failed to fetch access token.');
  //     }
  //   };

  //   getAccessToken();
  // }, []);
    useEffect(() => {
      return () => {
        dispatch(resetSendOtpState())
      }
    }, [])

  const sendForgotOTP = () => {
    console.log("Sending Click")
    // setLoading(true)
    dispatch(sendOtp(email))
    // setLoading(false)

  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader title={AuthStrings.ForgotPassword} leftTitle={Characters.Skip} handlePress={() => navigation.goBack()} />

      <View style={styles.emailContainer}>
        <CustomTextInpt placeholder={email} value={email} editable={false} style={{ backgroundColor: "#EEE" }} />
        <View style={{ marginTop: 84 }}>
          <CustomButton title={Characters.Next} onPress={sendForgotOTP} loading={sendOtpApiState.loading}/>
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    backgroundColor: '#F1F1F3',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3C3567',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  skipButton: {
    backgroundColor: 'transparent',
  },
  skipText: {
    fontSize: 16,
    color: '#FFF',
  },
  emailContainer: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  emailText: {
    fontSize: 16,
    color: '#212121',
    paddingLeft: 10,
  },
  submitButton: {
    height: height / 12,
    width: width / 1.1,
    backgroundColor: '#3C3567',
    marginTop: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 20,
  },
});
