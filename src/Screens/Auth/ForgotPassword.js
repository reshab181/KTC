import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { fetchJwtAccess } from '../../Utils/JwtHelper';
import CustomHeader from '../../Reusables/CustomHeader';
import CustomTextInpt from '../../Reusables/CustomTextInpt';
import CustomButton from '../../Reusables/CustomButtons';
import { emailsms } from '../../Api/Authentication';

const { height, width } = Dimensions.get('screen');

const ForgotPassword = ({ route, navigation }) => {
  const { email } = route.params || {};
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await fetchJwtAccess();
        if (token) setAccessToken(token);
      } catch (err) {
        setError('Failed to fetch access token.');
      }
    };

    getAccessToken();
  }, []);

  const sendForgotOTP = () => {
    emailsms(email, accessToken, navigation, setLoading);
    // navigation.navigate("OTP")
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
         <CustomHeader title={"Forgot Password"} leftTitle={"Skip"} handlePress={() => navigation.goBack()}/>

      <View style={styles.emailContainer}>
        <CustomTextInpt placeholder={"Enter your registered email ID"} value={email} editable={false} />
        <View style={{marginTop: 94}}>
        <CustomButton title={"Next"} onPress={sendForgotOTP} />
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F1F1F3',
  },
  emailContainer: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
