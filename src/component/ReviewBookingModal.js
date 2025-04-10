// import { StyleSheet, Text, View, Modal, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector, useDispatch } from 'react-redux';
// import CustomButton from './CustomButtons';
// import CustomHeader from './CustomHeader';
// import IcBackArrowSvg from '../assets/svg/backarrow.svg';
// import { createCorporateBooking } from '../Redux/slice/CorporateSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ReviewBookingModal = ({ visible, onClose, eloc }) => {
//     const navigation = useNavigation();
//     const dispatch = useDispatch();
//     const corporateData = useSelector((state) => state.corporate);
//     const UserDetail = useSelector((state) => state.userprofile);
//     const [userId, setUserId] = useState(null);
//     const [valuesTextInputs, setvaluesTextInputs] = useState({})

//     useEffect(() => {
//         const fetchUserId = async () => {
//             const id = await AsyncStorage.getItem("user_id");
//             setUserId(id);
//         };
//         fetchUserId();
//     }, []);

//     const dateConverter = (value) => {
//         const date = new Date(value * 1000);
        
//         if (isNaN(date.getTime())) {
//             return ""; 
//         }
    
//         const day = String(date.getDate()).padStart(2, "0");
//         const month = String(date.getMonth() + 1).padStart(2, "0"); 
//         const year = date.getFullYear();
    
//         return `${year}-${month}-${day}`; 
//     };
//     // const updateChanges = (key, txt) => {
//     //     setvaluesTextInputs({ ...valuesTextInputs, [key]: txt })
//     //   }
    
//     const handleConfirm = async () => {
//         if (!userId) {
//             Alert.alert("Error", "User ID not found! Please log in again.");
//             return;
//         }
    
//         try {
//             const MyPayload = {
//                 "companyname": UserDetail?.client_name || "",
//                 "Guestname": `${UserDetail?.f_name || ''} ${UserDetail?.l_name || ''}`,
//                 "Guestcontacto": UserDetail?.mobile_number || "",
//                 "guestemail": UserDetail?.email_id || "",
//                 "Guestflight": corporateData?.Guestflight || "",
//                 "Reportingplace": corporateData?.Reportingplace?.placeAddress || "",
//                 "start_date": corporateData?.start_date || "",
//                 "Reporingtime": corporateData?.Reporingtime || "00:00",
//                 "assignment": corporateData?.assignment || "",
//                 "city_of_usage": corporateData?.city_of_usage || "",
//                 "vehiclerequested": corporateData?.vehiclerequested || "",
//                 "instruction": corporateData?.instruction || "",
//                 "payment_mode": corporateData?.paymentValue || "",
//                 "user_id": userId,
//                 "PGorderid": '',
//                 "custom_column": JSON.stringify(corporateData?.custom_column),
//                 "endate": corporateData?.assignment === 'OUTSTATION' 
//                     ? dateConverter(new Date(endDate?.date).getTime() / 1000) 
//                     : dateConverter(new Date(corporateData?.start_date).getTime() / 1000),
//                 "eloc": eloc
//             };
    
//             console.log("Sending Payload:", MyPayload);
    
          
//             Alert.alert("Processing", "Please wait while we confirm your booking...");
    
        
//             const resultAction =  dispatch(createCorporateBooking(MyPayload));
    
//             console.log("Redux Action Result:", resultAction);
    
//             if (createCorporateBooking.fulfilled.match(resultAction)) {
//                 Alert.alert("Success", "Booking confirmed successfully!");
//                 onClose();
//             } else {
//                 Alert.alert("Error", resultAction.payload || "Failed to confirm booking");
//             }
//         }catch (error) {
//             console.error("API Error:", error);
//             console.log("Error Response:", error.response?.data);
//             return rejectWithValue(
//               error.response?.data?.message || error.message || "An unexpected error occurred."
//             );
//           }
          
//         // } catch (error) {
//         //     console.error("Error during booking confirmation:", error);
//         //     Alert.alert("Error", "An unexpected error occurred.");
//         // }
//     };
    
//     return (
//         <Modal visible={visible} animationType="slide" transparent={true}>
//             <View style={styles.overlay}>
//                 <View style={styles.modalContainer}>
//                     <CustomHeader
//                         title="Review Booking Details"
//                         leftIcon={() => (
//                             <TouchableOpacity onPress={onClose}>
//                                 <Image source={require('../assets/ic_back_arrow_white_24.png')} />
//                             </TouchableOpacity>
//                         )}
//                     />
//                     <ScrollView showsVerticalScrollIndicator={false}>
//                         <Text style={styles.sectionTitle}>Dear Guest</Text>
//                         <Text style={styles.subHeader}>Please review and confirm the below details</Text>

//                         <Text style={styles.sectionTitle}>User Details</Text>
//                         {renderDetail('Renter Name', UserDetail?.f_name + ' ' + UserDetail?.l_name)}
//                         {renderDetail('Organisation Name', UserDetail?.client_name)}
//                         {renderDetail('Mobile', UserDetail?.mobile_number)}
//                         {renderDetail('Email', UserDetail?.email_id)}

//                         <Text style={styles.sectionTitle}>Reservation Details</Text>
//                         {renderDetail('Rental City', corporateData?.city_of_usage)}
//                         {renderDetail('Car Group', corporateData?.vehiclerequested)}
//                         {renderDetail('Pickup Address', corporateData?.Reportingplace?.placeAddress)}
//                         {renderDetail('Reporting Date/Time', `${corporateData?.start_date} , ${corporateData?.Reporingtime}`)}
//                         {renderDetail('Reporting Address',eloc)}
//                         {renderDetail('Flight/Train Info', corporateData?.Guestflight)}
//                         {renderDetail('Special Instruction', corporateData?.instruction)}
//                         {renderDetail('Payment Mode', corporateData?.payment_mode)}
//                     </ScrollView>
//                     <View style={styles.buttonContainer}>
//                         <CustomButton title={'Edit'} widthSize='49%' onPress={onClose} borderRadius={8} />
//                         <CustomButton title={'Confirm'} widthSize='49%' onPress={handleConfirm} borderRadius={8} />
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const renderDetail = (label, value) => (
//     <View style={styles.detailRow}>
//         <Text style={styles.detailLabel}>{label}</Text>
//         <View style={styles.valueContainer}>
//             <Text style={styles.detailValue}>: {value || '-'}</Text>
//         </View>
//     </View>
// );
import { StyleSheet, Text, View, Modal, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from './CustomButtons';
import CustomHeader from './CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createCorporateBooking, resetCorporateSlice } from '../Redux/slice/CorporateSlice';

const ReviewBookingModal = ({ visible, onClose, eloc }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const corporateData = useSelector((state) => state.corporate);
    const UserDetail = useSelector((state) => state.userprofile);
    const [userId, setUserId] = useState(null);

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

    // const handleConfirm = async () => {
    //     if (!userId) {
    //         Alert.alert("Error", "User ID not found! Please log in again.");
    //         return;
    //     }

    //     try {
    //         const MyPayload = {
    //             companyname: UserDetail?.client_name || "",
    //             Guestname: `${UserDetail?.f_name || ''} ${UserDetail?.l_name || ''}`,
    //             Guestcontacto: UserDetail?.mobile_number || "",
    //             guestemail: UserDetail?.email_id || "",
    //             Guestflight: corporateData?.Guestflight || "",
    //             Reportingplace: corporateData?.Reportingplace?.placeAddress || "",
    //             start_date: corporateData?.start_date || "",
    //             Reporingtime: corporateData?.Reporingtime || "00:00",
    //             assignment: corporateData?.assignment || "",
    //             city_of_usage: corporateData?.city_of_usage || "",
    //             vehiclerequested: corporateData?.vehiclerequested || "",
    //             instruction: corporateData?.instruction || "",
    //             payment_mode: corporateData?.paymentValue || "",
    //             user_id: userId,
    //             PGorderid: '',
    //             custom_column: JSON.stringify(corporateData?.custom_column),
    //             endate: corporateData?.assignment === 'OUTSTATION' 
    //                 ? dateConverter(new Date(corporateData?.end_date).getTime() / 1000) 
    //                 : dateConverter(new Date(corporateData?.start_date).getTime() / 1000),
    //             eloc: eloc
    //         };

    //         console.log("Sending Payload:", MyPayload);

    //         Alert.alert("Processing", "Please wait while we confirm your booking...");

    //         const resultAction =  dispatch(createCorporateBooking(MyPayload));

    //         console.log("Redux Action Result:", resultAction);

    //         if (resultAction.MyPayload) {
    //             Alert.alert("Success", "Booking confirmed successfully!");
    //             onClose();
    //         } else {
    //             Alert.alert("Error", "Failed to confirm booking");
    //         }
    //     } catch (error) {
    //         console.error("API Error:", error);
    //         Alert.alert("Error", error.response?.data?.message || "An unexpected error occurred.");
    //     }
    // };
    const handleConfirm = async () => {
        if (!userId) {
            Alert.alert("Error", "User ID not found! Please log in again.");
            return;
        }
    
        try {
            const MyPayload = {
                companyname: UserDetail?.client_name || "",
                Guestname: `${UserDetail?.f_name || ''} ${UserDetail?.l_name || ''}`,
                Guestcontacto: UserDetail?.mobile_number || "",
                guestemail: UserDetail?.email_id || "",
                Guestflight: corporateData?.Guestflight || "",
                Reportingplace: corporateData?.Reportingplace?.placeAddress || "",
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
    
            console.log(" Sending Payload:", MyPayload);
    
            Alert.alert("Processing", "Please wait while we confirm your booking...");
    
            const resultAction = await dispatch(createCorporateBooking(MyPayload));
    
            console.log("Redux Action Result:", resultAction);
    
     
            if (createCorporateBooking.fulfilled.match(resultAction)) {
                Alert.alert(
                  "Booking Confirmed",
                  `Your booking has been successfully submitted.\nBooking ID: ${resultAction.payload}`,
                  [{
                    text: "OK",
                    onPress: () => {
                      dispatch(resetCorporateSlice());
                      onClose();
                      navigation.navigate('Upcoming', { eloc: eloc});
                    },
                  }]
                );
              } else {
                Alert.alert("Error", resultAction.payload || "Failed to confirm booking");
              }
        } catch (error) {
            console.error(" API Error:", error);
            Alert.alert("Error", error.response?.message || "An unexpected error occurred.");
        }
    };
    
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <CustomHeader
                        title="Review Booking Details"
                        leftIcon={() => (
                            <TouchableOpacity onPress={onClose}>
                                <Image source={require('../assets/ic_back_arrow_white_24.png')} />
                            </TouchableOpacity>
                        )}
                    />
                    <ScrollView showsVerticalScrollIndicator={false}>
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
                        {renderDetail('Pickup Address', corporateData?.Reportingplace?.placeAddress)}
                        {renderDetail('Reporting Date/Time', `${corporateData?.start_date} , ${corporateData?.Reporingtime}`)}
                        {renderDetail('Reporting Address', eloc)}
                        {renderDetail('Flight/Train Info', corporateData?.Guestflight)}
                        {renderDetail('Special Instruction', corporateData?.instruction)}
                        {renderDetail('Payment Mode', corporateData?.payment_mode)}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <CustomButton title={'Edit'} widthSize='49%' onPress={onClose} borderRadius={8} />
                        <CustomButton title={'Confirm'} widthSize='49%' onPress={handleConfirm} borderRadius={8} />
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
});

export default ReviewBookingModal;