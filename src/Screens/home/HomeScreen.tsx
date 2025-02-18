import React, { useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../component/CustomHeader';
import HomeItemCard from '../../component/HomeItemCard';
import VerifyEmailDialog from '../Auth/VerifyEmailDialog';
import homeStyle from './HomeStyle';
import { StackNavigationProp } from '@react-navigation/stack';


type ModuleType = 'Corporate' | 'Personal';

type HomeScreenNavigationProp = StackNavigationProp<any, 'HomeScreen'>;

const HomeScreen: React.FC = () => {

  const navigation = useNavigation<HomeScreenNavigationProp>();

  
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);


  const handleModuleClick = (module: ModuleType) => {
    if (module === 'Personal') {
      Alert.alert(
        'Coming Soon',
        'The Personal Module is coming soon!',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: true }
      );
      return;
    }
    setSelectedModule(module);
    setIsModalVisible(true);
  };

  // Close modal handler
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedModule(null);
  };

  // Sign-in handler
  const signIn = (email: string) => {
    setIsModalVisible(false);
    navigation.navigate('CorporateLoginNavigator', {
      screen: 'CorporateSignIn',
      params: { email },
    });
  };

  // Sign-up handler
  const signUp = (email: string, location: string, clientId: string) => {
    setIsModalVisible(false);
    navigation.navigate('CorporateRegisterNavigator', {
      screen: 'OTPRegister',
      params: {
        emailId: email,
        client_id: clientId,
        url: location,
      },
    });
  };

  return (
    <SafeAreaView style={homeStyle.container}>
      {/* Conditionally render VerifyEmailDialog */}
      {isModalVisible && (
        <VerifyEmailDialog
        module={selectedModule || 'defaultModule'} 
          onSignIn={signIn}
          onClose={closeModal}
          onSignUp={signUp}
        />
      )}

      {/* Custom header */}
      <CustomHeader imgPath={require('../../assets/ktclogo.png')} justifyContent={'center'} />

      {/* HomeItemCard components for Corporate and Personal modules */}
      <View style={homeStyle.contentContainer}>
        <HomeItemCard
          title="Corporate"
          image={require('../../assets/Corporate.png')}
          description="Chauffeur Corporate"
          onPress={() => handleModuleClick('Corporate')}
        />
        <HomeItemCard
          title="Personal"
          image={require('../../assets/Personal.png')}
          description="Personal Module"
          onPress={() => handleModuleClick('Personal')}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
