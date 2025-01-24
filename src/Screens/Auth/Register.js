


//**Author---Reshab Kumar Pandey
// Component---Register.js */

import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image,
    Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomHeader from '../../Reusables/CustomHeader';
import CustomButton from '../../Reusables/CustomButtons';
import CustomIconTextInput from '../../Reusables/CustomIconTextInput';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

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
    email: Yup.string().email('Invalid email address').required('Email is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    phone: Yup.string().length(10, 'Phone number must be 10 digits').required('Phone number is required'),
    alternatePhone: Yup.string().length(10, 'Alternate phone number must be 10 digits').required('Alternate phone number is required'),
    dob: Yup.date()
        .required('Date of birth is required')
        .nullable()
        .max(new Date(), 'Date of birth cannot be in the future'),
    gender: Yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender').required('Gender is required'),
    country: Yup.string().required('Country is required'),
});

const Register = () => {
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('India');
    const [dob, setDob] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigation=useNavigation()

    const inputFields = [
        { placeholder: 'Official Email ID', icon: require('../../Assets/email.png'), name: 'email' },
        { placeholder: 'First Name', icon: require('../../Assets/manicon.png'), name: 'firstName' },
        { placeholder: 'Last Name', icon: require('../../Assets/manicon.png'), name: 'lastName' },
        { placeholder: 'Password', icon: require('../../Assets/lock.png'), name: 'password', secureTextEntry: true },
        { placeholder: 'Confirm Password', icon: require('../../Assets/lock.png'), name: 'confirmPassword', secureTextEntry: true },
        { placeholder: 'Mobile Number', icon: require('../../Assets/phone.png'), name: 'phone', keyboardType: 'numeric' },
        { placeholder: 'Alternate Mobile Number', icon: require('../../Assets/phone.png'), name: 'alternatePhone', keyboardType: 'numeric' },
    ];

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDob(selectedDate.toISOString().split('T')[0]); 
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <CustomHeader
                title="Register"
                iconPath={require('../../Assets/icbackarrow.png')}
                iconHeight={24}
                iconWidth={24}
                handleLeftIcon={() => navigation.goBack()}
            />

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
                    onSubmit={(values) => {
                        console.log(values);
                        navigation.replace('SignInCorporate');
                    }}
                >
                    {({ values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue }) => (
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

                                {/* Date of Birth Field */}
                                <TouchableOpacity
                                    style={styles.selectionContainer}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <Image
                                        source={require('../../Assets/DOB.png')}
                                        style={styles.selectionIcon}
                                    />
                                    <Text style={styles.dobText}>{dob || 'Select Date of Birth'}</Text>
                                </TouchableOpacity>
                                {touched.dob && errors.dob && (
                                    <Text style={styles.errorText}>{errors.dob}</Text>
                                )}
                                {showDatePicker && (
                                    <DateTimePicker
                                        mode="date"
                                        value={dob ? new Date(dob) : new Date()}
                                        maximumDate={new Date()}
                                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                        onChange={(event, selectedDate) => {
                                            handleDateChange(event, selectedDate);
                                            setFieldValue('dob', selectedDate || '');
                                        }}
                                    />
                                )}

                                {/* Gender and Country Fields */}
                                <View style={styles.selectionContainer}>
                                    <Image
                                        source={require('../../Assets/Gender.png')}
                                        style={styles.selectionIcon}
                                    />
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

                                <View style={styles.selectionContainer}>
                                    <Image
                                        source={require('../../Assets/flag_black_24dp.png')}
                                        style={styles.selectionIcon}
                                    />
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
                            </ScrollView>

                            <View style={styles.buttonContainer}>
                                <CustomButton
                                    title="Sign Up"
                                    onPress={handleSubmit}
                                    widthSize="100%"
                                    textSize={18}
                                    borderRadius={0}
                                    isSelected={true}
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
    dobText: {
        fontSize: 14,
        color: COLORS.placeholder,
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
