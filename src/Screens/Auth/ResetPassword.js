// Author: Ashutosh Rai
// Component: ResetPassword
import { StyleSheet, View, Alert } from 'react-native';
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
    setloading(true)
    if (!newPassword || !confirmPassword ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    await resetPassword(email, newPassword, confirmPassword, accessToken, (loading) => {});
    setloading(false)
    setIsVisible(true);
  };

  return (
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
              navigation.replace('SignInCorporate', {email , accessToken})
              setloading(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ResetPassword;

function useStyles() {
  const { width: winWidth, height: winHeight } = useWindowDimensions();

  return StyleSheet.create({
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
