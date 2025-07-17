// Reshab 
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  Image,
  Dimensions,
  Animated,
  Alert,
  SafeAreaView, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import HomeSvg from '../assets/svg/home.svg'
import BookingSvg from '../assets/svg/Mybookings.svg'
import ProfileSvg from '../assets/svg/my-profile.svg'
import NotificationSvg from '../assets/svg/notifications.svg';
import HelpSvg from '../assets/svg/help.svg';
import LogoutSvg from '../assets/svg/logout.svg'
import { useDispatch, useSelector } from 'react-redux';
import { resetSignInState } from '../Redux/slice/SignInSlice';
import { persistor } from '../Redux/store';
import Mybooking from '../assets/icon/Mybookings';
import Home from '../assets/icon/Home';
import MyProfile from '../assets/icon/MyProfile';
import Help from '../assets/icon/Help';
import Logout from '../assets/icon/Logout';
const windowWidth = Dimensions.get('window').width;

const SidebarMenu = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const translateX = useRef(new Animated.Value(-windowWidth * 0.8)).current; 
  const dispatch = useDispatch(); 
  const SignInApiState = useSelector((state) => state.signIn);

  const menuItems = [
    { name: 'Home', route: 'CorporateHomeScreen', icon: Home },
    { name: 'Manage Bookings', route: 'Upcoming', icon: Mybooking},
    { name: 'Profile', route: 'Profile', icon: MyProfile},
    { name: 'Help', route: 'Help', icon: Help},
    { name: 'Logout', route: 'logout', icon: Logout}, 
  ];

  const handleNavigation = (route) => {
    if (route === 'logout') {
      handleLogout(); 
    } else {
      onClose();
      navigation.navigate(route);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await clearUserData(); 
            persistor.purge();
            onClose();
            navigation.replace('CorporateLoginNavigator', {
              screen: 'CorporateSignIn',
            });
          },
        },
      ]
    );
  };

  const clearUserData = async () => {
    try {
      dispatch(resetSignInState());
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.setItem('isLoggedInn', 'false');
      // await AsyncStorage.removeItem('user_id');  
      // await AsyncStorage.removeItem('user_email');  

    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  const handleClose = () => {
    Animated.timing(translateX, {
      toValue: -windowWidth * 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose(); 
    });
  };

  useEffect(() => {
    if (isVisible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      handleClose();
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
    >
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={handleClose} />
          <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
            <View style={styles.header}>
              <Image
                source={require('../assets/ktc.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuItems}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.route)}
                >
                  {item.icon && <item.icon style={styles.menuIcon} />}
                  <Text style={styles.menuText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },
//   menu: {
//     width: windowWidth * 0.8,
//     height: '100%',
//     backgroundColor: '#FFFFFF',
//     paddingBottom: 30,
//     position: 'absolute',
//     left: 0,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   header: {
//     flexDirection: 'row',
//     backgroundColor: '#3C3567',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 120,
//     height: 40,
//   },
//   closeButton: {
//     padding: 10,
//   },
//   closeText: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#FFF',
//   },
//   menuItems: {
//     marginTop: 10,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//   },
//   menuIcon: {
//     width: 28,
//     height: 28,
//     marginRight: 15,
//   },
//   menuText: {
//     fontSize: 20,
//     color: '#666666',
//     fontWeight: 'normal',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    width: windowWidth * 0.8,
    height: '100%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3C3567',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 12,
  },
  logo: {
    width: 120,
    height: 40,
  },
  closeButton: {
    padding: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    // borderRadius: 20,
  },
  closeText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  menuIcon: {
    width: 26,
    height: 26,
    marginRight: 18,
  },
  menuText: {
    fontSize: 20,
    color: '#333',
    fontWeight: '500',
  },
});


export default SidebarMenu;
