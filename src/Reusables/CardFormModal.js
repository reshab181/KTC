// Author: Ashutosh Rai
// Component: CardFormModal
import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'

const CardFormModal = () => {
     const [selectedButton, setSelectedButton] = useState('Debit');
      const [selectedMonth, setSelectedMonth] = useState('');
      const [selectedYear, setSelectedYear] = useState('');
    
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
    
      const currentYear = new Date().getFullYear();
      const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
    
    return (
        <View>
            <View style={{ marginHorizontal: 10, padding: 20 }}>
                <View>
                    <Text style={{ marginStart: 4, fontSize: 12 }}>Name</Text>
                    <TextInput
                        maxLength={40}
                        onChangeText={text => onChangeText(text)}
                        style={styles.textInput}
                        placeholder='Name On Card'
                        placeholderTextColor={'#484848'}
                    />
                </View>
                <View>
                    <Text style={{ marginTop: 27, fontSize: 12 }}>Card No.</Text>
                    <TextInput
                        maxLength={40}
                        onChangeText={text => onChangeText(text)}
                        style={styles.textInput}
                        placeholder='Card Number'
                        placeholderTextColor={'#484848'}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Expiry Date</Text>
                    <View style={styles.row}>
                        {/* Month Picker */}
                        <View style={{ width: "45%", borderBottomWidth: 1, borderBottomColor: '#000000' }}>
                            <Picker

                                selectedValue={selectedMonth}
                                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Month" value="" />
                                {months.map((month, index) => (
                                    <Picker.Item key={index} label={month} value={month} />
                                ))}
                            </Picker>
                        </View>

                        {/* Year Picker */}
                        <View style={{ width: "45%", borderBottomWidth: 1, borderBottomColor: '#000000' }}>

                            <Picker
                                selectedValue={selectedYear}
                                onValueChange={(itemValue) => setSelectedYear(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Year" value="" />
                                {years.map((year, index) => (
                                    <Picker.Item key={index} label={year.toString()} value={year} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ marginStart: 4, marginTop: 27, fontSize: 12 }}>CVV No.</Text>
                    <TextInput
                        maxLength={40}
                        onChangeText={text => onChangeText(text)}
                        style={styles.textInput}
                        placeholder='CVV Code'
                        placeholderTextColor={'#484848'}
                    />
                </View>
            </View>
        </View>
    )
}

export default CardFormModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    buttonsContainer: {
        marginTop: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    buttonWrapper: {
        marginVertical: 6,
    },
    textInput: {
        borderBottomWidth: 0.5,
    },
    label: {
        marginStart: 4,
        marginTop: 20,
        fontSize: 12,
        color: '#00000080',
    },
    row: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    picker: {
        color: "#484848",
        height: 50,
    },

})