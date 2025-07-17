

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import PaymentCustomButton from '../../component/PaymentCustomButton';
import CustomButton from '../../component/CustomButtons';
import CardFormModal from '../../component/CardFormModal';
import WalletnUpi from '../../component/WalletnUpi';
import CustomModal from '../../component/CustomModals';

const PaymentMethod = ({navigation}) => {
  const [selectedButton, setSelectedButton] = useState('Debit');
  const [visible, setvisible] = useState(false);


  const paymentMethods = [
    {
      title: 'Debit',
      activeImg: require('../../assets/credit_cardi.png'),
      inactiveImg: require('../../assets/DebitCardi.png'),
    },
    {
      title: 'Credit',
      activeImg: require('../../assets/credit_cardi.png'),
      inactiveImg: require('../../assets/DebitCardi.png'),
    },
    {
      title: 'Net Banking',
      activeImg: require('../../assets/net-Bankingi.png'),
      inactiveImg: require('../../assets/net-Bankingi.png'),
    },
    {
      title: 'Wallets & UPI',
      activeImg: require('../../assets/accountbalancewalletwhite.png'),
      inactiveImg: require('../../assets/Wallett&upii.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CustomHeader
          title="Payment"
          iconPath={require('../../assets/icbackarrow.png')}
          iconHeight={24}
          iconWidth={24}
          handleLeftIcon={()=>{navigation.goBack()}}
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

      <CustomButton title="Pay ₹20,402" borderRadius={0} 
        onPress={()=>{
          setvisible(true)
          setTimeout(() => {
            setvisible(false)
            navigation.navigate('MyBooking')            
          }, 2000);
          }
          } />
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
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16
  },
});

export default PaymentMethod;
