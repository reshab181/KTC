import { StyleSheet, Text, View } from 'react-native';
import { useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../ReusableBtn/CustomHeader';
import CustomTextInpt from '../../ReusableBtn/CustomTextInpt';
import CustomButton from '../../ReusableBtn/CustomButtons';
import Modal from "react-native-modal";
import CustomModal from '../../ReusableBtn/CustomModals';

const ResetPassword = () => {
  const styles = useStyles();
  const [isVisible, setisVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomHeader title="Reset Password" />

      {/* Content */}
      <View style={styles.content}>
        <CustomTextInpt placeholder="New Password" secureTextEntry={true}/>
        <CustomTextInpt placeholder="Confirm Password" secureTextEntry={true}/>
        <CustomButton title={"Submit"} onPress={()=> setisVisible(!isVisible)}/>      
      </View>
      {
        isVisible ? 
        <>
            <View>
                <CustomModal onClose={()=>setisVisible(!isVisible)} 
                isButtonVisible={true} 
                message1={"Your Password has been set Successfully"} 
                message2={"Please login using the set Password"}
                btnText={"Login Now"} 
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
      marginStart : 10 ,  // Push content below the header (header height is 80px)
      paddingHorizontal: 16, // Add some horizontal padding
    },
  });
}
