import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import CustomIconTextInput from '../../component/CustomIconTextInput';
import CustomButton from '../../component/CustomButtons';
import { useSelector } from 'react-redux';

const Profile = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const userDetails = useSelector((state) => state.userprofile); 
  const date = new Date(userDetails.bithdate * 1000);
  console.log("DETAILS", userDetails)
  const [formData, setFormData] = useState({
    firstName: userDetails.f_name ? userDetails.f_name : '',
    lastName: userDetails.l_name ? userDetails.l_name : '',
    email: userDetails.email_id ? userDetails.email_id :'',
    birthDate: userDetails.bithdate ? userDetails.bithdate : '',  
    mobileNumber: userDetails.mobile_number ? userDetails.mobile_number : '',
    password: '',
  });

  const handleDeleteAccount = () => {
    console.log(formData.firstName);
    console.log(formData.email); 

    Alert.alert(
      'Alert',
      'Are you sure you want to delete your account?',
      [
        { text: 'Cancel', onPress: () => null },
        { text: 'OK', onPress: () => console.log('Account deleted') }, 
      ]
    );
  };

  const inputs = [
    { placeholder: "First Name", icon1: require('../../assets/manicon.png'), value: formData.firstName, key: 'firstName' },
    { placeholder: "Last Name", icon1: require('../../assets/manicon.png'), value: formData.lastName, key: 'lastName' },
    { placeholder: "Email", icon1: require('../../assets/email.png'), value: formData.email, key: 'email' },
    { placeholder: "MM/DD/YYYY", icon1: require('../../assets/DOB.png'), value: formData.birthDate, key: 'birthDate' },
    { placeholder: "Mobile Number", icon1: require('../../assets/phone.png'), value: formData.mobileNumber, key: 'mobileNumber' , type: "numeric" },
    { placeholder: "Change Password", icon1: require('../../assets/lock.png'), value: formData.password, key: 'password' },
  ];

  const handleInputChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <CustomHeader
          title="Profile"
          iconPath={require('../../assets/ic_back_arrow_white_24.png')}
          iconHeight={24}
          iconWidth={24}
          handleLeftIcon ={() => navigation.navigate('CorporateModule1')} 
        />

        {loader && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#3C3567" />
          </View>
        )}

        <View style={styles.inputContainer}>
          {inputs.map((input, index) => (
            <View style={{ marginTop: 16 }} key={index}>
              <CustomIconTextInput
                keyboardType={input.type}
                placeholder={input.placeholder}
                icon1={input.icon1}
                value={input.value}
                onChangeText={(value) => handleInputChange(input.key, value)}
              />
            </View>
          ))}
        </View>

        <View style={{ position: 'absolute', width: '100%', bottom: 0.5 }}>
          <CustomButton
            title="Delete Account"
            onPress={handleDeleteAccount}
            borderRadius={0}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F1F1F3',
  },
  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
});

export default Profile;
