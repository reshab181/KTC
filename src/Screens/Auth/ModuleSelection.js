//**Author---Reshab Kumar Pandey
// Component-- ModuleSelection.js */
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../Reusables/CustomHeader';
import RegisterPOPUP from './RegisterPopUp';

const ModuleSelectionUI = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null); 
  const navigation = useNavigation();

  useEffect(() => {
  
    const unsubscribe = navigation.addListener('focus', () => {
      setIsModalVisible(false); 
    });

    return unsubscribe; 
  }, [navigation]);

  const handleModuleClick = (module) => {
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

  const ModuleCard = ({ title, image, description, onPress }) => (
    <TouchableOpacity style={styles.moduleContainer} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.module}>
        <View style={styles.moduleHeader}>
          <Text style={styles.moduleHeaderText}>{title}</Text>
        </View>
        <View style={styles.moduleBody}>
          <Image source={image} style={styles.moduleImage} />
          <Text style={styles.moduleBodyText}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isModalVisible && (
        <RegisterPOPUP 
          module={selectedModule} 
          onClose={closeModal} 
        />
      )}
      <CustomHeader imgPath={require('../../Assets/ktclogo.png')} justifyContent={'center'} />
      <View style={styles.contentContainer}>
        <ModuleCard
          title="Corporate"
          image={require('../../Assets/Corporate.png')}
          description="Chauffeur Corporate"
          onPress={() => handleModuleClick('Corporate')}
        />
        <ModuleCard
          title="Personal"
          image={require('../../Assets/Personal.png')}
          description="Personal Module"
          onPress={() => handleModuleClick('Personal')}
        />
      </View>
    </SafeAreaView>
  );
};

export default ModuleSelectionUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingTop: 80, 
    paddingHorizontal: 15,
  },
  moduleContainer: {
    width: '100%',
    marginBottom: 20,
  },
  module: {
    width: '100%',
    height: 240,
    backgroundColor: '#F2F2F2',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  moduleHeader: {
    height: '22%',
    backgroundColor: '#3C3567',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleHeaderText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  moduleBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  moduleBodyText: {
    color: '#212121',
    fontSize: 16,
    marginTop: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  moduleImage: {
    height: 80,
    resizeMode: 'cover',
  },
});


