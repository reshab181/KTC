//**Author---Reshab Kumar Pandey
// Component--- Upcoming.js */




import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Text, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../Reusables/CustomHeader';

const Upcoming = ({navigation}) => {
  const upcomingData = [
    {
      guestName: 'Santosh Jha',
      vehicleRequested: 'Mercedes Benz CLS',
      startDate: '2025-01-20',
      Email: 'santosh@ktc.com',
    },
    {
      guestName: 'Santosh Jha',
      vehicleRequested: 'Mercedes Benz CLS',
      startDate: '2025-01-20',
      Email: 'santosh@ktc.com',
    },
  ];

  const historyData = [
    {
      guestName: 'Rahul Mehta',
      vehicleRequested: 'Audi A6',
      startDate: '2024-12-15',
      Email: 'rahul@ktc.com',
    },
    {
      guestName: 'Priya Sharma',
      vehicleRequested: 'BMW X5',
      startDate: '2024-11-10',
      Email: 'priya@ktc.com',
    },
  ];

  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const [list, setList] = useState(upcomingData);
  const [reject, setReject] = useState('');
  const [modalVisible, setModalVisible] = useState({ isVisible: false, values: {} });

  const onPressTrack = (item) => {
    // Track booking logic
  };

  const handleCancelBooking = () => {
    const updatedList = list.map((booking) =>
      booking.bookingId === modalVisible.values.bookingId
        ? { ...booking, status: 'Cancelled' }
        : booking
    );
    setList(updatedList);
    setModalVisible({ isVisible: false });
  };

  const renderList = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.rowContainer}>
          <Image source={require('../../Assets/cardemo.png')} style={styles.image} />

          {/* Divider Line */}
          <View style={styles.divider} />

          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.guestName}</Text>
            <Text style={styles.detail}>{item.vehicleRequested}</Text>
            <Text>{'Booking on: ' + item.startDate}</Text>
            <Text>{'Email: ' + item.Email}</Text>

            <View style={styles.actionContainer}>
              {index === 1 ? (
                <>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible({ isVisible: true, values: item })}
                  >
                    <Text style={styles.cancelText}>Cancel Booking</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => setModalVisible({ isVisible: true, values: item })}
                  >
                    <Image source={require('../../Assets/RightArrow.png')} style={styles.arrowIcon} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.trackButton}
                    onPress={() => onPressTrack(item)}
                  >
                    <Text style={styles.trackText}>Track Chauffeur</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => onPressTrack(item)}
                  >
                    <Image source={require('../../Assets/RightArrow.png')} style={styles.arrowIcon} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onTabPress = (tab) => {
    setSelectedTab(tab);
    setList(tab === 'Upcoming' ? upcomingData : historyData);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader iconPath={require('../../Assets/ic_back_arrow_white_24.png')}
        title={"My Booking"}
        iconHeight={24}
        iconWidth={24}
      />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Upcoming' && styles.activeTab]}
          onPress={() => onTabPress('Upcoming')}
        >
          <Text style={[styles.tabText, selectedTab === 'Upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'History' && styles.activeTab]}
          onPress={() => onTabPress('History')}
        >
          <Text style={[styles.tabText, selectedTab === 'History' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.isVisible}
        onRequestClose={() => {
          setModalVisible({ isVisible: false });
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible({ isVisible: false })}>
              <Icon name="close" style={styles.closeIcon} />
            </TouchableOpacity>

            <TextInput
              value={reject}
              onChangeText={setReject}
              style={styles.inputField}
              placeholder="Enter Reason for Cancellation"
            />
            <TouchableOpacity
              onPress={handleCancelBooking}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmText}>Cancel Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderList}
        ListEmptyComponent={<Text style={styles.emptyText}>No bookings available</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3C3567',
    padding: 10,
  },
  backButton: {
    marginRight: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3C3567',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600'
  },
  activeTabText: {
    color: '#3C3567',
    fontWeight: 'bold',
  },
  card: {
    width: '92%',
    height: 190,
    backgroundColor: '#fff',
    marginVertical: 16,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150, 
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  divider: {
    width: 1,
    backgroundColor: '#ddd',
    height: '100%',
    marginHorizontal: 14,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: '#212121',
    marginBottom: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#3C3567',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  cancelText: {
    color: '#fff',
    fontWeight: '500',
  },
  trackButton: {
    backgroundColor: '#3C3567',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 5,
  },
  trackText: {
    color: '#fff',
    fontWeight: '500',
  },
  arrowButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  inputField: {
    height: 30,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: '#ff5722',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 24,
    color: '#000',
  },
});

export default Upcoming;
