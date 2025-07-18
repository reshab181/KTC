//**Author---Reshab Kumar Pandey
// Component---RegisterPopUp.js */





import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';

import CustomTextInpt from '../../component/CustomTextInpt';
import CustomButton from '../../component/CustomButtons';

import { fetchJwtAccess } from '../../Utils/JwtHelper';
import { registrationHandler } from '../../Api/Authentication';
import { AuthStrings } from '../../constants/Strings';
import {jwtTokenApi} from '../../services/api/jwtToken';


const { height } = Dimensions.get('screen');

const RegisterPOPUP = ({ onClose }) => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState('');
  const [loader, setLoader] = useState(false);
  const [userType, setUserType] = useState('corporate');
  const [visible, setVisible] = useState(true);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  useEffect(() => {
    
    const getAccessToken = async () => {
      try {
      const token = await jwtTokenApi();
      console.log(token.data)
      if (token.data) {
        
        setAccessToken(token);
      }
    } catch(ex) {
      console.log(ex)
    }
    };
    getAccessToken();
  }, []);

  return (
    <Modal propagateSwipe={true} animationType="slide" transparent visible={visible}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Formik
            initialValues={{ email: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) errors.email = 'Email is required';
              else if (!emailRegex.test(values.email)) errors.email = 'Invalid email address';
              return errors;
            }}
            onSubmit={async({ email }) => {
              // registrationHandler(email, userType, accessToken,navigation, setLoader)
              // setLoader(true);  // Start loader
              await registrationHandler(email, userType, accessToken, navigation, setLoader)
              // setLoader(false);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Register</Text>
                  <TouchableOpacity onPress={onClose}>
                    <Image source={require('../../assets/close.png')} />
                  </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 16, marginTop: 14, marginBottom: 19 }}>
                  <Text style={styles.instruction}>{AuthStrings.EnterEmail}</Text>
                  <CustomTextInpt
                    placeholder="Official Email ID"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')} 
                    keyboardType="email-address"
                    secureTextEntry={false}
                  />
                
                  {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>
                <CustomButton
                  title={AuthStrings.Submit}
                  onPress={handleSubmit}
                  borderRadius={0}
                  loading={loader}
                />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default RegisterPOPUP;

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

