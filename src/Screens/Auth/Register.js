// // **Author---Reshab Kumar Pandey
// // Component---Register.js */

// import React, { useState } from 'react';
// import {
//     SafeAreaView,
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     Dimensions,
//     TouchableOpacity,
//     Image,
//     Platform,
// } from 'react-native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import CustomHeader from '../../component/CustomHeader';
// import CustomButton from '../../component/CustomButtons';
// import CustomIconTextInput from '../../component/CustomIconTextInput';
// import { RadioButton } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';

// const { height, width } = Dimensions.get('window');

// const COLORS = {
//     primary: '#3C3567',
//     background: '#F5F5F5',
//     white: '#FFFFFF',
//     text: '#000000',
//     placeholder: '#737373',
//     gray: '#666666',
// };

// const validationSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     firstName: Yup.string().required('First Name is required'),
//     lastName: Yup.string().required('Last Name is required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//     confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], 'Passwords must match')
//         .required('Confirm Password is required'),
//     phone: Yup.string().length(10, 'Phone number must be 10 digits').required('Phone number is required'),
//     alternatePhone: Yup.string().length(10, 'Alternate phone number must be 10 digits').required('Alternate phone number is required'),
//     dob: Yup.date()
//         .required('Date of birth is required')
//         .nullable()
//         .max(new Date(), 'Date of birth cannot be in the future'),
//     gender: Yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender').required('Gender is required'),
//     country: Yup.string().required('Country is required'),
// });

// const Register = () => {
//     const [selectedGender, setSelectedGender] = useState('');
//     const [selectedCountry, setSelectedCountry] = useState('India');
//     const [dob, setDob] = useState('');
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const navigation = useNavigation();

//     const inputFields = [
//         { placeholder: 'Official Email ID', icon: require('../../assets/email.png'), name: 'email' },
//         { placeholder: 'First Name', icon: require('../../assets/manicon.png'), name: 'firstName' },
//         { placeholder: 'Last Name', icon: require('../../assets/manicon.png'), name: 'lastName' },
//         { placeholder: 'Password', icon: require('../../assets/lock.png'), name: 'password', secureTextEntry: true },
//         { placeholder: 'Confirm Password', icon: require('../../assets/lock.png'), name: 'confirmPassword', secureTextEntry: true },
//         { placeholder: 'Mobile Number', icon: require('../../assets/phone.png'), name: 'phone', keyboardType: 'numeric' },
//         { placeholder: 'Alternate Mobile Number', icon: require('../../assets/phone.png'), name: 'alternatePhone', keyboardType: 'numeric' },
//     ];

//     const handleDateChange = (event, selectedDate) => {
//         setShowDatePicker(false);
//         if (selectedDate) {
//             setDob(selectedDate.toISOString().split('T')[0]);
//         }
//     };

//     return (
//         <SafeAreaView style={styles.mainContainer}>
//             <CustomHeader
//                 title="Register"
//                 iconPath={require('../../assets/icbackarrow.png')}
//                 iconHeight={24}
//                 iconWidth={24}
//                 onMenuPress={() => navigation.goBack()}
//             />

//             <View style={styles.scrollContainer}>
//                 <Formik
//                     initialValues={{
//                         email: '',
//                         firstName: '',
//                         lastName: '',
//                         password: '',
//                         confirmPassword: '',
//                         phone: '',
//                         alternatePhone: '',
//                         dob: '',
//                         gender: '',
//                         country: '',
//                     }}
//                     validationSchema={validationSchema}
//                     onSubmit={(values) => {
//                         console.log(values);
//                         navigation.replace('SignInCorporate');
//                     }}
//                 >
//                     {({ values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue }) => (
//                         <>
//                             <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
//                                 {inputFields.map((field, index) => (
//                                     <View key={index} style={styles.inputContainer}>
//                                         <CustomIconTextInput
//                                             placeholder={field.placeholder}
//                                             icon1={field.icon}
//                                             value={values[field.name]}
//                                             onChangeText={handleChange(field.name)}
//                                             onBlur={handleBlur(field.name)}
//                                             keyboardType={field.keyboardType}
//                                             secureTextEntry={field.secureTextEntry}
//                                         />
//                                         {touched[field.name] && errors[field.name] && (
//                                             <Text style={styles.errorText}>{errors[field.name]}</Text>
//                                         )}
//                                     </View>
//                                 ))}

//                                 <TouchableOpacity
//                                     style={styles.selectionContainer}
//                                     onPress={() => setShowDatePicker(true)}
//                                 >
//                                     <Image
//                                         source={require('../../assets/DOB.png')}
//                                         style={styles.selectionIcon}
//                                     />
//                                     <Text style={styles.dobText}>{dob || 'Select Date of Birth'}</Text>
//                                 </TouchableOpacity>
//                                 {touched.dob && errors.dob && (
//                                     <Text style={styles.errorText}>{errors.dob}</Text>
//                                 )}
//                                 {showDatePicker && (
//                                     <DateTimePicker
//                                         mode="date"
//                                         value={dob ? new Date(dob) : new Date()}
//                                         maximumDate={new Date()}
//                                         display={Platform.OS === 'ios' ? 'inline' : 'default'}
//                                         onChange={(event, selectedDate) => {
//                                             handleDateChange(event, selectedDate);
//                                             setFieldValue('dob', selectedDate || '');
//                                         }}
//                                     />
//                                 )}

//                                 <View style={styles.selectionContainer}>
//                                     <Image
//                                         source={require('../../assets/Gender.png')}
//                                         style={styles.selectionIcon}
//                                     />
//                                     <View style={styles.radioContainer}>
//                                         {['Male', 'Female', 'Others'].map((gender) => (
//                                             <View key={gender} style={styles.radioOption}>
//                                                 <RadioButton
//                                                     value={gender.toLowerCase()}
//                                                     status={selectedGender === gender.toLowerCase() ? 'checked' : 'unchecked'}
//                                                     onPress={() => setSelectedGender(gender.toLowerCase())}
//                                                     color={COLORS.primary}
//                                                 />
//                                                 <Text style={styles.radioText}>{gender}</Text>
//                                             </View>
//                                         ))}
//                                     </View>
//                                 </View>

//                                 <View style={styles.selectionContainer}>
//                                     <Image
//                                         source={require('../../assets/flag_black_24dp.png')}
//                                         style={styles.selectionIcon}
//                                     />
//                                     <View style={styles.radioContainer}>
//                                         {['India', 'Others'].map((country) => (
//                                             <View key={country} style={styles.radioOption}>
//                                                 <RadioButton
//                                                     value={country}
//                                                     status={selectedCountry === country ? 'checked' : 'unchecked'}
//                                                     onPress={() => setSelectedCountry(country)}
//                                                     color={COLORS.primary}
//                                                 />
//                                                 <Text style={styles.radioText}>{country}</Text>
//                                             </View>
//                                         ))}
//                                     </View>
//                                 </View>
//                             </ScrollView>

//                             <View style={styles.buttonContainer}>
//                                 <CustomButton
//                                     title="Sign Up"
//                                     onPress={handleSubmit}
//                                     widthSize="100%"
//                                     textSize={18}
//                                     borderRadius={0}
//                                     isSelected={true}
//                                 />
//                             </View>
//                         </>
//                     )}
//                 </Formik>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     mainContainer: {
//         flex: 1,
//         backgroundColor: COLORS.background,
//     },
//     scrollContainer: {
//         flex: 1,
//     },
//     formContainer: {
//         marginTop: 16,
//     },
//     inputContainer: {
//         marginBottom: 16,
//         marginHorizontal: 16,
//     },
//     errorText: {
//         color: 'red',
//         fontSize: 12,
//         marginTop: 5,
//     },
//     selectionContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: COLORS.white,
//         borderRadius: 4,
//         height: 48,
//         elevation: 1,
//         paddingHorizontal: 10,
//         marginBottom: 16,
//         marginHorizontal: 16,
//     },
//     selectionIcon: {
//         height: 30,
//         width: 30,
//         marginRight: 10,
//     },
//     dobText: {
//         fontSize: 14,
//         color: COLORS.placeholder,
//     },
//     radioContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         flex: 1,
//     },
//     radioOption: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: 20,
//     },
//     radioText: {
//         fontSize: 16,
//         color: COLORS.gray,
//     },
//     buttonContainer: {
//         width: '100%',
//         position: 'absolute',
//         bottom: 0,
//         backgroundColor: COLORS.background,
//     },
// });

// export default Register;


import React, { useState, useEffect } from 'react';
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
    Alert,
    ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import CustomHeader from '../../component/CustomHeader';
import CustomButton from '../../component/CustomButtons';
import CustomIconTextInput from '../../component/CustomIconTextInput';
import { updateUserDetails } from '../../Redux/slice/Userslice';
import { registerUser } from '../../Api/Authentication';
import { fetchJwtAccess } from '../../Utils/JwtHelper';

const { width } = Dimensions.get('window');

const COLORS = {
    primary: '#3C3567',
    background: '#F5F5F5',
    white: '#FFFFFF',
    text: '#000000',
    placeholder: '#737373',
    gray: '#666666',
};

const Register = ({ route }) => {
    const {  emailId, clientId, sub_entity } = route.params || {};
    console.log(emailId,clientId,sub_entity,"data=========================");
    
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Form state
    const [formData, setFormData] = useState({
        email:  emailId || '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        phone: '',
        alternatePhone: '',
    });

    // Error state
    const [errors, setErrors] = useState({});

    // Other state
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('India');
    const [dob, setDob] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        const fetchAccessToken = async () => {
            const token = await fetchJwtAccess();
            setAccessToken(token || '');
        };
        fetchAccessToken();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        // Name validation
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 4) {
            newErrors.password = 'Password must be at least 4 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords must match';
        }

        // Phone validation
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (formData.phone.length !== 10) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        // if (!formData.alternatePhone) {
        //     newErrors.alternatePhone = 'Alternate phone number is required';
        // } else if (formData.alternatePhone.length !== 10) {
        //     newErrors.alternatePhone = 'Alternate phone number must be 10 digits';
        // }

        // Date of birth validation
        if (!dob) newErrors.dob = 'Date of birth is required';

        // Gender validation
        if (!selectedGender) newErrors.gender = 'Gender is required';
         
        // Country validation
        if (!selectedCountry) newErrors.country = 'Country is required'

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDob(selectedDate.toISOString().split('T')[0]);
        }
    };

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleRegistration = async () => {
        if (!validateForm()) {
            Alert.alert('Error', 'Please fix the errors in the form');
            return;
        }

        try {
            setLoading(true);

            const userData = {
                email_id: emailId,
                f_name: formData.firstName,
                l_name: formData.lastName,
                gender: selectedGender,
                birthdate: dob,
                mobile_number: formData.phone,
                password: formData.password,
                client_id:  clientId,
                sub_enitityid: sub_entity,
                country: selectedCountry,
                alternative_no: formData.alternatePhone,
            };

            const responseData = await registerUser(userData, accessToken);
            if (responseData?.user_id) {
                dispatch(updateUserDetails({
                    email: formData.email,
                    userId: responseData.user_id
                }));

                Alert.alert(
                    'Successfully Signup!',
                    'Account Created Successfully',
                    [{
                        text: 'OK',
                        onPress: () => navigation.navigate("CorporateSignIn", { email_id: formData.email })
                    }]
                );
            } else {
                throw new Error(responseData?.message || 'Registration failed');
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputFields = [
        { placeholder: 'Official Email ID', icon: require('../../assets/email.png'), name: 'email' },
        { placeholder: 'First Name', icon: require('../../assets/manicon.png'), name: 'firstName' },
        { placeholder: 'Last Name', icon: require('../../assets/manicon.png'), name: 'lastName' },
        { placeholder: 'Password', icon: require('../../assets/lock.png'), name: 'password', secureTextEntry: true },
        { placeholder: 'Confirm Password', icon: require('../../assets/lock.png'), name: 'confirmPassword', secureTextEntry: true },
        { placeholder: 'Mobile Number', icon: require('../../assets/phone.png'), name: 'phone', keyboardType: 'numeric' },
        { placeholder: 'Alternate Mobile Number', icon: require('../../assets/phone.png'), name: 'alternatePhone', keyboardType: 'numeric' },
    ];

    return (
        <SafeAreaView style={styles.mainContainer}>
            <CustomHeader
                title="Register"
                // iconPath={require('../../assets/icbackarrow.png')}
                // iconHeight={24}
                // iconWidth={24}
                // onMenuPress={() => navigation.goBack()}
            />

            <View style={styles.scrollContainer}>
                <ScrollView
                    contentContainerStyle={styles.formContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {inputFields.map((field, index) => (
                        <View key={index} style={styles.inputContainer}>
                            <CustomIconTextInput
                                placeholder={field.placeholder}
                                icon1={field.icon}
                                value={formData[field.name]}
                                onChangeText={(text) => handleInputChange(field.name, text)}
                                keyboardType={field.keyboardType}
                                secureTextEntry={field.secureTextEntry}
                            />
                            {errors[field.name] && (
                                <Text style={styles.errorText}>
                                    {errors[field.name]}
                                </Text>
                            )}
                        </View>
                    ))}

                    <TouchableOpacity
                        style={styles.selectionContainer}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Image
                            source={require('../../assets/DOB.png')}
                            style={styles.selectionIcon}
                        />
                        <Text style={styles.dobText}>
                            {dob || 'Select Date of Birth'}
                        </Text>
                    </TouchableOpacity>
                    {errors.dob && (
                        <Text style={[styles.errorText, { marginLeft: 16 }]}>
                            {errors.dob}
                        </Text>
                    )}

                    {showDatePicker && (
                        <DateTimePicker
                            mode="date"
                            value={dob ? new Date(dob) : new Date()}
                            maximumDate={new Date()}
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onChange={handleDateChange}
                        />
                    )}

                    <View style={styles.selectionContainer}>
                        <Image
                            source={require('../../assets/Gender.png')}
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
                    {errors.gender && (
                        <Text style={[styles.errorText, { marginLeft: 16 }]}>
                            {errors.gender}
                        </Text>
                    )}

                    <View style={styles.selectionContainer}>
                        <Image
                            source={require('../../assets/flag_black_24dp.png')}
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
                        onPress={handleRegistration}
                        widthSize="100%"
                        textSize={18}
                        borderRadius={0}
                        isSelected={true}
                    />
                </View>
            </View>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            )}
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
        paddingTop: 16,
        paddingBottom: 100,
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
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputField: {
        width: '100%',
        height: 48,
        backgroundColor: COLORS.white,
        borderRadius: 4,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    datePickerContainer: {
        width: '100%',
        marginBottom: 16,
    },
    genderContainer: {
        marginBottom: 16,
    },
    genderLabel: {
        fontSize: 16,
        color: COLORS.text,
        marginBottom: 8,
    },
    countryContainer: {
        marginBottom: 16,
    },
    countryLabel: {
        fontSize: 16,
        color: COLORS.text,
        marginBottom: 8,
    },
    errorContainer: {
        marginTop: 16,
        marginHorizontal: 16,
    },
    submitButtonContainer: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: COLORS.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    iconContainer: {
        marginRight: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 4,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    input: {
        flex: 1,
        color: COLORS.text,
        fontSize: 16,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    radioButtonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
        marginBottom: 8,
    },
    radioButtonLabel: {
        fontSize: 16,
        color: COLORS.text,
        marginLeft: 8,
    },
    datePickerButton: {
        backgroundColor: COLORS.white,
        borderRadius: 4,
        height: 48,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    datePickerButtonText: {
        fontSize: 16,
        color: COLORS.placeholder,
    },
    headerContainer: {
        backgroundColor: COLORS.white,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    mandatory: {
        color: 'red',
        marginLeft: 4,
    },
    labelText: {
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: 4,
        marginLeft: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5E5',
        marginVertical: 16,
        marginHorizontal: 16,
    },
    scrollContentContainer: {
        flexGrow: 1,
        paddingBottom: 100,
    },
});

export default Register;