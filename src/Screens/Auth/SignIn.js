// Author: Reshab Kumar Pandey
// Component: SignIn.js

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
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../../Redux/slice/Userslice';
import { setUserProfile } from '../../Redux/slice/UserProfileSlice';
import RegisterPOPUP from './RegisterPopUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserProfileData } from '../../Utils/userProfileUtils';


const SignInCorporate = ({ route }) => {
  const { email: prefilledEmail } = route.params || {};
  const navigation = useNavigation();
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await fetchJwtAccess();
      setAccessToken(token || '');
    };
    fetchAccessToken();
  }, []);
  const dispatch = useDispatch();

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

  const handleSignInn = async () => {
    if (!validateForm()) return;

    setLoading(true);
    // const date = (userData.bithdate*1000).toLocaleString

    try {
      const userData = await handleSignIn(email, password, accessToken, navigation, setLoading);
      // Methods added by Ashutosh Rai 
      // console.log('====================================');
      // console.log("USER DATA", userData);
      // console.log('====================================');
      if (userData) {
        setUserProfileData(dispatch, userData);
        await AsyncStorage.setItem('isLoggedInn', 'true');
        await AsyncStorage.setItem('user_id', userData.user_id);
        await AsyncStorage.setItem('user_email', userData.email_id);
      }
    } catch (error) {
      Alert.alert('Sign In Error', error.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedModule(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Sign In"
        leftTitle="Skip"
        handlePress={() => navigation.navigate('ModuleSelectionUI')}
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
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}


        <View style={{ marginTop: 32 }}>
          <CustomButton
            title={'Sign In'}
            onPress={handleSignInn}
            textSize={18}
            loading={loading}
          />
        </View>


        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => navigation.replace('ForgotPassword', { email })}
        >
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>


        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>


        <CustomButton
          title="Create New Account"
          backgroundColor="#F1F1F3"
          borderWidth={1}
          textColor="#0F2541"
          textSize={16}
          onPress={() => {
            console.log('====================================');
            console.log("clicked");
            setSelectedModule(module);
            setIsModalVisible(true);
            console.log('====================================');
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

