import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator
} from 'react-native';
import CustomHeader from '../../ReusableBtn/CustomHeader';
import CustomTextInpt from '../../ReusableBtn/CustomTextInpt';

const { height, width } = Dimensions.get('screen');

const Profile = ({ navigation }) => {
  const [f_name, setf_name] = useState('');
  const [l_name, setl_name] = useState('');
  const [email_id, setemail_id] = useState('');
  const [bithdate, setbithdate] = useState('');
  const [mobile_number, setmobile_number] = useState('');
  const [loader, setloader] = useState(false);
  const [resetPass, setResetPass] = useState('');

  const handleDeleteAccount = () => {
    Alert.alert(
      "Alert", 
      "are you sure you want to Delete Your Account?",
      [
        { text: 'Cancel', onPress: () => null },
        { text: "OK", onPress: () => { /* Handle delete */ }}
      ]
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        {/* Header */}
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image 
                source={require('../../Assets/ic_back_arrow_white_24.png')}
                style={styles.backButton}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <CustomHeader title={"Profile"}/>
            {/* <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>
              <Image 
                source={require('../../Assets/bell.png')}
                style={styles.notificationIcon}
                resizeMode="contain"
              />
            </TouchableOpacity> */}
          </View>
        </View>

        {/* Loading Indicator */}
        {loader && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#3C3567" />
          </View>
        )}

        {/* Form Fields */}
        <View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Image 
                source={require('../../Assets/manicon.png')}
                style={styles.fieldIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomTextInpt
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#737373"
                value={f_name}
                onChangeText={setf_name}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Image 
                source={require('../../Assets/manicon.png')}
                style={styles.fieldIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomTextInpt
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#737373"
                value={l_name}
                onChangeText={setl_name}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Image 
                source={require('../../Assets/email.png')}
                style={styles.fieldIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomTextInpt
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#737373"
                value={email_id}
                onChangeText={setemail_id}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Image 
                source={require('../../Assets/DOB.png')}
                style={styles.fieldIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.inputWrapper}>
              <CustomTextInpt
                style={styles.input}
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#737373"
                value={bithdate}
                onChangeText={setbithdate}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.phoneContainer}>
            <View style={styles.countryCode}>
              <Image
                source={require('../../Assets/phone.png')}
                style={styles.fieldIcon}
                resizeMode="contain"
              />
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <View style={styles.phoneInputWrapper}>
              <CustomTextInpt
                style={styles.phoneInput}
                placeholder="Mobile Number"
                placeholderTextColor="#737373"
                value={mobile_number}
                onChangeText={setmobile_number}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => {}}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('../../Assets/lock.png')}
                  style={styles.fieldIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.inputWrapper}>
                <CustomTextInpt
                  style={styles.input}
                  placeholder="Change Password"
                  placeholderTextColor="#737373"
                  value={resetPass}
                  editable={false}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Delete Account Button */}
        <View>
          <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
    backgroundColor: '#F1F1F3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3C3567',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  backButton: {
    height: 24,
    width: 24,
  },
  notificationIcon: {
    height: 24,
    width: 24,
  },
  loaderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  inputContainer: {
    height: 70,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    marginTop: 20,
  },
  iconContainer: {
    width: '15%',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  fieldIcon: {
    height: 30,
    width: 30,
  },
  inputWrapper: {
    width: '85%',
    alignItems: 'flex-start',
  },
  input: {
    color: '#000',
    fontSize: 15,
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 5,
  },
  countryCode: {
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '20%',
    height: 65,
    paddingLeft: 10,
  },
  countryCodeText: {
    fontSize: 14,
    color: '#737373',
    marginLeft: 0,
  },
  phoneInputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 6,
    width: '60%',
    height: 65,
    justifyContent: 'center',
  },
  phoneInput: {
    textAlign: 'center',
    color: '#000',
    fontSize: 15,
  },
  deleteButton: {
    backgroundColor: '#3C3567',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Profile;