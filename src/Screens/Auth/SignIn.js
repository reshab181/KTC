//**Author---- Reshab Kumar Pandey
// Component----SignIn.js */


import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
 
 
} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import RegisterPOPUP from './RegisterPopUp';
import { fetchJwtAccess } from '../../Utils/JwtHelper';
import { handleSignIn } from '../../Api/Authentication';
import CustomButton from '../../ReusableBtn/CustomButtons';


const SignInCorporate = ({ route }) => {
  const { email } = route.params;
  const navigation = useNavigation();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisModalVisible(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getAccessToken = async () => {
      const token = await fetchJwtAccess();
      if (token) {
        setAccessToken(token);
      }
    };

    getAccessToken();
  }, []);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleNavigate = (module) => {
    if (navigation.isFocused()) {
      navigation.navigate('SignInCorporate', {
        screen: 'RegisterPOPUP',
        params: { presentation: 'modal', module },
      });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign In</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {isModalVisible && <RegisterPOPUP onClose={() => setisModalVisible(false)} />}

      <Formik
        initialValues={{ email: email || '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSignIn(email, values.password, accessToken, navigation, setLoading)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.Email1}>
              <View style={styles.Email2}>
                <TextInput
                  style={styles.Text1}
                  placeholder="Official Email ID "
                  placeholderTextColor="#000"
                  keyboardType="email-address"
                  maxLength={80}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={email}
                  editable={false}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.password1}>
              <View style={styles.password2}>
                <TextInput
                  style={styles.Text2}
                  secureTextEntry
                  placeholder="Password"
                  placeholderTextColor="#212121"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <CustomButton
                  title="Sign In"
                  onPress={handleSubmit}
                  widthSize="100%"
                  borderRadius={0}
                  // loading={loader}
                />
          </>
        )}
      </Formik>

      <View style={styles.forgot}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword", { email })}>
          <Text style={styles.Text4}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity onPress={() => handleNavigate('Corporate')}>
        <View style={styles.Create}>
          <Text style={styles.Text5}>Create New Account</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default SignInCorporate;
const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: '#F1F1F3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3C3567',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
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
  Email1: {
    marginTop: 30,
    alignSelf: 'center',
  },
  Email2: {
    height: Dimensions.get('screen').height / 15,
    width: Dimensions.get('screen').width / 1.1,
    backgroundColor: '#FFF',

    marginBottom: 10,
    elevation: 2,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  Text1: {
    height: Dimensions.get('screen').height / 15,
    color: '#212121',
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  password1: {
    marginTop: 20,
    alignSelf: 'center',
  },
  password2: {
    height: Dimensions.get('screen').height / 15,
    width: Dimensions.get('screen').width / 1.1,
    backgroundColor: '#FFF',

    elevation: 2,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  Text2: {
    height: Dimensions.get('screen').height / 15,
    color: '#212121',
    fontSize: 16,
  },
  eye: {
    position: 'absolute',
    top: '50%',
    right: '8%',
    transform: [{ translateY: -10 }],
  },
  buttonContainer: {
    height: Dimensions.get('screen').height / 15,
    width: Dimensions.get('screen').width / 1.1,
    backgroundColor: '#3C3567',
  
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgot: {
    marginTop: 20,
    alignItems: 'center',
  },
  Text4: {
    color: '#3C3567',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 20,
  },
  orText: {
    width: 50,
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
  },
  Create: {
    height: Dimensions.get('screen').height / 13,
    width: Dimensions.get('screen').width / 1.1,
    backgroundColor: '#FFFFFF00',
    borderRadius: 7,
    marginTop: 20,
    alignSelf: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  Text5: {
    alignSelf: 'center',
    color: '#3C3567',
    fontSize: 17,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 25,
    marginTop: 5,
  },
});



