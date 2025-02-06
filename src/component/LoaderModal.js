import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

const LoaderModal = ({ visible }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={() => { }} // Prevents closing by back button
        >
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
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // High opacity background
    },
    loaderContainer: {
        width: 80,
        height: 80,
        backgroundColor: 'rgba(44, 12, 223, 0.2)', // Slightly transparent white
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoaderModal;