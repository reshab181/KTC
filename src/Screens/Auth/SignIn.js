// // Reshab Pandey

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchJwtAccess } from '../../Utils/JwtHelper';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInpt from '../../component/CustomTextInpt';
import CustomButton from '../../component/CustomButtons';
import { handleSignIn } from '../../Api/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../../Redux/slice/Userslice';
import { setUserProfile } from '../../Redux/slice/UserProfileSlice';
import RegisterPOPUP from './RegisterPopUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserProfileData } from '../../Utils/userProfileUtils';
import { AuthStrings, Characters } from '../../constants/Strings';
import { SignInApi } from '../../services/api/SignInApi';
import { SignIn } from '../../Redux/slice/SignInSlice';
import { decryptData } from '../../Utils/EncryptionUtility';


const SignInCorporate = ({ route }) => {
  const { email: prefilledEmail } = route.params || {};
  const navigation = useNavigation();
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [accessToken, setAccessToken] = useState('');
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const SignInApiState = useSelector((state) => state.signIn);

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    dispatch(SignIn({ email: email, password: password }));
    setLoading(false);
  };

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

  useEffect(() => {
    console.log("Updated Redux State:", SignInApiState);
    verifySignIn();
  }, [SignInApiState]);

  const verifySignIn = async () => {
    if (SignInApiState.loading === false && SignInApiState.data) {
      console.log("API Response:", SignInApiState.data);

      const message = SignInApiState.data.message || SignInApiState.data.error?.message || "";

      if (typeof message === "string" && message.includes("Password Not Match")) {
        Alert.alert(
          "Incorrect Password",
          "The password you entered is incorrect. Please try again.",
          [{ text: "OK" }]
        );
        return;
      }

      if (SignInApiState.data.status === 200) {
        const userData = decryptData(SignInApiState.data.result);
        
        if (userData.status === "0") {
          Alert.alert(
            "Account Deactivated",
            "Your account has been deactivated. Kindly contact the admin for assistance.",
            [{ text: "OK" }]
          );
          return;
        }
        dispatch(setUserProfile(userData));
        console.log(userData,"123");

    
        await AsyncStorage.multiSet([
          ["status", userData.status],
          ["isLoggedInn", "true"],
          ["user_id", userData.user_id],
          ["email_id", userData.email_id],
          ["f_name", userData.f_name],
          ["l_name", userData.l_name],
          ["client_name", userData.client_name],
          ["client_id", userData.client_id],
          ["gender", userData.gender],
          ["mobile_number", userData.mobile_number],
          ["user_type", userData.user_type],
          ["bithdate", userData.bithdate.toString()],
          ["country", userData.country],
          ["userToken", accessToken],
        ]);
        

        navigation.replace("CorporateNavigator", {
          screen: "CorporateHomeScreen",
        });
      }
    } else if (SignInApiState.loading === false && SignInApiState.error !== null) {
      console.log("Error:", SignInApiState.error);
      Alert.alert("Error", "Failed to Sign In. Please try again.");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedModule(null);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={AuthStrings.SignIn}
        leftTitle={Characters.Skip}
        handlePress={() => navigation.replace('ModuleSelection')}
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

        <View style={styles.passwordContainer}>
          <CustomTextInpt
            placeholder={AuthStrings.Password}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
          // style={{ flex: 1 }} 
          />
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={togglePasswordVisibility}
          >
            <Image
              source={showPassword
                ? require('../../assets/open-eye.png')
                : require('../../assets/close-eye.png')
              }
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <View style={{ marginTop: 32 }}>
          <CustomButton
            title={AuthStrings.SignIn}
            onPress={handleSubmit}
            textSize={18}
            loading={SignInApiState.loading}
          />
        </View>

        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => {
            if (!email) {
              Alert.alert("Input Required", "Please enter your email before proceeding.");
            } else {
              navigation.replace("ForgotPassword", { email });
            }
          }}
        >
          <Text style={styles.linkText}>{AuthStrings.FORGOTPASSWORD}</Text>
        </TouchableOpacity>
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>{AuthStrings.OR}</Text>
          <View style={styles.line} />
        </View>

        <CustomButton
          title={AuthStrings.CreateNewAccount}
          backgroundColor="#F1F1F3"
          borderWidth={1}
          textColor="#0F2541"
          textSize={16}
          onPress={() => {
            setSelectedModule(module);
            setIsModalVisible(true);
          }}
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
  // passwordContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1, // Optional, to match email input style
  //   borderColor: '#ccc', // Optional
  //   borderRadius: 8, // Optional
  //   backgroundColor: '#FFF',
  // },

  passwordInput: {
    flex: 1,
  },
  eyeIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    height: '100%',
    justifyContent: 'center',
    transform: [{ translateY: -12 }],
  },
  eyeIcon: {
    alignItems: 'center',
    width: 24,
    height: 24,
  }
});