import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { Formik } from 'formik';  
import * as Yup from 'yup'; 

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
        email: Yup.string().email('Invalid email address').required('Email is required'),
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

    return (
        <SafeAreaView style={styles.mainContainer}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Register</Text>
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
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                            <View style={styles.formContainer}>
                                {/* Email Input */}
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.emailInput}
                                        placeholder="Official Email ID"
                                        placeholderTextColor={COLORS.placeholder}
                                        maxLength={80}
                                        onBlur={handleBlur('email')}
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                    />
                                    {touched.email && errors.email && (
                                        <Text style={styles.errorText}>{errors.email}</Text>
                                    )}
                                </View>

                                {/* Name Inputs */}
                                {['firstName', 'lastName'].map((field, index) => (
                                    <View key={index} style={styles.inputContainer}>
                                        <View style={styles.iconContainer}>
                                            <Image
                                                source={require('../../Assets/manicon.png')}
                                                resizeMode="contain"
                                                style={styles.icon}
                                            />
                                        </View>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={field === 'firstName' ? 'First Name' : 'Last Name'}
                                            placeholderTextColor={COLORS.placeholder}
                                            onBlur={handleBlur(field)}
                                            onChangeText={handleChange(field)}
                                            value={values[field]}
                                        />
                                        {touched[field] && errors[field] && (
                                            <Text style={styles.errorText}>{errors[field]}</Text>
                                        )}
                                    </View>
                                ))}

                                {/* Password Inputs */}
                                {['password', 'confirmPassword'].map((field, index) => (
                                    <View key={index} style={styles.inputContainer}>
                                        <View style={styles.iconContainer}>
                                            <Image
                                                source={require('../../Assets/lock.png')}
                                                resizeMode="contain"
                                                style={styles.icon}
                                            />
                                        </View>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={field === 'password' ? 'Password' : 'Confirm Password'}
                                            placeholderTextColor={COLORS.placeholder}
                                            secureTextEntry
                                            onBlur={handleBlur(field)}
                                            onChangeText={handleChange(field)}
                                            value={values[field]}
                                        />
                                        {touched[field] && errors[field] && (
                                            <Text style={styles.errorText}>{errors[field]}</Text>
                                        )}
                                    </View>
                                ))}

                                {/* Date Picker */}
                                <TouchableOpacity onPress={() => setOpenDate(true)}>
                                    <View style={styles.inputContainer}>
                                        <View style={styles.iconContainer}>
                                            <Image
                                                source={require('../../Assets/DOB.png')}
                                                resizeMode="contain"
                                                style={styles.icon}
                                            />
                                        </View>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="YYYY/MM/DD"
                                            placeholderTextColor={COLORS.placeholder}
                                            editable={false}
                                            value={date.toLocaleDateString()}
                                        />
                                    </View>
                                </TouchableOpacity>

                                {/* Phone Number Inputs */}

                                <View style={styles.inputContainer}>
                                    <View style={styles.iconContainer}>
                                        <Image
                                            source={require('../../Assets/phone.png')}
                                            resizeMode="contain"
                                            style={styles.icon}
                                        />
                                    </View>
                                    <View style={styles.countryCode}>
                                        <Text style={styles. countryCodeText}>+91</Text>
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Mobile Number"
                                        placeholderTextColor={COLORS.placeholder}
                                        maxLength={10}
                                        keyboardType="numeric"
                                        onBlur={handleBlur('phone')}
                                        onChangeText={handleChange('phone')}
                                        value={values.phone}
                                    />
                                    {touched.phone && errors.phone && (
                                        <Text style={styles.errorText}>{errors.phone}</Text>
                                    )}
                                </View>

                                <View style={styles.inputContainer}>
                                    <View style={styles.iconContainer}>
                                        <Image
                                            source={require('../../Assets/phone.png')}
                                            resizeMode="contain"
                                            style={styles.icon}
                                        />
                                    </View>
                                    <View style={styles.countryCode}>
                                    <Text style={styles. countryCodeText}>+91</Text>
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Alternate Mobile Number"
                                        placeholderTextColor={COLORS.placeholder}
                                        maxLength={10}
                                        keyboardType="numeric"
                                        onBlur={handleBlur('alternatePhone')}
                                        onChangeText={handleChange('alternatePhone')}
                                        value={values.alternatePhone}
                                    />
                                    {touched.alternatePhone && errors.alternatePhone && (
                                        <Text style={styles.errorText}>{errors.alternatePhone}</Text>
                                    )}
                                </View>



                                {/* Gender Selection */}
                                <View style={styles.genderContainer}>
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

                                {/* Country Selection */}
                                <View style={styles.countryContainer}>
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

                                {/* Sign Up Button */}
                                <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
                                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                                </TouchableOpacity>
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
        height: height / 8,
        width: width,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'flex-start',  
        marginTop: 10,
        elevation: 5,
        paddingLeft: 15, 
    },
    
    headerText: {
        fontSize: 24,
        color: COLORS.white,
        fontWeight: 'bold',
    
        paddingLeft: 10, 
    },
    
    scrollContainer: {
        flex: 1,
        marginTop: 1,
    },
    formContainer: {
        paddingBottom: 20,
    },
    inputWrapper: {
        height: height / 12,
        width: width / 1.11,
        marginTop: 35,
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    emailInput: {
        height: 70,
        width: '90%',
        color: COLORS.placeholder,
        fontSize: 15,
        textAlignVertical: 'center',
    },
    inputContainer: {
        height: 70,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 8,
        elevation: 2,
        paddingLeft: 10,
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
        fontSize: 15,
        paddingHorizontal: 10,
    },
    phoneContainer: {
        height: 50,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 8,
        paddingHorizontal: 10,
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
        height: height / 11,
        width: width / 1.11,
        marginTop: 30,
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        flexDirection: 'row',
        elevation: 2,
    },
    countryContainer: {
        height: height / 11,
        width: width / 1.11,
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        flexDirection: 'row',
        elevation: 2,
    },
    selectionIcon: {
        marginTop: 20,
        marginHorizontal: 12,
        height: 30,
        width: 30,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 40,
        flex: 1,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    radioText: {
        color: COLORS.text,
        marginLeft: 5,
    },
    signUpButton: {
        backgroundColor: COLORS.primary,
        height: 50,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 30,
        elevation: 5,
    },
    signUpButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
    },
});


export default Register;
