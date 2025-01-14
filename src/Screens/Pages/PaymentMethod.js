import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../ReusableBtn/CustomHeader';
import PaymentCustomButton from '../../ReusableBtn/PaymentCustomButton.js';

const PaymentMethod = () => {
  const [selectedButton, setSelectedButton] = useState('Debit'); // Initial selected button

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F1F1F3' }}>
      <ScrollView>
        <View>
          <CustomHeader title="Payment" iconPath={require('../../Assets/icbackarrow.png')} iconHeight={24} iconWidth={24} />
          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <View>
                <PaymentCustomButton
                  title="Debit"
                  widthSize={158}
                  fontWeight="normal"
                  textSize={12}
                  isSelected={selectedButton === 'Debit'}
                  onPress={() => handleButtonPress('Debit')} // Change state on click
                />
              </View>
              <View>
                <PaymentCustomButton
                  title="Credit"
                  widthSize={158}
                  fontWeight="normal"
                  textSize={12}
                  isSelected={selectedButton === 'Credit'}
                  onPress={() => handleButtonPress('Credit')}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 12 }}>
              <View>
                <PaymentCustomButton
                  title="Net Banking"
                  widthSize={158}
                  fontWeight="normal"
                  textSize={12}
                  isSelected={selectedButton === 'Net Banking'}
                  onPress={() => handleButtonPress('Net Banking')}
                />
              </View>
              <View>
                <PaymentCustomButton
                  title="Wallets & UPI"
                  widthSize={158}
                  fontWeight="normal"
                  textSize={12}
                  isSelected={selectedButton === 'Wallets & UPI'}
                  onPress={() => handleButtonPress('Wallets & UPI')}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentMethod;
