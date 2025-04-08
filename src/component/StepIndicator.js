import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React from 'react'
const { height, width } = Dimensions.get('screen');
const labels = [
    'Booking Created',
    'Booking Confirmed',
    'Vehicle Assigned',
    'Arriving Soon',
    'Journey Completed'
];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#aaaa',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#3C3567',//
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#3C3567',//
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#3C3567',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#aaaa',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#3C3567',
};
const data = [
    {
        id: 1,
        label: 'Booking Created',
        statuss: 'Your Booking has been placed',
    },
    {
        id: 2,
        label: 'Booking Confirmed',
        statuss: 'Your Booking has been Confirmed',
    },
    {
        id:3,
        label: 'Vehicle Assigned',
        statuss: 'We have assign a Vehicle',
    },
    {
        id: 4,
        label: 'Arriving Soon',
        statuss: 'Happy Journey ',
    },
    {
        id: 5,
        label: 'Journey Completed',
        statuss: 'Thankyou for using this Application',
    },
];

const StepIndicator = ({activeNumber}) => {
    return (
        <>
        <View>
            <View
                style={{
                    padding: 10,
                    width: '100%',
                    backgroundColor: '#fff',
                    elevation: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: '#000',
                        fontSize: 15,
                        fontWeight: 'bold',
                    }}>
                    Tracking Summary
                </Text>
            </View>
            <View style={{
                margin: 15,
                elevation: 10,
                backgroundColor: '#fff',
                borderRadius: 10,
                paddingBottom:20
            }}>
                {data?.map((list, index) => {
                    return (
                        <View style={{
                            flexDirection: 'row',
                            margin: 20,
                        }}>
                            <View style={{
                                width: 30,
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 44 / 2,
                                backgroundColor: activeNumber >= list?.id ? '#3C3567': '#909090',
                                margin: 10,
                                top: 0,
                                left: 0,
                                position:'relative',
                            }}>
                                <Text style={{
                                    color: activeNumber >= list?.id ? '#fff' : '#000',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}>{index + 1}</Text>
                            </View>
                            {data.length -1 != index && 
                            <View style={{
                                height: '126%',
                                width: 2,
                                backgroundColor: activeNumber -1 >= list?.id ?'#3C3567':'#909090',
                                position: 'absolute',
                                top: 40,
                                left:25
                            }} />
                            }
                            <View 
                             style={{
                                paddingLeft:10,
                                marginTop:10
                             }}
                            >
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}>
                                {list?.label}
                            </Text>
                            {activeNumber >= list?.id && (
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 12,
                                    marginTop:5
                                }}>
                                {list?.statuss}
                            </Text>
                            )}
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
        </>
    )
}

export default StepIndicator

const styles = StyleSheet.create({})