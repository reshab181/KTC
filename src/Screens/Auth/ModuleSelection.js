import React from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native'; 

const ModuleSelectionUI = () => {
  const navigation = useNavigation(); 

  const handleCorporatePress = () => {
    navigation.navigate('RegisterPopUp'); 
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Image resizeMode="contain" source={require('../../Assets/ktc.png')} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
          <TouchableOpacity style={styles.moduleContainer} onPress={handleCorporatePress}>
            <View style={styles.module}>
              <View style={styles.moduleHeader}>
                <Text style={styles.CorporateText}>Corporate</Text>
              </View>
              <View style={styles.moduleBody}>
                <Image source={require('../../Assets/Corporate.png')} />
                <Text style={styles.ChauffeurText}>Chauffeur Corporate</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moduleContainer}>
            <View style={styles.module}>
              <View style={styles.moduleHeader}>
                <Text style={styles.CorporateText}>Personal</Text>
              </View>
              <View style={styles.moduleBody}>
                <Image source={require('../../Assets/Personal.png')} />
                <Text style={styles.ChauffeurText}>Personal Module</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ModuleSelectionUI;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  
  },
  topContainer: {
    height: 70,
    width: '100%',
    backgroundColor: '#3C3567',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, 
  },
  moduleContainer: {
    width: '100%',
    paddingHorizontal: 20,  
    paddingTop: 15,  
  },
  module: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
   
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,  
    marginBottom: 20,
  },
  moduleHeader: {
    width: '100%',
    height: '35%',  
    backgroundColor: '#3C3567',
    justifyContent: 'center',
    alignItems: 'center',
  
    paddingVertical: 15,  
  },
  moduleBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  CorporateText: {
    color: '#FFFFFF',
    fontSize: 26,  
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  ChauffeurText: {
    color: '#212121',
    fontSize: 18, 
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 24, 
    paddingHorizontal: 20, 
  },
});
