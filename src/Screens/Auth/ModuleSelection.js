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
  const handleNavigate = () => {
    navigation.navigate('SignInCorporate', {
      screen: 'RegisterPOPUP',  
      params: { presentation: 'modal' },  
    });
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Image resizeMode="contain" source={require('../../Assets/ktc.png')} />
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15 }}
        >
          <TouchableOpacity style={styles.moduleContainer} onPress={handleNavigate}>
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
  
  },
  moduleContainer: {
    width: '100%',
  
    paddingTop: 15,
  },
  module: {
    width: '100%',
    height: 220,
    backgroundColor: '#F2F2F2',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    marginBottom: 20,
  },
  moduleHeader: {
    width: '100%',
    height: '25%',
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
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  ChauffeurText: {
    color: '#212121',
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});
