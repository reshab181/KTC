import React, { useState,useEffect } from 'react';
import {
    SafeAreaView, 
    ScrollView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import CustomHeader from '../../Reusables/CustomHeader';
import CustomButton from '../../Reusables/CustomButtons';
import CustomIconTextInput from '../../Reusables/CustomIconTextInput';
import { RadioButton } from 'react-native-paper';

const { height, width } = Dimensions.get('window');

const COLORS = {
    primary: '#3C3567',
    background: '#F5F5F5',
    white: '#FFFFFF',
    text: '#000000',
    placeholder: '#737373',
    gray: '#666666',
};

const validationSchema = Yup.object().shape({
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

const Register = ({navigation}) => {
    const [selectedGender, setSelectedGender] = useState('Male');
    const [selectedCountry, setSelectedCountry] = useState('India');
    const [accessToken, setAccessToken] = useState('');

    const inputFields = [
        { placeholder: 'First Name', icon: require('../../Assets/manicon.png'), name: 'firstName' },
        { placeholder: 'Last Name', icon: require('../../Assets/manicon.png'), name: 'lastName' },
        { placeholder: 'Official Email ID', icon: require('../../Assets/email.png'), name: 'email' },
        { placeholder: '16/09/2002', icon: require('../../Assets/cake_blackk.png'), name: 'email' },
        { placeholder: 'Mobile Number', icon: require('../../Assets/phone.png'), name: 'phone', keyboardType: 'numeric' },
        { placeholder: 'Password', icon: require('../../Assets/lock.png'), name: 'password', secureTextEntry: true },
    ];

    return (
     <SafeAreaView style={styles.root}>
                <CustomHeader title="Profile" iconPath={require('../../Assets/icbackarrow.png')} iconHeight={24} iconWidth={24} handleLeftIcon={() => navigation.goBack()} />

                <View style={styles.scrollContainer}>
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
                        onSubmit={(values) => console.log(values)}
                    >
                        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                            <>
                                <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
                                    {inputFields.map((field, index) => (
                                        <View key={index} style={styles.inputContainer}>
                                            <CustomIconTextInput
                                                placeholder={field.placeholder}
                                                icon1={field.icon}
                                                value={values[field.name]}
                                                onChangeText={handleChange(field.name)}
                                                onBlur={handleBlur(field.name)}
                                                keyboardType={field.keyboardType}
                                                secureTextEntry={field.secureTextEntry}
                                            />
                                            {touched[field.name] && errors[field.name] && (
                                                <Text style={styles.errorText}>{errors[field.name]}</Text>
                                            )}
                                        </View>
                                    ))}

                                </ScrollView>

                                <View style={styles.buttonContainer}>
                                   
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F1F1F3',
      },
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContainer: {
        flex: 1,
    },
    formContainer: {
        marginTop: 16,
    },
    inputContainer: {
        marginBottom: 16,
        marginHorizontal: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    selectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 4,
        height: 48,
        elevation: 1,
        paddingHorizontal: 10,
        marginBottom: 16,
        marginHorizontal: 16,

    },
    selectionIcon: {
        height: 30,
        width: 30,
        marginRight: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioText: {
        fontSize: 16,
        color: COLORS.gray,
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLORS.background,
    },
});

export default Register;


