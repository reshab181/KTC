import React, { useState,useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import RegisterPOPUP from './RegisterPopUp';

const SignInCorporate = () => {
  const { height, width } = Dimensions.get('screen');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisModalVisible(true); 
    }, 3000); 
    
    return () => clearTimeout(timer);
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSignIn = (values) => {
    console.log('Form Submitted:', values);
  };

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign In</Text>
          <TouchableOpacity>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        
            {isModalVisible && <RegisterPOPUP onClose={() => setisModalVisible(false)} />}
        
        {/* Formik Form */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
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
              {/* Email Input */}
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
                    value={values.email}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.password1}>
                <View style={styles.password2}>
                  <TextInput
                    style={styles.Text2}
                    secureTextEntry={!isPasswordVisible}
                    placeholder="Password"
                    placeholderTextColor="#212121"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {/* <TouchableOpacity
                    style={styles.eye}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Icon
                      name={isPasswordVisible ? 'eye' : 'eye-off'}
                      size={30}
                      color="#212121"
                    />
                  </TouchableOpacity> */}
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Sign In Button */}
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* Forgot Password */}
        <View style={styles.forgot}>
          <TouchableOpacity>
            <Text style={styles.Text4}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* OR Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Create New Account */}
        <TouchableOpacity>
          <View style={styles.Create}>
            <Text style={styles.Text5}>Create New Account</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
    // borderRadius: 8,
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
    fontSize: 14, // Adjusted size for balance
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
    paddingVertical: 10, // Added vertical padding
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


export default SignInCorporate;
