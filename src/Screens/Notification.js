// Reshabh
import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { Card } from 'react-native-paper';
import CustomHeader from '../component/CustomHeader';

const { height, width } = Dimensions.get('screen');

const Notification = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title={'Notifications'}
          iconPath={require('../assets/ic_back_arrow_white_24.png')}
          iconHeight={24}
          iconWidth={24}
      onMenuPress ={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Notification 1 */}
        <Card style={styles.cardStyle}>
          <View style={styles.cardContent}>
            <View style={styles.flex1}>
              <View style={styles.flexDirectionRow}>
                <Image source={require('../assets/info1.png')} style={styles.icon} />
                <Text style={styles.textColor}>Duty Rejection By Admin</Text>
              </View>
              <Text style={styles.rejectionText}>Your Booking Request is rejected by the Admin</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Image source={require('../assets/calendar.png')} style={styles.icon} />
            <Text style={styles.footerText}>09-AUG-2022</Text>
            <Image source={require('../assets/watch.png')} style={styles.icon} />
            <Text style={styles.footerText}>01:30 AM</Text>
          </View>
        </Card>

        {/* Notification 2 */}
        <Card style={[styles.cardStyle, styles.cardAlternate]}>
          <View style={styles.cardContent}>
            <View style={styles.flex1}>
              <View style={styles.flexDirectionRow}>
                <Image source={require('../assets/info1.png')} style={styles.icon} />
                <Text style={styles.textColor}>Booking Confirmation By KTC</Text>
              </View>
              <Text style={styles.confirmationText}>
                Your Booking is confirmed. You will get the ride details before the Trip timings
              </Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Image source={require('../assets/calendar.png')} style={styles.icon} />
            <Text style={styles.footerText}>09-AUG-2022</Text>
            <Image source={require('../assets/watch.png')} style={styles.icon} />
            <Text style={styles.footerText}>01:30 AM</Text>
          </View>
        </Card>

        {/* Notification 3 */}
        <Card style={styles.cardStyle}>
          <View style={styles.cardContent}>
            <View style={styles.flex1}>
              <View style={styles.flexDirectionRow}>
                <Image source={require('../assets/info1.png')} style={styles.icon} />
                <Text style={styles.textColor}>Booking Rejected By KTC</Text>
              </View>
              <Text style={styles.rejectionText}>Apologies! No ride is available currently</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Image source={require('../assets/calendar.png')} style={styles.icon} />
            <Text style={styles.footerText}>09-AUG-2022</Text>
            <Image source={require('../assets/watch.png')} style={styles.icon} />
            <Text style={styles.footerText}>01:30 AM</Text>
          </View>
        </Card>

        {/* Notification 4 */}
        <Card style={[styles.cardStyle, styles.cardAlternate]}>
          <View style={styles.cardContent}>
            <View style={styles.flex1}>
              <View style={styles.flexDirectionRow}>
                <Image source={require('../assets/info1.png')} style={styles.icon} />
                <Text style={[styles.textColor, styles.greenText]}>Booking Details</Text>
              </View>
              <Text style={styles.detailsText}>Thanks for choosing KTC!</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Image source={require('../assets/360.png')} style={styles.icon} />
            <Text style={styles.detailText}>Your reference no. is xxxxx</Text>
          </View>
          <View style={styles.detailRow}>
            <Image source={require('../assets/car-1.png')} style={styles.icon} />
            <Text style={styles.detailText}>Mercedes xxxx</Text>
          </View>
          <View style={styles.detailRow}>
            <Image source={require('../assets/driver.png')} style={styles.icon} />
            <Text style={styles.detailText}>Dambar</Text>
          </View>
          <View style={styles.detailRow}>
            <Image source={require('../assets/cal.png')} style={styles.icon} />
            <Text style={styles.detailText}>9835000000</Text>
          </View>
          <View style={styles.cardFooter}>
            <Image source={require('../assets/calendar.png')} style={styles.icon} />
            <Text style={styles.footerText}>09-AUG-2022</Text>
            <Image source={require('../assets/watch.png')} style={styles.icon} />
            <Text style={styles.footerText}>01:30 AM</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: 90,
    flexGrow: 1
  },
  cardStyle: {
    borderRadius: 7,
    margin: 18,
    paddingBottom: 9,
    backgroundColor: '#fff',
  },
  cardAlternate: {
    backgroundColor: '#D5D6D8',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 10,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  textColor: {
    color: '#851515',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 15,
    marginTop: 5,
  },
  greenText: {
    color: '#147711',
  },
  flex1: {
    flex: 1,
  },
  rejectionText: {
    color: '#ff4d4d',
    fontSize: 11,
    marginLeft: width / 9,
    marginTop: 6,
  },
  confirmationText: {
    color: 'green',
    fontSize: 11,
    marginLeft: width / 9,
    marginTop: 6,
    fontWeight: '500',
  },
  detailsText: {
    color: '#147711',
    fontSize: 11,
    marginLeft: width / 9,
    marginTop: 6,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
    alignItems: 'center',
  },
  icon: {
    width: width / 15,
    height: height / 34,
    marginRight: 10,
  },
  footerText: {
    color: '#000',
    fontSize: 15,
    marginRight: 20,
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  detailText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
});
