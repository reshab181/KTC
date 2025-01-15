import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import CustomHeader from '../../ReusableBtn/CustomHeader';
import PaymentCustomButton from '../../ReusableBtn/PaymentCustomButton';
import CustomButton from '../../ReusableBtn/CustomButtons';
import CardFormModal from '../../ReusableBtn/CardFormModal';
import WalletnUpi from '../../ReusableBtn/WalletnUpi';
import CustomModal from '../../ReusableBtn/CustomModals';

const PaymentMethod = () => {
  const [selectedButton, setSelectedButton] = useState('Debit');
  const [visible, setvisible] = useState(false);


  const paymentMethods = [
    {
      title: 'Debit',
      activeImg: require('../../Assets/credit_cardi.png'),
      inactiveImg: require('../../Assets/DebitCardi.png'),
    },
    {
      title: 'Credit',
      activeImg: require('../../Assets/credit_cardi.png'),
      inactiveImg: require('../../Assets/DebitCardi.png'),
    },
    {
      title: 'Net Banking',
      activeImg: require('../../Assets/net-Bankingi.png'),
      inactiveImg: require('../../Assets/net-Bankingi.png'),
    },
    {
      title: 'Wallets & UPI',
      activeImg: require('../../Assets/accountbalancewalletwhite.png'),
      inactiveImg: require('../../Assets/Wallett&upii.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <CustomHeader
          title="Payment"
          iconPath={require('../../Assets/icbackarrow.png')}
          iconHeight={24}
          iconWidth={24}
        />

        <View style={styles.buttonsContainer}>
          {paymentMethods.map((method) => (
            <PaymentCustomButton
              key={method.title}
              title={method.title}
              imgpath={selectedButton === method.title ? method.activeImg : method.inactiveImg}
              widthSize={158}
              fontWeight="normal"
              textSize={12}
              isSelected={selectedButton === method.title}
              onPress={() => setSelectedButton(method.title)}
            />
          ))}
        </View>

        {['Debit', 'Credit', 'Net Banking'].includes(selectedButton) ? (
          <CardFormModal />
        ) : (
          <View style={{ marginHorizontal: 16 }}>
            <WalletnUpi />
          </View>
        )}
      </ScrollView>

      <CustomButton title="Pay ₹20,402" borderRadius={0} onPress={()=>setvisible(!visible)} />
      {
        visible ? <>
          <View>
            <CustomModal onClose={() => setvisible(!visible)}
              message1={"Your Payment has been Successfull"}
              message2={"The vehicle details will be shared shortly"}
              isButtonVisible={false}
            />
          </View>
        </> : null
      }
    </SafeAreaView>
  );
};

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
});

export default PaymentMethod;
