// Author: Ashutosh Rai
// Component: ResetPassword
import { StyleSheet, View, Alert, SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { useWindowDimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInpt from '../../component/CustomTextInpt';
import CustomButton from '../../component/CustomButtons';
import Modal from "react-native-modal";
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomModal from '../../component/CustomModals';
import { fetchJwtAccess } from '../../Utils/JwtHelper';
import { resetPassword } from '../../Api/Authentication';

const ResetPassword = ({route, navigation}) => {
      const colorScheme = useColorScheme();
      const isDarkMode = colorScheme === 'dark';
      
      const backgroundStyle = {
        backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      };

  // const navigation = useNavigation();
  const {email} = route.params ;
  console.log('====================================');
  console.log(email, "email coming");
  console.log('====================================');
  const styles = useStyles();
  const [isVisible, setIsVisible] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading , setloading] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await fetchJwtAccess();
      setAccessToken(token || '');
    };
    fetchAccessToken();
  }, []);

  const handleSubmit = async () => {
    setloading(true);
  
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      setloading(false);
      return;
    }
  
    if (newPassword.length < 10) {
      Alert.alert('Error', 'Password must be at least 10 characters long.');
      setloading(false);
      return;
    }
  
    const hasDigit = [...newPassword].some(char => !isNaN(char) && char !== ' ');
    const hasLetter = [...newPassword].some(char => /[a-zA-Z]/.test(char));
    const hasSpecialChar = [...newPassword].some(char => !/[a-zA-Z0-9]/.test(char));
  
    if (!hasDigit || !hasLetter || !hasSpecialChar) {
      Alert.alert(
        'Error',
        'Password must include at least one letter, one number, and one special character.'
      );
      setloading(false);
      return;
    }
  
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      setloading(false);
      return;
    }
  
    const result = await resetPassword(
      email,
      newPassword,
      confirmPassword,
      accessToken,
      setloading
    );
  
    if (result?.status === 200) {
      setIsVisible(true);
    } else {
      Alert.alert('Error', result?.response_message || 'Failed to reset password.');
    }
  
    setloading(false);
  };
  

  return (
    <SafeAreaView style = {styles.safeArea}>
         <StatusBar
                          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                          backgroundColor={backgroundStyle.backgroundColor}
                        />
    <View style={styles.container}>
      <CustomHeader title="Reset Password" />
      <View style={styles.content}>
        {/* <CustomTextInpt
          placeholder="Email"
          value={email}
      
          editable={false}
        /> */}
        <CustomTextInpt
          placeholder="New Password"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <CustomTextInpt
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <View style={{ marginTop: 16 }}>
          <CustomButton title={"Submit"} onPress={handleSubmit} loading={loading}/>
        </View>
      </View>
      {isVisible && (
        <View>
          <CustomModal
            loading = {loading}
            onClose={() => setIsVisible(false)}
            isButtonVisible={true}
            message1={"Your Password has been set Successfully"}
            message2={"Please login using the set Password"}
            btnText={"Login Now"}
            handlePress={() =>{ 
              setloading(true);
              navigation.navigate('CorporateLoginNavigator', {
                screen: 'CorporateSignIn',
                params: { email: email },
              });
              setloading(false);
            }}
          />
        </View>
      )}
    </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

function useStyles() {
  const { width: winWidth, height: winHeight } = useWindowDimensions();

  return StyleSheet.create({
    safeArea:{
      flex:1
    },
    container: {
      flex: 1,
      backgroundColor: '#F1F1F3',
    },
    content: {
      marginTop: 24,
      marginStart: 10,
      paddingHorizontal: 16,
    },
  });
}
