// Reshabh Pandey
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchJwtAccess } from '../../Utils/JwtHelper';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInpt from '../../component/CustomTextInpt';
import CustomButton from '../../component/CustomButtons';
import { handleSignIn } from '../../Api/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../../Redux/slice/Userslice';
import { setUserProfile } from '../../Redux/slice/UserProfileSlice';
import RegisterPOPUP from './RegisterPopUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserProfileData } from '../../Utils/userProfileUtils';
import { AuthStrings, Characters } from '../../constants/Strings';
import { SignInApi } from '../../services/api/SignInApi';
import { SignIn } from '../../Redux/slice/SignInSlice';
import { decryptData } from '../../Utils/EncryptionUtility';


const SignInCorporate = ({ route }) => {
  const { email: prefilledEmail } = route.params || {};
  const navigation = useNavigation();
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('AsHu@123');
  const [errors, setErrors] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  // const SingInApiState = useSelector((state) => state.SignIn);
  const SignInApiState = useSelector((state) => state.signIn);

  // useEffect(() => {
  //   const fetchAccessToken = async () => {
  //     const token = await fetchJwtAccess();
  //     setAccessToken(token || '');
  //   };
  //   fetchAccessToken();
  // }, []);
  // const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    dispatch(SignIn({ email: email, password: password }));
    setLoading(false);

    // const date = (userData.bithdate*1000).toLocaleString

    // try {


    //  console.log('====================================');
    //  console.log("SingInApiState.data", SingInApiState.data , "SignInApiState");
    //  console.log('====================================');
    //  if(SingInApiState.loading === false && SingInApiState.data   && SingInApiState.data !== null){
    // navigation.replace('CorporateNavigator', {
    //   screen: 'CorporateHomeScreen',
    // });
    //   console.log('====================================');
    //   console.log("Hello");
    //   console.log('====================================');
    //  }
    //  if(SingInApiState.data.status === "200" ){

    //   console.log('====================================');
    //   console.log("Hello");
    //   console.log('====================================');
    //  }
    // const userData = await handleSignIn(email, password, accessToken, navigation, setLoading);
    // Methods added by Ashutosh Rai 
    // console.log('====================================');
    // console.log("USER DATA", userData);
    // console.log('====================================');
    // if (userData) {
    // setUserProfileData(dispatch, userData);
    // await AsyncStorage.setItem('isLoggedInn', 'true');
    // await AsyncStorage.setItem('user_id', userData.user_id);
    // await AsyncStorage.setItem('user_email', userData.email_id);
    // await AsyncStorage.setItem('userToken' , accessToken);
    // }

    // } catch (error) {
    // Alert.alert('Sign In Error', error.message || 'Unable to sign in.');
    // } finally {
    // setLoading(false);
    // }
  };
  const validateForm = () => {
    const validationErrors = {};


    if (!email) {
      validationErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Enter a valid email address.';
    }


    if (!password) {
      validationErrors.password = 'Password is required.';
    } else if (password.length < 4) {
      validationErrors.password = 'Password must be at least 4 characters.';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  useEffect(() => {
    console.log("Updated Redux State:", SignInApiState);
    verifySignIn();

  }, [SignInApiState]);
  // useEffect(()=>{
  //   return(()=>{
  //     dispatchresetSignInState(); 
  //   })
  // })
  const verifySignIn = async() => {
    if (SignInApiState.loading === false && SignInApiState.data && SignInApiState.data !== null) {
      if (SignInApiState.data.message === "Password Not Match") {
        Alert.alert('Incorrect Password',
          {
            text: 'OK',
            onPress: () => { },
          },
        );
        return;
      }
      if (SignInApiState.data.status === 200) {
        const userData = decryptData(SignInApiState.data.result)
        dispatch(setUserProfile(userData));
        console.log('====================================');
        console.log("STATUS=============", userData.status);
        console.log('====================================');

        await AsyncStorage.setItem('status', userData.status);

        await AsyncStorage.setItem('isLoggedInn', 'true');
        await AsyncStorage.setItem('user_id', userData.user_id);
        await AsyncStorage.setItem('email_id', userData.email_id);
        await AsyncStorage.setItem('f_name', userData.f_name);
        await AsyncStorage.setItem('l_name', userData.l_name);
        await AsyncStorage.setItem('client_name', userData.client_name);
        await AsyncStorage.setItem('client_id', userData.client_id);
        await AsyncStorage.setItem('gender', userData.gender);
        await AsyncStorage.setItem('mobile_number', userData.mobile_number);
        await AsyncStorage.setItem('user_type', userData.user_type);
        const birthdate = (userData.bithdate);
        const timestamp = birthdate;
        const date = new Date(timestamp);
        AsyncStorage.setItem('bithdate', date.toLocaleDateString('en-GB').toString());
        AsyncStorage.setItem('country', userData.country);
        AsyncStorage.setItem('userToken', accessToken);
        navigation.replace('CorporateNavigator', {
          screen: 'CorporateHomeScreen',
        });

      }
    } else if (SignInApiState.loading === false && SignInApiState.error !== null) {
      console.log('Error', SignInApiState.error)
      Alert.alert('Error', 'Failed to Sign In . Please try again.');
    }

  }

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedModule(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={AuthStrings.SignIn}
        leftTitle={Characters.Skip}
        handlePress={() => navigation.replace('ModuleSelection')}
      />
      <View style={styles.form}>
        {isModalVisible && (
          <RegisterPOPUP
            module={selectedModule}
            onClose={closeModal}
          />
        )}
        <CustomTextInpt
          placeholder="Email ID or Mobile"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{ backgroundColor: prefilledEmail ? '#EEE' : '#FFF' }}
          editable={!prefilledEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <CustomTextInpt
          placeholder={AuthStrings.Password}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}


        <View style={{ marginTop: 32 }}>
          <CustomButton
            title={AuthStrings.SignIn}
            onPress={handleSubmit}
            textSize={18}
            loading={SignInApiState.loading}
          />
        </View>


        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => navigation.replace('ForgotPassword', { email })}
        >
          <Text style={styles.linkText}>{AuthStrings.FORGOTPASSWORD}</Text>
        </TouchableOpacity>


        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>{AuthStrings.OR}</Text>
          <View style={styles.line} />
        </View>


        <CustomButton
          title={AuthStrings.CreateNewAccount}
          backgroundColor="#F1F1F3"
          borderWidth={1}
          textColor="#0F2541"
          textSize={16}
          onPress={() => {
            setSelectedModule(module);
            setIsModalVisible(true);
          }
          }
        />
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
  form: {
    marginTop: 20,
    marginHorizontal: 16,
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
    marginBottom: 24,
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },
});

