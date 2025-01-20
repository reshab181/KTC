// Author: Reshab Kumar Pandey
// Component: SignIn.js


import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Services/Api';
import { fetchJwtAccess } from '../../Utils/JwtHelper';
import RegisterPopUp from './RegisterPopUp';
import CustomHeader from '../../Reusables/CustomHeader';
import CustomTextInpt from '../../Reusables/CustomTextInpt';
import CustomButton from '../../Reusables/CustomButtons';
import { handleSignIn } from '../../Api/Authentication';

const SignInCorporate = ({ route }) => {
  const { email } = route.params || {};
  const navigation = useNavigation();
  const [isModalVisible, setisModalVisible] = useState(true);
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await fetchJwtAccess();
      setAccessToken(token || '');
    };
    fetchAccessToken();
  }, []);

  // const encryptPayload = (data) => {
  //   const ClientID = '!IV@_$2123456789';
  //   const ClientKey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
  //   const iv = CryptoJS.enc.Utf8.parse(ClientID);
  //   const key = CryptoJS.enc.Utf8.parse(ClientKey);

  //   return CryptoJS.AES.encrypt(JSON.stringify(data), key, {
  //     iv,
  //     mode: CryptoJS.mode.CBC,
  //     padding: CryptoJS.pad.Pkcs7,
  //   }).toString();
  // };

  const handleSignInn = async () => {
    // navigation.replace('MainApp', {
    //   screen: 'CorporateModule1',
    // });
    handleSignIn(email, password, accessToken, navigation, setLoading)
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* {isModalVisible && <RegisterPopUp onClose={() => setisModalVisible(false)} />} */}
      <CustomHeader title={"Sign In"} leftTitle={"Skip"} handlePress={() => navigation.goBack()} />

      <View style={styles.form}>
      <CustomTextInpt placeholder={"Email ID or Mobile"} value={email} editable={false} style={{backgroundColor:"#EEE"}}/>
      <CustomTextInpt placeholder={"Password"} value={password} onChangeText={setPassword} />
      <View style={{marginTop: 32}}> 
        <CustomButton title={"Sign In"} onPress={handleSignInn} textSize={18}/>
      </View>
        <TouchableOpacity style={{marginTop: 10}}onPress={() => navigation.replace('ForgotPassword', { email })}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>
        <CustomButton
          title={"Create New Account"}
          backgroundColor={"#F1F1F3"}
          borderWidth={1}
          textColor={"#0F2541"}
          textSize={16}
          onPress={() => navigation.navigate('PersonalRegister')} />
      </View>
    </SafeAreaView>
  );
};

export default SignInCorporate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3C3567',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  skipText: {
    fontSize: 16,
    color: '#FFF',
  },
  form: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 16,
    elevation: 2,
  },
  button: {
    backgroundColor: '#3C3567',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#3C3567',
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#000',
  },
  createAccount: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    elevation: 1,

  }
});
