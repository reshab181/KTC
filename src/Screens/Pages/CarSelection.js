import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../ReusableBtn/CustomHeader'
import CustomButton from '../../ReusableBtn/CustomButtons'
import CarCard from '../../ReusableBtn/CarCard'
import { ScrollView } from 'react-native-gesture-handler'

const CarSelection = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F1F1F3' }}>
            <ScrollView >
                <View style={{ flex: 1, backgroundColor: '#F1F1F3' }}>
                    <CustomHeader title={"Car Selection"} iconPath={require('../../Assets/icbackarrow.png')} iconHeight={24} iconWidth={24} />
                    <View
                        style={{
                            height: 93,
                            backgroundColor: "#FFFFFF",
                            margin: 16,
                            borderRadius: 4,
                            elevation: 3,
                            flexDirection: "row",
                            padding: 10,
                        }}
                    >
                        <View style={{ padding: 5, width: 50, justifyContent: "flex-start" }}>
                            <Text style={{ fontWeight: "600", fontSize: 14 }}>City</Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                padding: 5,
                            }}
                        >
                            <Text style={{ fontSize: 14, fontWeight: "500", marginBottom: 4, color: "#666666" }}>
                                Delhi, NCR
                            </Text>
                            <Text
                                style={{
                                    flexWrap: 'wrap',
                                    fontSize: 12,
                                    color: "#666666",
                                }}
                                numberOfLines={3} // Adjust the number of lines to limit text overflow
                            // ellipsizeMode="tail" // Adds "..." if text overflows
                            >
                                MapmyIndia Head Office, 237, Okhla Industrial Estate Phase 3, Near Modi Mill,
                                New Delhi, Delhi, 110020
                            </Text>
                        </View>

                    </View>
                    <View style={{ height: 62, backgroundColor: '#FFFFFF', borderRadius: 4, elevation: 3, margin: 16, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Start Date : </Text>
                                <Text>12-Jan-2022</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Start Time : </Text>
                                <Text>07:00PM</Text>
                            </View>

                        </View>
                        <View style={{ justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>End Date : </Text>
                                <Text>14-Jan-2022</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>End Time : </Text>
                                <Text>02:00AM</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 16 }}>
                        <CarCard iconPath={require('../../Assets/infobtn.png')} imgPath={require('../../Assets/cardemo.png')} />
                        <CarCard iconPath={require('../../Assets/infobtn.png')} imgPath={require('../../Assets/cardemo.png')} />
                        <CarCard iconPath={require('../../Assets/infobtn.png')} imgPath={require('../../Assets/cardemo.png')} />
                        <CarCard iconPath={require('../../Assets/infobtn.png')} imgPath={require('../../Assets/cardemo.png')} />
                    </View>
                </View>
            </ScrollView>
            <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                <CustomButton title={"Continue"} borderRadius={0} />
            </View>
        </SafeAreaView>


    )
}

export default CarSelection

const styles = StyleSheet.create({})