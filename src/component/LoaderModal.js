import React from 'react';
import {Modal, View, ActivityIndicator, StyleSheet} from 'react-native';

const LoaderModal = ({visible}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(44, 12, 223, 0.4)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoaderModal;
