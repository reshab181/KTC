import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import CustomHeader from '../../Reusables/CustomHeader';
import Upcoming from './Upcoming';
// import MapIndex from '../Map/MapIndex';


const Track = ({
    duration = "Arriving in: 5 mins",
    carName = "Mercedes Benz CLS",
    carNumber = "DL 11 CK 9954",
    onCallDriver,
    onViewLandmark,
    onCancelRide,
    onBack,
    navigation
}) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            {/* //Ashutosh  */}
            <CustomHeader iconPath={require('../../Assets/ic_back_arrow_white_24.png')}
                title={"Track Chauffer"}
                iconHeight={24}
                iconWidth={24}
                handleLeftIcon={()=>{navigation.navigate('Upcoming')}}
            />
            {/* Header */}

            {/* <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Image source={require('../../Assets/ic_back_arrow_white_24.png')} />
                </TouchableOpacity>
                <CustomHeader title="Track Chauffeur" />
            </View> */}

            {/* Map View */}
            {/* <View style={styles.mapContainer}>
                <MapIndex/>
            </View> */}

            {/* Car Details and Actions */}
            <View style={styles.container}>
                <View style={styles.carDetailsContainer}>
                    <View style={styles.timeContainer}>
                        <Text style={styles.durationText}>{duration}</Text>
                        <Image
                            source={require('../../Assets/cardemo.png')}
                            style={styles.image}
                            onError={() => console.warn('Car image failed to load')}
                        />
                    </View>

                    <View style={styles.carInfoContainer}>
                        <Text style={styles.carName}>{carName}</Text>
                        <Text style={styles.carNumber}>{carNumber}</Text>
                    </View>
                </View>

                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={styles.actionButton} onPress={onCallDriver}>
                        <Image
                            source={require('../../Assets/call.png')}
                            style={styles.bottomimage}
                        />
                        <Text style={styles.actionButtonText}>Call Driver</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={onViewLandmark}>
                        <Image
                            source={require('../../Assets/land-mark.png')}
                            style={styles.bottomimage}
                        />
                        <Text style={styles.actionButtonText}>Landmark</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={onCancelRide}>
                        <Image
                            source={require('../../Assets/cancel.png')}
                            style={styles.bottomimage}
                        />
                        <Text style={styles.actionButtonText}>Cancel Ride</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#3C3567',
    },
    backButton: {
        padding: 8,
    },
    mapContainer: {
        flex: 2,
        backgroundColor: '#EEEEEE',
    },
    container: {
        position: 'absolute',
        bottom: 15,
        width: '92%',
        marginHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#212121',
        shadowOpacity: 1,
        shadowRadius: 50,
        elevation: 5,
    },
    carDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        padding: 10,
        width: '95%',
    },
    timeContainer: {
        alignItems: 'flex-start',
        width: 100,
    },
    durationText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#212121',
    },
    carInfoContainer: {
        marginLeft: 8,
    },
    carName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#212121',
    },
    carNumber: {
        fontSize: 14,
        color: '#737373',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
        width: '100%',
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderRightWidth: 1,
        borderRightColor: '#EEEEEE',
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#737373',
        marginTop: 4,
    },
    cancelButton: {
        borderRightWidth: 0,
    },
    image: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
        marginTop: 5,
    },
    bottomimage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});

export default Track;
