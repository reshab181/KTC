import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import HomeItemCard from '../../component/HomeItemCard';
import homeStyle from './HomeStyle';
import VerifyEmailDialog from '../Auth/VerifyEmailDialog';
import { StackNavigationProp } from '@react-navigation/stack';

// Type for the navigation
// type HomeScreenNavigationProp = StackNavigationProp<any, 'HomeScreen'>;

const HomeScreen = () => {
  // const navigation = useNavigation<HomeScreenNavigationProp>();
  const navigation = useNavigation<any>() ; 
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleModuleClick = (module: 'Corporate' | 'Personal') => {
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

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedModule(null);
  };

  const signIn = (email: string) => {
    setIsModalVisible(false);
    navigation.navigate('CorporateLoginNavigator', {
      screen: 'CorporateSignIn',
      params: { email: email },
    });
  };

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
      {isModalVisible && (
        <VerifyEmailDialog
          module={selectedModule}
          onSignIn={signIn}
          onClose={closeModal}
          onSignUp={signUp}
        />
      )}
      <CustomHeader imgPath={require('../../assets/ktclogo.png')} justifyContent={'center'} />
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
