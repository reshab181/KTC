import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useWindowDimensions } from 'react-native';

const CustomModal = ({ message1, message2, isVisible, onClose, isButtonVisible = true, btnText }) => {
  const styles = useStyles();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Image source={require('../Assets/tickbuttn.png')} style={styles.img} />
              <Text style={styles.modalText}>{message1}</Text>
              <Text style={styles.modalText}>{message2}</Text>
              {isButtonVisible ? (
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>{btnText}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;

function useStyles() {
  const { width: winwidth, height: winheight } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F1F1F3',
    },
    img: {
      height: 64,
      width: 64,
      marginBottom: 22,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background color
    },
    modalContainer: {
      width: winwidth * 0.96,
      margin: 10,
      height: 458,
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      opacity: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalText: {
      fontSize: 14,
      marginBottom: 10,
    },
    closeButton: {
      backgroundColor: '#3C3567',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 10,
      borderRadius: 5,
    },
    closeButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
  });
}
