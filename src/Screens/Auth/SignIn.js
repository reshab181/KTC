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


const SignInCorporate = ({ route }) => {
  const { email: prefilledEmail } = route.params || {};
  const navigation = useNavigation();
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await fetchJwtAccess();
      setAccessToken(token || '');
    };
    fetchAccessToken();
  }, []);

  const validateForm = () => {
    const validationErrors = {};


    if (!email) {
      validationErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Enter a valid email address.';
    }


    if (!password) {
      validationErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSignInn = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      await handleSignIn(email, password, accessToken, navigation, setLoading);
      // navigation.replace('MainApp', {
      //   screen: 'CorporateModule1',
      // })
    } catch (error) {
      Alert.alert('Sign In Error', error.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Sign In"
        leftTitle="Skip"
        handlePress={() => navigation.goBack()}
      />
      <View style={styles.form}>
    
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
            title={loading ? 'Signing In...' : 'Sign In'}
            onPress={handleSignInn}
            textSize={18}
            disabled={loading}
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
          onPress={() => navigation.navigate('Register')}
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

