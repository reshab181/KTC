// Author: Ashutosh Rai
// Component: CarSelection
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import CustomButton from '../../component/CustomButtons';
import CarCard from '../../component/CarCard';

const CarSelection = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Car Selection"
        iconPath={require('../../assets/icbackarrow.png')}
        iconHeight={24}
        iconWidth={24}
        handleLeftIcon={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cityInfoContainer}>
          <View style={styles.cityLabelContainer}>
            <Text style={styles.cityLabel}>City</Text>
          </View>
          <View style={styles.cityDetailsContainer}>
            <Text style={styles.cityName}>Delhi, NCR</Text>
            <Text style={styles.cityAddress} numberOfLines={3}>
              MapmyIndia Head Office, 237, Okhla Industrial Estate Phase 3, Near Modi Mill, New Delhi, Delhi, 110020
            </Text>
          </View>
        </View>

        <View style={styles.dateTimeContainer}>
          <View>
            <View style={styles.dateTimeRow}>
              <Text style={styles.dateTimeLabel}>Start Date:</Text>
              <Text style={styles.dateTimeValue}>12-Jan-2022</Text>
            </View>
            <View style={styles.dateTimeRow}>
              <Text style={styles.dateTimeLabel}>Start Time:</Text>
              <Text style={styles.dateTimeValue}>07:00PM</Text>
            </View>
          </View>
          <View>
            <View style={styles.dateTimeRow}>
              <Text style={styles.dateTimeLabel}>End Date:</Text>
              <Text style={styles.dateTimeValue}>14-Jan-2022</Text>
            </View>
            <View style={styles.dateTimeRow}>
              <Text style={styles.dateTimeLabel}>End Time:</Text>
              <Text style={styles.dateTimeValue}>02:00AM</Text>
            </View>
          </View>
        </View>

        <View style={styles.carCardsContainer}>
          {[...Array(4)].map((_, index) => (
            <CarCard
              key={index}
              iconPath={require('../../assets/infobtn.png')}
              imgPath={require('../../assets/cardemo.png')}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title="Continue"
          borderRadius={0}
          onPress={() => {
            navigation.navigate('BookingConfirmation');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CarSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F3',
  },
  scrollContent: {
    paddingTop: 5, 
    paddingBottom: 40, 
  },
  cityInfoContainer: {
    height: 93,
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    padding: 10,
  },
  cityLabelContainer: {
    width: 50,
    justifyContent: 'flex-start',
    padding: 5,
  },
  cityLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
  cityDetailsContainer: {
    flex: 1,
    padding: 5,
  },
  cityName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#666666',
  },
  cityAddress: {
    fontSize: 12,
    color: '#666666',
    flexWrap: 'wrap',
  },
  dateTimeContainer: {
    height: 62,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    elevation: 3,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeRow: {
    flexDirection: 'row',
  },
  dateTimeLabel: {
    fontWeight: '500',
  },
  dateTimeValue: {
    marginLeft: 5,
    color: '#333333',
  },
  carCardsContainer: {
    marginHorizontal: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
