// Ashutosh Rai
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { Modal, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButtons';
import CustomHeader from './CustomHeader';
import IcBackArrowSvg from '../assets/svg/backarrow.svg'
const ReviewBookingModal = ({ visible, onClose }) => {
    const { city, carGroup, reportingLandmark, paymentMode ,specialInstruction, flightTrainInfo,  selectedDate, selectedTime } = useSelector((state) => state.corporate)
    const UserDetail = useSelector((state) => state.userprofile)
    return (
        <Modal visible={visible} animationType="slide" >
            <CustomHeader title={'Review Booking Details'} Iconn={IcBackArrowSvg} iconHeight={24} iconWidth={24} handleLeftIcon={onClose} />

            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.sectionTitle}>Dear Guest </Text>
                    <Text style={styles.subHeader}>Please review and confirm the below details</Text>

                    <Text style={styles.sectionTitle}>User Details</Text>
                    {renderDetail('Renter Name', UserDetail?.f_name + ' ' + UserDetail?.l_name)}
                    {renderDetail('Organisation Name', UserDetail?.client_name)}
                    {renderDetail('Mobile', UserDetail?.mobile_number)}
                    {renderDetail('Email', UserDetail?.email_id)}

                    <Text style={styles.sectionTitle}>Reservation Details</Text>
                    {renderDetail('Rental City', city)}
                    {renderDetail('Car Group', carGroup)}
                    {renderDetail('Reporting Date/Time', selectedDate + " , " + selectedTime)}
                    {renderDetail('Reporting Address', reportingLandmark)}
                    {renderDetail('Flight/Train Info', flightTrainInfo)}
                    {renderDetail('Special Instruction', specialInstruction)}
                    {renderDetail('Payment Mode',paymentMode)}

                    {/* Buttons */}

                </View>

            </View>
            <View style={styles.buttonContainer}>
                <CustomButton title={'Edit'} widthSize='49%' onPress={onClose} borderRadius={0} />
                <CustomButton title={'Confirm'} widthSize='49%' onPress={onClose} borderRadius={0} />

            </View>
        </Modal>
    );
};
const renderDetail = (label, value) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label} </Text>
        <Text style={styles.detailValue}>: {value || '-'}</Text>
    </View>
);

const styles = StyleSheet.create({
    overlay: {
        flex : 1,
        backgroundColor : "#F1F1F3", 
    },
    modalContainer: {
        marginTop: 20 , 
        paddingHorizontal: 10,
        marginHorizontal: 10 ,
        paddingTop: 20,
        borderRadius: 5,
        backgroundColor: 'white',
        // alignContent: 'center',
        // alignSelf: 'center',
        elevation: 5, 
        marginBottom: 20 ,
    },
    header: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#212121',
    },
    subHeader: {
        fontSize: 14,
        marginBottom: 15,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#212121',
        // marginBottom: 21, 
    },
    detailRow: {
        flexDirection: 'row',
        marginVertical: 6,
    },
    detailLabel: {
        width: '50%',
        fontWeight: 'normal',
        color: '#666666',
        fontSize: 14
    },
    detailValue: {
        width: '50%',
        color: '#222',
        fontSize: 12, 
        flexWrap: 'wrap', 
        fontWeight: '900'
        
    },
    buttonContainer: {
        width: "100%",
        position: 'absolute',
        bottom : 0 , 
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ReviewBookingModal;
