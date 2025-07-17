


import { StyleSheet, Text, View, Modal, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from './CustomButtons';
import CustomHeader from './CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createCorporateBooking, resetCorporateSlice, clearBookingData } from '../Redux/slice/CorporateSlice';

const ReviewBookingModal = ({ visible, onClose, eloc }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const corporateData = useSelector((state) => state.reviewBooking);
    const UserDetail = useSelector((state) => state.userprofile);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingId, setBookingId] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        if (visible) {
            setBookingSuccess(false);
            setBookingId('');
            setError('');
            // Clear previous booking data to avoid conflicts
            dispatch(clearBookingData());
        }
    }, [visible, dispatch]);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem("user_id");
            setUserId(id);
        };
        fetchUserId();
    }, []);

    const dateConverter = (value) => {
        const date = new Date(value * 1000);
        if (isNaN(date.getTime())) return ""; 
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`; 
    };

    const handleConfirm = async () => {
        if (!userId) {
            setError("User ID not found! Please log in again.");
            return;
        }
    
        try {
            setLoading(true);
            setError('');
            
            const MyPayload = {
                companyname: UserDetail?.client_name || "",
                Guestname: `${UserDetail?.f_name || ''} ${UserDetail?.l_name || ''}`,
                Guestcontacto: UserDetail?.mobile_number || "",
                guestemail: UserDetail?.email_id || "",
                Guestflight: corporateData?.Guestflight || "",
                // Reportingplace: corporateData?.Reportingplace?.placeAddress || "",
                Reportingplace: corporateData?.Reportingplace 
                ? `${corporateData.Reportingplace.placeName || ''}, ${corporateData.Reportingplace.placeAddress || ''}`
                : "",
                start_date: corporateData?.start_date || "",
                Reporingtime: corporateData?.Reporingtime || "00:00",
                assignment: corporateData?.assignment || "",
                city_of_usage: corporateData?.city_of_usage || "",
                vehiclerequested: corporateData?.vehiclerequested || "",
                instruction: corporateData?.instruction || "",
                payment_mode: corporateData?.paymentValue || "abc",
                user_id: userId,
                PGorderid: '',
                custom_column: corporateData?.custom_column 
                    ? JSON.stringify(corporateData.custom_column) 
                    : "{}",
                endate: corporateData?.assignment === 'OUTSTATION' 
                    ? dateConverter(new Date(corporateData?.end_date || Date.now()).getTime() / 1000) 
                    : dateConverter(new Date(corporateData?.start_date || Date.now()).getTime() / 1000),
                eloc: eloc || ""
            };
    
            console.log("Sending Payload:", MyPayload);
    
            const resultAction = await dispatch(createCorporateBooking(MyPayload));
            console.log("Redux Action Result:", resultAction);
    
            if (createCorporateBooking.fulfilled.match(resultAction)) {
              
                if (resultAction.payload) {
                    setBookingSuccess(true);
                    setBookingId(resultAction.payload);
                } else {
                    setError("Booking was created but no booking ID was returned");
                }
            } else {
                setError(resultAction.payload || "Failed to confirm booking");
            }
        } catch (error) {
            console.error("API Error:", error);
            setError(error.response?.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleDone = () => {
        onClose();
        
        dispatch(resetCorporateSlice());
        
   
        if (typeof onConfirm === 'function') {
            onConfirm();
        }

        
        setTimeout(() => {
            setBookingSuccess(false);
            setBookingId('');
        }, 500);
    navigation.navigate('Upcoming', { eloc: eloc });
    };
    
    if (!visible) return null;

    return (
        <Modal 
            visible={visible} 
            animationType="slide" 
            transparent={true}
            onRequestClose={bookingSuccess ? handleDone : onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <CustomHeader
                        title={bookingSuccess ? "Booking Confirmed" : "Review Booking Details"}
                        leftIcon={() => (
                            <TouchableOpacity onPress={bookingSuccess ? handleDone : onClose}>
                                <Image source={require('../assets/ic_back_arrow_white_24.png')} />
                            </TouchableOpacity>
                        )}
                    />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {loading && (
                            <View style={styles.loadingContainer}>
                                <Text style={styles.loadingText}>Processing your booking...</Text>
                            </View>
                        )}
                        
                        {error !== '' && (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        )}
                        
                        {bookingSuccess ? (
                            <View style={styles.successContainer}>
                                <Image 
                                    source={require('../assets/tickbuttn.png')} 
                                    style={styles.successIcon}
                                />
                                <Text style={styles.successTitle}>Booking Successfully Confirmed!</Text>
                                <Text style={styles.bookingIdLabel}>Booking ID:</Text>
                                <Text style={styles.bookingIdValue}>{bookingId}</Text>
                                <Text style={styles.successMessage}>
                                    Your booking has been successfully created. You can check the booking details in your upcoming bookings.
                                </Text>
                            </View>
                        ) : (
                            <>
                                <Text style={styles.sectionTitle}>Dear Guest</Text>
                                <Text style={styles.subHeader}>Please review and confirm the below details</Text>

                                <Text style={styles.sectionTitle}>User Details</Text>
                                {renderDetail('Renter Name', UserDetail?.f_name + ' ' + UserDetail?.l_name)}
                                {renderDetail('Organisation Name', UserDetail?.client_name)}
                                {renderDetail('Mobile', UserDetail?.mobile_number)}
                                {renderDetail('Email', UserDetail?.email_id)}

                                <Text style={styles.sectionTitle}>Reservation Details</Text>
                                {renderDetail('Rental City', corporateData?.city_of_usage)}
                                {renderDetail('Car Group', corporateData?.vehiclerequested)}
                                {renderDetail('Pickup Address',  `${corporateData?.Reportingplace?.placeName} ,${corporateData?.Reportingplace?.placeAddress}`)}
                                {renderDetail('Reporting Date/Time', `${corporateData?.start_date} , ${corporateData?.Reporingtime}`)}
                                {renderDetail('Reporting Address', eloc)}
                                {renderDetail('Flight/Train Info', corporateData?.Guestflight)}
                                {renderDetail('Special Instruction', corporateData?.instruction)}
                                {renderDetail('Payment Mode', corporateData?.payment_mode)}
                            </>
                        )}
                    </ScrollView>
                    
                    <View style={styles.buttonContainer}>
                        {bookingSuccess ? (
                            <CustomButton 
                                title={'Done'} 
                                widthSize='100%' 
                                onPress={handleDone} 
                                borderRadius={8} 
                            />
                        ) : (
                            <>
                                <CustomButton 
                                    title={'Edit'} 
                                    widthSize='49%' 
                                    onPress={onClose} 
                                    borderRadius={8} 
                                    disabled={loading}
                                />
                                <CustomButton 
                                    title={loading ? 'Processing...' : 'Confirm'} 
                                    widthSize='49%' 
                                    onPress={handleConfirm} 
                                    borderRadius={8} 
                                    disabled={loading}
                                />
                            </>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const renderDetail = (label, value) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <View style={styles.valueContainer}>
            <Text style={styles.detailValue}>: {value || '-'}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '95%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
        maxHeight: '80%',
        overflow: 'hidden',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
        color: '#333'
    },
    subHeader: {
        fontSize: 14,
        marginBottom: 16,
        color: '#666'
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    detailLabel: {
        fontWeight: '500',
        fontSize: 15,
        color: '#222',
        width: '40%',
    },
    valueContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    detailValue: {
        fontSize: 14,
        color: '#777',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        width: '100%',
    },
    loadingContainer: {
        padding: 20,
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
    },
    errorContainer: {
        padding: 15,
        backgroundColor: '#ffeeee',
        borderRadius: 8,
        marginVertical: 10,
    },
    errorText: {
        color: '#d32f2f',
        fontSize: 14,
    },
    successContainer: {
        alignItems: 'center',
        padding: 20,
    },
    successIcon: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    successTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2e7d32',
        marginBottom: 20,
        textAlign: 'center',
    },
    bookingIdLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
        marginBottom: 5,
    },
    bookingIdValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    successMessage: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
    }
});

export default ReviewBookingModal;
