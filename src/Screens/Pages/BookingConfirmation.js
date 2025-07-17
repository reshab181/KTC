

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CarCard from '../../component/CarCard';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInpt from '../../component/CustomTextInpt';
import CustomDropdown from '../../component/CustomDropdown';
import CustomButton from '../../component/CustomButtons';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Characters } from '../../constants/Strings';
import { SafeAreaView } from 'react-native';
import CustomModal from '../../component/CustomModals';

const BookingConfirmation = ({ navigation }) => {
  const [check1, setCheck1] = useState(false);
  const [checked, setChecked] = useState(false);
  const [visible, setvisible] = useState(false);
  const [selectPaymentMethod, setSelectPaymentMethod] = useState('');
  const [checkTA, setCheckTA] = useState(false);

  const cityData = [
    { label: 'New York', value: 'ny' },
    { label: 'Los Angeles', value: 'la' },
    { label: 'Chicago', value: 'chi' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <CustomHeader
        title="Booking Confirmation"
        iconPath={require('../../assets/icbackarrow.png')}
        iconHeight={24}
        iconWidth={24}
        handleLeftIcon={() => navigation.goBack()}
      />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardContainer}>
          <CarCard
            iconPath={require('../../assets/infobtn.png')}
            isSaved={true}
            height={146}
            imgPath={require('../../assets/cardemo.png')}
          />
          <View style={styles.textContainer}>
            <Text style={styles.carDetailsText}>{Characters.bct1}</Text>
          </View>

          <View style={styles.rowStyle}>
            <View style={styles.radioContainer}>
              {[Characters.cash, Characters.credit].map((item) => (
                <View key={item} style={styles.radioOption}>
                  <RadioButton
                    value={item.toLowerCase()}
                    status={selectPaymentMethod === item.toLowerCase() ? 'checked' : 'unchecked'}
                    onPress={() => setSelectPaymentMethod(item.toLowerCase())}
                    uncheckedColor="#737373"
                  />
                  <Text style={styles.radioText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <CustomTextInpt placeholder="Flight" />
        </View>

        <View>
          <View style={styles.rentalHeader}>
            <Text style={styles.rentalText}>Rental Amount: ₹20,402</Text>
            <TouchableOpacity onPress={() => setCheck1(!check1)} style={styles.expandIcon}>
              <Icon name={check1 ? 'chevron-down' : 'chevron-up'} size={16} />
            </TouchableOpacity>
          </View>

          {check1 && (
            <View style={styles.summaryContainer}>
              <Text style={styles.orderSummaryText}>My Order Summary</Text>
              {['Basic Rental', 'Sub Total', 'GST(12%)', 'Total Amount'].map((label, index) => {
                const values = ['₹18,645', '₹18,645', '₹1,757', '₹20,402'];
                return (
                  <View key={index} style={styles.summaryRow}>
                    <Text>{label}</Text>
                    <Text>{values[index]}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={() => setCheckTA(!checkTA)}>
            <Icon name={checkTA ? 'check-square' : 'square-o'} size={24} color="#4B713D" />
          </TouchableOpacity>
          <Text style={styles.termsText}>
            {Characters.tnA} <Text style={styles.termsLink}>{Characters.tnC}</Text>
          </Text>
        </View>

        {visible && (
          <View>
            <CustomModal
              onClose={() => setvisible(!visible)}
              message1="Your Payment has been Successful"
              message2="The vehicle details will be shared shortly"
              isButtonVisible={false}
            />
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <CustomButton title="Proceed" borderRadius={0} onPress={() => navigation.navigate('Payment')} />
      </View>
    </SafeAreaView>
  );
};

export default BookingConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F3',
  },
  scrollContent: {
    paddingTop: 10, 
    paddingBottom: 70, 
  },
  cardContainer: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  textContainer: {
    width: 300,
    marginTop: 10,
    marginBottom: 4,
  },
  carDetailsText: {
    fontSize: 12,
    color: '#737373',
  },
  rowStyle: {
    backgroundColor: '#FFFFFF',
    height: 48,
    width: '100%',
    marginTop: 10,
    borderRadius: 4,
    elevation: 1,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  radioText: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 5,
  },
  rentalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    height: 48,
    marginHorizontal: 16,
    marginTop: 16,
  },
  rentalText: {
    paddingLeft: 20,
    paddingTop: 15,
  },
  expandIcon: {
    marginRight: 16,
    marginTop: 16,
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 1,
    elevation: 3,
  },
  orderSummaryText: {
    padding: 16,
    color: '#212121',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 5,
  },
  summaryRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginTop: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginStart: 20,
  },
  termsText: {
    flexDirection: 'row',
    marginStart: 10,
  },
  termsLink: {
    fontSize: 14,
    color: '#3C3567',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
