
import React, { useState, useEffect } from 'react';
import { Alert, Image, TouchableOpacity,Platform, NativeModules } from 'react-native';
import { Modal, SafeAreaView, StyleSheet, Text, View,TextInput } from 'react-native';
import CustomTextInpt from '../../../component/CustomTextInpt';
import { AuthStrings } from '../../../constants/Strings';
import CustomButton from '../../../component/CustomButtons';
import { useDispatch, useSelector } from 'react-redux';
import { resetState, verifyEmail } from '../../../Redux/slice/VerifyEmailSlice';
import { resetSendOtpState, sendOtp } from '../../../Redux/slice/SendOtpSlice';
import { useNavigation } from '@react-navigation/native';
import NavigationService from '../../../navigation/NavigationService';
import verifyEmailStyle from './VerifyEmailStyle';
import CloseIcon from '../../../assets/icon/CloseIcon';
import { decryptData } from '../../../Utils/EncryptionUtility';

interface VerifyEmailDialogProps {
  module: string;
  onClose: () => void;
  onSignIn: (email: string) => void;
  onSignUp: (email: string, otpData: any, clientId: string, subEntity: string) => void;
}

interface VerifyEmailApiResponse {
  message: string;
  newuser: string;
  sub_entity: string;
  client_id: string;
}

interface ApiState {
  loading: boolean;
  data: any;
  error: any;
}

interface RootState {
  verifyEmail: ApiState;
  sendOtp: ApiState;
}

const VerifyEmailDialog: React.FC<VerifyEmailDialogProps> = ({ 
  module, 
  onClose, 
  onSignIn, 
  onSignUp 
}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const dispatch = useDispatch();
  const verifyEmailApiState = useSelector((state: RootState) => state.verifyEmail);
  const sendOtpApiState = useSelector((state: RootState) => state.sendOtp);
  const [clientId, setClientId] = useState<string>('');
  const [sub_entity, setSub_entity] = useState<string>('');
  const [emailFieldKey, setEmailFieldKey] = useState<string>('email-field-' + Date.now());

  const preventCopying = () => {
    if (Platform.OS === 'ios') {
      NativeModules.Clipboard?.setString('');
    } else {
      // For Android
      NativeModules.ClipboardManager?.setString('');
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (email && email !== '') {
      if (!emailRegex.test(email)) {
        setErrorMessage('Invalid Email address');
      } else {
        dispatch(verifyEmail({ email: email, module: module }) as any);
      }
    } else {
      setErrorMessage('Email is required');
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetState() as any);
      dispatch(resetSendOtpState() as any);
    };
  }, []);

  useEffect(() => {
    getVerifyEmailResponse();
  }, [verifyEmailApiState]);

  const getVerifyEmailResponse = (): void => {
    if (verifyEmailApiState.loading === false && verifyEmailApiState.data) {
      const { message, newuser, sub_entity, client_id } = verifyEmailApiState.data as VerifyEmailApiResponse;
    
      if (message === 'Invalid Domain Name.') {
        Alert.alert('Invalid Domain!', 'Please contact KTC Admin');
        return;
      }
    
      if (newuser === 'No') {
        onSignIn(email);
      } else if (newuser === 'Yes') {
        setClientId(client_id);
        setSub_entity(sub_entity);
        dispatch(sendOtp(email) as any);
      }
    } else if (verifyEmailApiState.loading === false && verifyEmailApiState.error !== null) {
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
  };

  useEffect(() => {
    getSendOtpResponse();
  }, [sendOtpApiState]);

  const getSendOtpResponse = (): void => {
    console.log("Email:", email);
    console.log("Client ID:", clientId);
    console.log("Sub Entity:", sub_entity);

    if (sendOtpApiState.loading === false && sendOtpApiState.data && sendOtpApiState.data !== null) {
      const decryptedClientId = decryptData(clientId);
      const decryptedSubEntity = decryptData(sub_entity);
      console.log(sendOtpApiState.data, decryptedClientId, decryptedSubEntity);
      onSignUp(email, sendOtpApiState.data, decryptedClientId, decryptedSubEntity);
    } else if (sendOtpApiState.loading === false && sendOtpApiState.error !== null) {
      Alert.alert('Error', 'Failed to send otp. Please try again.');
    }
  };

  return (
    <Modal animationType="slide" transparent visible={true}>
      <SafeAreaView style={verifyEmailStyle.overlay}>
        <View style={verifyEmailStyle.modalContainer}>
          <View style={verifyEmailStyle.formContainer}>
            <View style={verifyEmailStyle.header}>
              <Text style={verifyEmailStyle.headerText}>Register</Text>
              <TouchableOpacity activeOpacity={1.0} onPress={onClose}>
                <CloseIcon />
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 16, marginTop: 14, marginBottom: 19 }}>
              <Text style={verifyEmailStyle.instruction}>{AuthStrings.EnterEmail}</Text>
              {/* Using direct TextInput for more control */}
              <View style={verifyEmailStyle.customInputContainer || styles.customInputContainer}>
                <TextInput
                  key={emailFieldKey}
                  placeholder="Official Email ID"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  secureTextEntry={false}
                  style={verifyEmailStyle.customInput || styles.customInput}
                  selectable={false}
                  contextMenuHidden={true}
                  textContentType="none"
                  autoCorrect={false}
                  caretHidden={false}
                  onSelectionChange={preventCopying}
                  onLongPress={() => {
                 
                    setEmailFieldKey('email-field-' + Date.now());
                    return false;
                  }}
                  selection={{start: email.length, end: email.length}}
                />

              {errorMessage && <Text style={verifyEmailStyle.errorText}>{errorMessage}</Text>}
            </View>
            <CustomButton
              title={AuthStrings.Submit}
              onPress={handleSubmit}
              borderRadius={0}
              loading={verifyEmailApiState.loading || sendOtpApiState.loading}
              borderWidth={undefined}
              textColor={undefined}
              btnHeight={undefined}
              textSize={undefined}
              fontWeight={undefined}
              btnColor={undefined}
              backgroundColor={undefined}
              disabled={undefined}
            />
          </View>
        </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  customInputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 8,
  },
  customInput: {
    padding: 12,
    fontSize: 16,
    color: '#333',
  }
});
export default VerifyEmailDialog;