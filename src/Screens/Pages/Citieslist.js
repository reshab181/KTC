import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import CustomHeader from '../../component/CustomHeader'
import SearchResultList from '../../component/SearchResultList'
import CustomIconTextInput from '../../component/CustomIconTextInput'

const Citieslist = ({ route }) => {
    const CityList = route.params ?? [];
    console.log('====================================');
    console.log("CityListtt", CityList?.list);
    console.log('====================================');
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <CustomHeader
                        title={"City"}
                        iconPath={require('../../assets/icbackarrow.png')}
                        iconHeight={24}
                        iconWidth={24}
                    />
                </View>
                <View style={{ marginStart: 16, marginEnd: 16, marginTop: 10 }}>
                    <CustomIconTextInput
                        placeholder={"India"}
                        icon1={require('../../assets/Search.png')}
                        icon2={require("../../assets/closee.png")}
                    />
                </View>
                <View style={{ margin: 16 }}>
                    {CityList?.list.map((city, index) => (
                        <Text key={index} style={{ color: 'black', fontSize: 16, marginVertical: 4 }}>
                            {city}
                        </Text>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Citieslist;
