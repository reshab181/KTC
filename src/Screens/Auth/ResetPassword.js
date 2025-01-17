// Author: Ashutosh Rai
// Component: Booking Confirmation
import { StyleSheet, Text, View } from 'react-native';
import { useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../Reusables/CustomHeader';
import CustomTextInpt from '../../Reusables/CustomTextInpt';
import CustomButton from '../../Reusables/CustomButtons';
import Modal from "react-native-modal";
import CustomModal from '../../Reusables/CustomModals';

const ResetPassword = ({navigation}) => {
  const styles = useStyles();
  const [isVisible, setisVisible] = useState(false);

  return (
    <View style={styles.container}>
      <CustomHeader title="Reset Password" />
      <View style={styles.content}>
        <CustomTextInpt placeholder="New Password" secureTextEntry={true} />
        <CustomTextInpt placeholder="Confirm Password" secureTextEntry={true} />
        <View style={{ marginTop: 16 }}>
          <CustomButton title={"Submit"} onPress={() => setisVisible(!isVisible)} />
        </View>
      </View>
      {
        isVisible ?
          <>
            <View>
              <CustomModal onClose={() => setisVisible(!isVisible)}
                isButtonVisible={true}
                message1={"Your Password has been set Successfully"}
                message2={"Please login using the set Password"}
                btnText={"Login Now"}
                handlePress={()=>{navigation.navigate('SignInCorporate')}}
              />
            </View>
          </> : null
      }
    </View>
  );
};

export default ResetPassword;

function useStyles() {
  const { width: winwidth, height: winheight } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1F1F3',
    },
    content: {
      marginTop: 24,
      marginStart : 10 ,  
      paddingHorizontal: 16, 
    },
  });
}
