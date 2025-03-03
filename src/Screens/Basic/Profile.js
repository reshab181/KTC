import React, { useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  Alert,
  ActivityIndicator,TouchableOpacity,Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../component/CustomHeader';
import CustomIconTextInput from '../../component/CustomIconTextInput';
import CustomButton from '../../component/CustomButtons';
import { useSelector } from 'react-redux';
import FirstName from '../../assets/svg/first-name.svg';
import DobSvg from '../../assets/svg/cake_black.svg';
import SmartPhoneSvg from '../../assets/svg/smartphone.svg';
import EmailSvg from '../../assets/svg/email_black.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    mobileNumber: '',
    password: '',
  });
  const navigation = useNavigation();
  function convertUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const day = String(date.getUTCDate() + 1).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


  useEffect(() => {
    const fetchData = async () => {
      try {
        const firstName = await AsyncStorage.getItem('f_name');
        const lastName = await AsyncStorage.getItem('l_name');
        const email = await AsyncStorage.getItem('email_id');

        const bithDate = convertUnixTimestamp(await AsyncStorage.getItem('bithdate'))
        console.log(bithDate);

        
        const mobileNumber = await AsyncStorage.getItem('mobile_number');
        const cc  = await AsyncStorage.getItem('isLoggedInn')
        console.log('====================================');
        console.log(firstName , lastName , email , bithDate , cc);
        console.log('====================================');
        setFormData({
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
          birthDate: bithDate || '',
          mobileNumber: mobileNumber || '',
          password: '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteAccount = () => {
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
    { placeholder: "First Name", icon1: FirstName, value: formData.firstName, key: 'firstName' },
    { placeholder: "Last Name", icon1: FirstName, value: formData.lastName, key: 'lastName' },
    { placeholder: "Email", icon1: EmailSvg, value: formData.email, key: 'email' },
    { placeholder: "MM/DD/YYYY", icon1: DobSvg, value: formData.birthDate, key: 'bithDate' },
    { placeholder: "Mobile Number", icon1: SmartPhoneSvg, value: formData.mobileNumber, key: 'mobileNumber', type: "numeric" },
    { placeholder: "Change Password", iconimg: require('../../assets/lock.png'), value: formData.password, key: 'password' },
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
        leftIcon={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/ic_back_arrow_white_24.png')}/>
          </TouchableOpacity>
        )}
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
                LeftSvg={input?.icon1}
                icon1={input?.iconimg}
                value={input.value}
                onChangeText={(value) => handleInputChange(input.key, value)}
              />
            </View>
          ))}
        </View>

        <View style={{ position: 'absolute', width: '100%', bottom: 0 }}>
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
  },
  // icon: {
  //   width: width / 15,
  //   height: height / 34,
  //   marginRight: 10,
  // },
});

export default Profile;

// import React, { useState } from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   SafeAreaView,
//   View,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import CustomHeader from '../../component/CustomHeader';
// import CustomIconTextInput from '../../component/CustomIconTextInput';
// import CustomButton from '../../component/CustomButtons';
// import { useSelector } from 'react-redux';
// import FirstName from '../../assets/svg/first-name.svg'
// import DobSvg from '../../assets/svg/cake_black.svg'
// import SmartPhoneSvg from '../../assets/svg/smartphone.svg'
// import EmailSvg from '../../assets/svg/email_black.svg'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Profile = ({ navigation }) => {
//   const [loader, setLoader] = useState(false);
//   const userDetails = useSelector((state) => state.userprofile); 
//   // const date = new Date(userDetails.bithdate * 1000);
//   // console.log("DETAILS", userDetails)
//   console.log("DETAILS", AsyncStorage.getItem(''))

//   const [formData, setFormData] = useState({
//     firstName: AsyncStorage.getItem('f_name'),
//     lastName: AsyncStorage.getItem('l_name') ,
//     email: AsyncStorage.getItem('email_id'),
//     birthDate: AsyncStorage.getItem('bithdate'),  
//     mobileNumber: AsyncStorage.getItem('mobile_number') ,
//     password: '',
//   });

//   const handleDeleteAccount = () => {
//     console.log(formData.firstName);
//     console.log(formData.email); 

//     Alert.alert(
//       'Alert',
//       'Are you sure you want to delete your account?',
//       [
//         { text: 'Cancel', onPress: () => null },
//         { text: 'OK', onPress: () => console.log('Account deleted') }, 
//       ]
//     );
//   };

//   const inputs = [
//     { placeholder: "First Name", icon1: FirstName, value: AsyncStorage.getItem('f_name'), key: 'firstName' },
//     { placeholder: "Last Name", icon1: FirstName, value: formData.lastName, key: 'lastName' },
//     { placeholder: "Email", icon1: EmailSvg, value: formData.email, key: 'email' },
//     { placeholder: "MM/DD/YYYY", icon1: DobSvg, value: formData.birthDate, key: 'birthDate' },
//     { placeholder: "Mobile Number", icon1: SmartPhoneSvg, value: formData.mobileNumber, key: 'mobileNumber' , type: "numeric" },
//     { placeholder: "Change Password", iconimg: require('../../assets/lock.png'), value: formData.password, key: 'password' },
//   ];

//   const handleInputChange = (key, value) => {
//     setFormData(prevState => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.mainContainer}>
//         <CustomHeader
//           title="Profile"
//           iconPath={require('../../assets/ic_back_arrow_white_24.png')}
//           iconHeight={24}
//           iconWidth={24}
//           handleLeftIcon ={() => navigation.goBack()} 
//         />

//         {loader && (
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator size="large" color="#3C3567" />
//           </View>
//         )}

//         <View style={styles.inputContainer}>
//           {inputs.map((input, index) => (
//             <View style={{ marginTop: 16 }} key={index}>
//               <CustomIconTextInput
//                 keyboardType={input.type}
//                 placeholder={input.placeholder}
//                 LeftSvg={input?.icon1 }
//                 icon1 = {input?.iconimg}
//                 value={input.value}
//                 onChangeText={(value) => handleInputChange(input.key, value)}
//               />
//             </View>
//           ))}
//         </View>

//         <View style={{ position: 'absolute', width: '100%', bottom: 0 }}>
//           <CustomButton
//             title="Delete Account"
//             onPress={handleDeleteAccount}
//             borderRadius={0}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   mainContainer: {
//     height: '100%',
//     width: '100%',
//     backgroundColor: '#F1F1F3',
//   },
//   loaderContainer: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [{ translateX: -25 }, { translateY: -25 }],
//     zIndex: 1,
//   },
//   inputContainer: {
//     marginHorizontal: 16,
//     // paddingLeft: 10 , 
//     // marginTop: 16,

//   },
// });

// export default Profile;
