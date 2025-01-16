import React, { useState,useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
  
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomHeader from '../../ReusableBtn/CustomHeader';
import CustomTextInpt from '../../ReusableBtn/CustomTextInpt';
import CustomButton from '../../ReusableBtn/CustomButtons';
import { fetchJwtAccess } from '../../Utils/JwtHelper';
import { NewUser } from '../../Api/Authentication';

const { height, width } = Dimensions.get('window');

// Colors constant for consistent theming
const COLORS = {
    primary: '#3C3567',
    background: '#F5F5F5',
    white: '#FFFFFF',
    text: '#000000',
    placeholder: '#737373',
    gray: '#666666'
};

// Validation schema using Yup

const validationSchema = Yup.object().shape({
    // email: Yup.string().email('Invalid email address').required('Email is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    phone: Yup.string().length(10, 'Phone number must be 10 digits').required('Phone number is required'),
    alternatePhone: Yup.string().length(10, 'Alternate phone number must be 10 digits').required('Alternate phone number is required'),
    dob: Yup.date().required('Date of birth is required').nullable().max(new Date(), 'Date of birth cannot be in the future'),
    gender: Yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender').required('Gender is required'),
    country: Yup.string().required('Country is required'),
});



const Register = () => {
    const [date, setDate] = useState(new Date());
    const [openDate, setOpenDate] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('India');
    const [accessToken, setAccessToken] = useState('');

     useEffect(() => {
        const getAccessToken = async () => {
          const token = await fetchJwtAccess();
          if (token) {
            setAccessToken(token);
          }
        };
    
        getAccessToken();
      }, []);

      // Encrypt data
  const encryptData = (data) => {
    const ClientID = '!IV@_$2123456789';
    const Clientkey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
    const CryptoJsCI = CryptoJS.enc.Utf8.parse(ClientID);
    const CryptoJsCK = CryptoJS.enc.Utf8.parse(Clientkey);

    const EncryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJsCK, {
      iv: CryptoJsCI,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return EncryptedData.ciphertext.toString(CryptoJS.enc.Base64);
  };
      
  const handleRegister = async (values) => {
    const payload = {
      email_id: values.email,
      f_name: values.firstName,
      l_name: values.lastName,
      gender: values.gender,
      birthdate: `${new Date(values.dob).getFullYear()}-${new Date(values.dob).getMonth() + 1}-${new Date(values.dob).getDate()}`,
      mobile_number: values.phone,
      password: values.password,
      client_id: 'client_id_placeholder', 
      sub_enitityid: 'sub_entityid_placeholder', 
      country: values.country,
      alternative_no: values.alternatePhone,
    };

    const encryptedPayload = encryptData(payload);

    const formBody = `request_data=${encodeURIComponent(encryptedPayload)}`;

    try {
      const response = await fetch('https://web.gst.fleet.ktcindia.com/user_apis_encoded/user_registration.php', {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          jwt: accessToken,
        },
      });

      const data = await response.json();

      if (data.message) {
        Alert.alert('Success', 'Account Created Successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn', { email: values.email }),
          },
        ]);
      } else {
        Alert.alert('Error', 'Something went wrong during registration.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'Failed to register. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <CustomHeader title="Register" />
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              confirmPassword: '',
              phone: '',
              alternatePhone: '',
              dob: '',
              gender: '',
              country: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
              <View style={styles.formContainer}>
                {/* Email Input */}
                <View style={styles.inputWrapper}>
                  <CustomTextInpt
                    style={styles.emailInput}
                    placeholder="Official Email ID"
                    placeholderTextColor={COLORS.placeholder}
                    maxLength={80}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

                {/* Name Inputs */}
                {['firstName', 'lastName'].map((field, index) => (
                  <View key={index} style={styles.inputContainer}>
                    <View style={styles.iconContainer}>
                      <Image source={require('../../Assets/manicon.png')} style={styles.icon} />
                    </View>
                    <CustomTextInpt
                      style={styles.input}
                      placeholder={field === 'firstName' ? 'First Name' : 'Last Name'}
                      placeholderTextColor={COLORS.placeholder}
                      onBlur={handleBlur(field)}
                      onChangeText={handleChange(field)}
                      value={values[field]}
                    />
                    {touched[field] && errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
                  </View>
                ))}

                {/* Password Inputs */}
                {['password', 'confirmPassword'].map((field, index) => (
                  <View key={index} style={styles.inputContainer}>
                    <View style={styles.iconContainer}>
                      <Image source={require('../../Assets/lock.png')} style={styles.icon} />
                    </View>
                    <CustomTextInpt
                      style={styles.input}
                      placeholder={field === 'password' ? 'Password' : 'Confirm Password'}
                      placeholderTextColor={COLORS.placeholder}
                      secureTextEntry
                      onBlur={handleBlur(field)}
                      onChangeText={handleChange(field)}
                      value={values[field]}
                    />
                    {touched[field] && errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
                  </View>
                ))}

                {/* Date Picker */}
                <TouchableOpacity onPress={() => setOpenDate(true)}>
                  <View style={styles.inputContainer}>
                    <View style={styles.iconContainer}>
                      <Image source={require('../../Assets/DOB.png')} style={styles.icon} />
                    </View>
                    <CustomTextInpt
                      style={styles.input}
                      placeholder="YYYY/MM/DD"
                      placeholderTextColor={COLORS.placeholder}
                      editable={false}
                      value={date.toLocaleDateString()}
                    />
                  </View>
                </TouchableOpacity>

                {/* Phone Number Inputs */}
                {/* Repeated phone number inputs */}
                {[{ name: 'phone', placeholder: 'Mobile Number' }, { name: 'alternatePhone', placeholder: 'Alternate Mobile Number' }].map((item, index) => (
                  <View key={index} style={styles.inputContainer}>
                    <View style={styles.iconContainer}>
                      <Image source={require('../../Assets/phone.png')} style={styles.icon} />
                    </View>
                    <View style={styles.countryCode}>
                      <Text style={styles.countryCodeText}>+91</Text>
                    </View>
                    <CustomTextInpt
                      style={styles.input}
                      placeholder={item.placeholder}
                      placeholderTextColor={COLORS.placeholder}
                      maxLength={10}
                      keyboardType="numeric"
                      onBlur={handleBlur(item.name)}
                      onChangeText={handleChange(item.name)}
                      value={values[item.name]}
                    />
                    {touched[item.name] && errors[item.name] && (
                      <Text style={styles.errorText}>{errors[item.name]}</Text>
                    )}
                  </View>
                ))}

                {/* Gender Selection */}
                <View style={styles.genderContainer}>
                  <Image source={require('../../Assets/Gender.png')} style={styles.selectionIcon} />
                  <View style={styles.radioContainer}>
                    {['Male', 'Female', 'Others'].map((gender) => (
                      <View key={gender} style={styles.radioOption}>
                        <RadioButton
                          value={gender.toLowerCase()}
                          status={selectedGender === gender.toLowerCase() ? 'checked' : 'unchecked'}
                          onPress={() => setSelectedGender(gender.toLowerCase())}
                          color={COLORS.primary}
                        />
                        <Text style={styles.radioText}>{gender}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Country Selection */}
                <View style={styles.countryContainer}>
                  <Image source={require('../../Assets/flag_black_24dp.png')} style={styles.selectionIcon} />
                  <View style={styles.radioContainer}>
                    {['India', 'Others'].map((country) => (
                      <View key={country} style={styles.radioOption}>
                        <RadioButton
                          value={country}
                          status={selectedCountry === country ? 'checked' : 'unchecked'}
                          onPress={() => setSelectedCountry(country)}
                          color={COLORS.primary}
                        />
                        <Text style={styles.radioText}>{country}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Submit Button */}
                <CustomButton title="Sign Up" onPress={handleSubmit} widthSize="100%" />
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>

      {/* Date Picker Modal */}
      <DatePicker
        modal
        mode="date"
        open={openDate}
        date={date}
        onConfirm={(selectedDate) => {
          setOpenDate(false);
          setDate(selectedDate);
        }}
        onCancel={() => setOpenDate(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    
    scrollContainer: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 20,
    },
    formContainer: {
        paddingBottom: 10,
        backgroundColor: '#F2F2F2',
    },
    // inputWrapper: {
    //     height: height / 15.5,
    //     width: width - 40,
    //     marginTop: 10,
    //     alignSelf: 'center',
    //     backgroundColor: COLORS.white,
    //     borderRadius: 8,
    //     justifyContent: 'center',
    //     paddingHorizontal: 15,
    //     elevation: 2,
    // },
    emailInput: {
        height: 48,
        fontSize: 16,
        color: COLORS.text,
        textAlignVertical: 'center',
    },
    inputContainer: {
        height: height / 15.5,
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginTop: 15,
        borderRadius: 8,

        paddingHorizontal: 15,
    },
    iconContainer: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 25,
        width: 25,
    },
    input: {
        flex: 1,
        color: COLORS.text,
        fontSize: 16,
        paddingLeft: 12,
    },
    phoneContainer: {
        height: height / 15.5,
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginTop: 15,
        borderRadius: 8,
        paddingHorizontal: 15,
        elevation: 2,
    },
    countryCode: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    countryCodeText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: 'bold',
    },
    phoneInputText: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
        paddingLeft: 5,
    },
    genderContainer: {
        height: height / 15.5,
        width: width - 40,
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        flexDirection: 'row',
    
    },
    countryContainer: {
        height: height / 15.5,
        width: width - 40,
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        flexDirection: 'row',
   
    },
    selectionIcon: {
        marginTop: 15,
        marginHorizontal: 15,
        height: 30,
        width: 30,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
     
        flex: 1,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    radioText: {
        fontSize: 16,
        color: COLORS.text,
        marginLeft: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
  
});



export default Register;


