import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const SidebarMenu = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const translateX = useRef(new Animated.Value(-windowWidth * 0.8)).current; // Initial position off-screen

  const menuItems = [
    { name: 'Home', route: 'CorporateModule1' },
    { name: 'My Bookings', route: 'Bookings' },
    { name: 'Profile', route: 'Profile' },
    { name: 'Notifications', route: 'Notification' },
    { name: 'Logout', route: 'Login' },
  ];

  const handleNavigation = (route) => {
    onClose();
    navigation.navigate(route);
  };


  useEffect(() => {
    if (isVisible) {
    
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      
      Animated.timing(translateX, {
        toValue: -windowWidth * 0.8,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
      
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />

    
        <Animated.View
          style={[styles.menu, { transform: [{ translateX }] }]}
        >
          <View style={styles.header}>
            <Image source={require('../Assets/ktclogo.png')} style={styles.logo} resizeMode="contain" />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
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
                <Text style={styles.menuText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  menu: {
    width: windowWidth * 0.8,
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingBottom: 30,
    position: 'absolute',
    left: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#3C3567',
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFF',
  },
  menuItems: {
    marginTop: 10,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 20,
    color: ' #666666',
    fontWeight: '500',
  },
});

export default SidebarMenu;
