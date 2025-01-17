//**Author---Reshab Kumar Pandey
// Component-- ModuleSelection.js */

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
import CustomHeader from '../../Reusables/CustomHeader';

const ModuleSelectionUI = () => {
  const navigation = useNavigation();

  const handleNavigate = (module) => {
    if (navigation.isFocused()) {
      navigation.navigate('SignInCorporate', {
        screen: 'RegisterPOPUP',
        params: { presentation: 'modal', module },
      });
    }
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
      <CustomHeader imgPath={require('../../Assets/ktclogo.png')} justifyContent={'center'}/>
      <View style={styles.contentContainer}>
        <ModuleCard
          title="Corporate"
          image={require('../../Assets/Corporate.png')}
          description="Chauffeur Corporate"
          onPress={() => handleNavigate('Corporate')}
        />
        <ModuleCard
          title="Personal"
          image={require('../../Assets/Personal.png')}
          description="Personal Module"
          onPress={() => handleNavigate('Personal')}
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
  topContainer: {
    height: 70,
    backgroundColor: '#3C3567',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  logo: {
  
    height: '100%',
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  moduleContainer: {
    width: '100%',
    marginBottom: 20,
  },
  module: {
    width: '100%',
    height: 220,
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
    fontWeight: '600',
    textAlign: 'center',
  },
  moduleImage: {
    height: 60,
    resizeMode: 'contain',
  },
});
// import React from 'react';
// import { 
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const ModuleSelectionUI = () => {
//   const navigation = useNavigation();

//   const handleNavigate = (module) => {
//     if (navigation.isFocused()) {
//       navigation.navigate('RegisterPOPUP', { 
//         module: module, 
//         presentation: 'modal' 
//       });
//     }
//   };

//   const ModuleCard = ({ title, image, description, onPress }) => (
//     <TouchableOpacity style={styles.moduleContainer} onPress={onPress} activeOpacity={0.9}>
//       <View style={styles.module}>
//         <View style={styles.moduleHeader}>
//           <Text style={styles.moduleHeaderText}>{title}</Text>
//         </View>
//         <View style={styles.moduleBody}>
//           <Image source={image} style={styles.moduleImage} />
//           <Text style={styles.moduleBodyText}>{description}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.topContainer}>
//         <Image
//           resizeMode="contain"
//           source={require('../../Assets/ktc.png')} 
//           style={styles.logo}
//         />
//       </View>
//       <View style={styles.contentContainer}>
//         <ModuleCard
//           title="Corporate"
//           image={require('../../Assets/Corporate.png')}
//           description="Chauffeur Corporate"
//           onPress={() => handleNavigate('Corporate')}
//         />
//         <ModuleCard
//           title="Personal"
//           image={require('../../Assets/Personal.png')}
//           description="Personal Module"
//           onPress={() => handleNavigate('Personal')}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };
// export default ModuleSelectionUI;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   topContainer: {
//     height: 70,
//     backgroundColor: '#3C3567',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.4,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   logo: {
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 15,
//   },
//   moduleContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   module: {
//     width: '100%',
//     height: 220,
//     backgroundColor: '#F2F2F2',
//     shadowColor: '#000',
//     shadowOpacity: 0.8,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 8,
//   },
//   moduleHeader: {
//     height: '22%',
//     backgroundColor: '#3C3567',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   moduleHeaderText: {
//     color: '#FFFFFF',
//     fontSize: 17,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   moduleBody: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   moduleBodyText: {
//     color: '#212121',
//     fontSize: 16,
//     marginTop: 20,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   moduleImage: {
//     height: 60,
//     resizeMode: 'contain',
//   },
// });