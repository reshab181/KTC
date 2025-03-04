// Ashutosh Rai
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Modal, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButtons';
import CustomHeader from './CustomHeader';
import IcBackArrowSvg from '../assets/svg/backarrow.svg'
import { createCorporateBooking } from '../Redux/slice/CorporateSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewBookingModal = ({ visible, onClose }) => {
    const corporateData = useSelector((state) => state.corporate);
    const UserDetail = useSelector((state) => state.userprofile);
    const dispatch = useDispatch();
    // const userId = AsyncStorage.getItem("user_id")

    console.log("Corporate Data in Modal:", corporateData);

    const getUserId = async () => {
        try {
            const id = await AsyncStorage.getItem("user_id");
            return id;
        } catch (error) {
            console.error("Error fetching user ID:", error);
            return null;
        }
    };
    
    const handleConfirm = async () => {
        const userId = await getUserId();
        if (!userId) {
            Alert.alert("Error", "User ID not found! Please log in again.");
            return;
        }
    
        try {
            const MyPayLod = {
                "companyname": UserDetail?.client_name,
                "Guestname": `${UserDetail?.f_name} ${UserDetail?.l_name}`,
                "Guestcontacto": UserDetail?.mobile_number,
                "guestemail": UserDetail?.email_id,
                "Guestflight": corporateData?.flightNo || "",
                "Reportingplace": corporateData?.pickupAddress?.placeAddress || "",
                "start_date": selectedTimeStamp 
                    ? dateConverter(new Date(selectedTimeStamp).getTime() / 1000) 
                    : SERVICE_REQUEST.getCurrentDate(false),
                "Reporingtime": selectedTime || "00:00",
                "assignment": corporateData?.rentalTypeValue || "",
                "city_of_usage": corporateData?.city_of_usage || "",
                "vehiclerequested": corporateData?.vehiclerequested || "",
                "instruction": corporateData?.specialInstrution || "",
                "payment_mode": corporateData?.paymentValue || "",
                "user_id": userId,
                "PGorderid": '',
                "custom_column": JSON.stringify(valuesTextInputs || {}),
                "endate": rentalTypeValue === 'OUTSTATION' 
                    ? (endDate?.date ? dateConverter(new Date(endDate.date).getTime() / 1000) : SERVICE_REQUEST.getCurrentDate(false)) 
                    : dateConverter(new Date(selectedDate).getTime() / 1000),
                "eloc": corporateData?.elcoset || ""
            };
    
            console.log("Sending Payload:", MyPayLod);
    
            const resultAction = dispatch(createCorporateBooking(MyPayLod));
    
            console.log("API Response:", resultAction);
    
            if (createCorporateBooking.fulfilled.match(resultAction)) {
                Alert.alert("Success", "Booking confirmed successfully!");
                onClose();
            } else {
                Alert.alert("Error", resultAction.payload || "Failed to confirm booking");
            }
        } catch (error) {
            console.error("Error during booking confirmation:", error);
            Alert.alert("Error", "An unexpected error occurred.");
        }
    // const { city, carGroup, reportingLandmark, paymentMode ,specialInstruction, flightTrainInfo ,pickupAddress, selectedDate, selectedTime } = useSelector((state) => state.corporate)
    // const UserDetail = useSelector((state) => state.userprofile)
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
                    {renderDetail('Rental City', corporateData.city_of_usage)}
                    {renderDetail('Car Group', corporateData.vehiclerequested)}
                    {renderDetail('Pickup Address', corporateData.Reportingplace)}
                    {renderDetail('Reporting Date/Time', corporateData.start_date + " , " + corporateData.Reporingtime)}
                    {renderDetail('Reporting Address', corporateData.eloc)}
                    {renderDetail('Flight/Train Info', corporateData.Guestflight)}
                    {renderDetail('Special Instruction', corporateData.instruction)}
                    {renderDetail('Payment Mode', corporateData.payment_mode)}

                    {/* Buttons */}

                </View>

            </View>
            <View style={styles.buttonContainer}>
                <CustomButton title={'Edit'} widthSize='49%' onPress={onClose} borderRadius={0} />
                <CustomButton title={'Confirm'} widthSize='49%' onPress={handleConfirm} borderRadius={0} />

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
}
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { Modal, TouchableOpacity } from 'react-native';
// import CustomButton from './CustomButtons';
// import CustomHeader from './CustomHeader';
// import IcBackArrowSvg from '../assets/svg/backarrow.svg'
// import { createBooking } from '../Redux/slice/BookingSlice' 

// const ReviewBookingModal = ({ visible, onClose }) => {
//     const dispatch = useDispatch();

//     const { city, carGroup, reportingLandmark, paymentMode, specialInstruction, flightTrainInfo, pickupAddress, selectedDate, selectedTime } = useSelector((state) => state.corporate)
//     const UserDetail = useSelector((state) => state.userprofile)

//     const dateConverter = (timestamp) => {
//         // Implement your date conversion logic here
//         // This should match what's in your onConfirmClick function
//         const date = new Date(timestamp * 1000);
//         return date.toISOString().split('T')[0]; // Basic example, adjust as needed
//     };
    
//     const handleConfirm = () => {
//         // Create the payload for the API
//         const payload = {
//             city: city,
//             car_group: carGroup,
//             reporting_landmark: reportingLandmark,
//             payment_mode: paymentMode,
//             special_instruction: specialInstruction,
//             flight_train_info: flightTrainInfo,
//             pickup_address: pickupAddress?.placeAddress,
//             selected_date: selectedDate,
//             selected_time: selectedTime,
//             user_name: UserDetail?.f_name + ' ' + UserDetail?.l_name,
//             organisation_name: UserDetail?.client_name,
//             mobile: UserDetail?.mobile_number,
//             email: UserDetail?.email_id
          
//         };
        
//         // Dispatch the createBooking action
//         dispatch(createBooking(payload))
//             .unwrap()
//             .then((result) => {
//                 // Handle success
//                 console.log('Booking created successfully:', result);
//                 onClose(); // Close modal after successful booking
//             })
//             .catch((error) => {
//                 // Handle error
//                 console.error('Error creating booking:', error);
//             });
//     };

//     return (
//         <Modal visible={visible} animationType="slide" >
//             <CustomHeader title={'Review Booking Details'} Iconn={IcBackArrowSvg} iconHeight={24} iconWidth={24} handleLeftIcon={onClose} />

//             <View style={styles.overlay}>
//                 <View style={styles.modalContainer}>
//                     <Text style={styles.sectionTitle}>Dear Guest </Text>
//                     <Text style={styles.subHeader}>Please review and confirm the below details</Text>

//                     <Text style={styles.sectionTitle}>User Details</Text>
//                     {renderDetail('Renter Name', UserDetail?.f_name + ' ' + UserDetail?.l_name)}
//                     {renderDetail('Organisation Name', UserDetail?.client_name)}
//                     {renderDetail('Mobile', UserDetail?.mobile_number)}
//                     {renderDetail('Email', UserDetail?.email_id)}
                    
//                     <Text style={styles.sectionTitle}>Reservation Details</Text>
//                     {renderDetail('Rental City', city)}
//                     {renderDetail('Car Group', carGroup)}
//                     {renderDetail('Pickup Address' , pickupAddress?.placeAddress )}
//                     {renderDetail('Reporting Date/Time', selectedDate + " , " + selectedTime)}
//                     {renderDetail('Reporting Address', reportingLandmark)}
//                     {renderDetail('Flight/Train Info', flightTrainInfo)}
//                     {renderDetail('Special Instruction', specialInstruction)}
//                     {renderDetail('Payment Mode',paymentMode)}

//                     {/* Buttons */}
//                 </View>
//             </View>
//             <View style={styles.buttonContainer}>
//                 <CustomButton title={'Edit'} widthSize='49%' onPress={onClose} borderRadius={0} />
//                 <CustomButton title={'Confirm'} widthSize='49%' onPress={handleConfirm} borderRadius={0} />
//             </View>
//         </Modal>
//     );
// };
// const renderDetail = (label, value) => (
//     <View style={styles.detailRow}>
//         <Text style={styles.detailLabel}>{label} </Text>
//         <Text style={styles.detailValue}>: {value || '-'}</Text>
//     </View>
// );
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
