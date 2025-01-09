import React from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RegisterPOPUP from './RegisterPopUp';

const ModuleSelectionUI = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Image resizeMode="contain" source={require('../../Assets/ktc.png')} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
          <TouchableOpacity style={styles.moduleContainer} >
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
    backgroundColor: '#F5F5F5'
  },
  topContainer: {
    height: 80,
    width: '100%',
    backgroundColor: '#3C3567',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleContainer: {
    width: '100%',
    paddingVertical: 20,
  },
  module: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  moduleHeader: {
    width: '100%',
    height: '30%',
    backgroundColor: '#3C3567',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  moduleBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  CorporateText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  ChauffeurText: {
    color: '#212121',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});
