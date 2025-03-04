//**Author---Reshab Kumar Pandey
// Component--- Upcoming.js */




import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Text, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../../component/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decryptData, encryptPayload } from '../../Api/Authentication';
import { fetchHistoryBookings, fetchUpcomingBookings } from '../../Api/CorporateModuleApis';
import { fetchJwtAccess } from '../../Utils/JwtHelper';

const Upcoming = ({ navigation }) => {
  // const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [page, setPage] = useState(1);
  const [pageLimit] = useState(10); 
  const [history, sethistory] = useState({})
  const [upcoming, setupcoming] = useState({})
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const [reject, setReject] = useState('');
  const [modalVisible, setModalVisible] = useState({ isVisible: false, values: {} });
  
  const upcomingData = [{
    Guestname: "Ashutosh Raiii ",
    vehiclerequested: "BMW",
    start_date: "-62170003800",
    booking_id: "81238173297",
    Reportingplace: "ASHDKHAS dkKSH D",
    Reporingtime: "12:00"
  },
  ];
const [list, setList] = useState(upcomingData);
  useEffect(() => {
    const getAccessToken = async () => {
      const token = await fetchJwtAccess();
      if (token) setAccessToken(token);

    };
    const fetchData = async () => {
      const bookings = await fetchHistoryBookings(page, pageLimit);
      if (bookings) {
        sethistory([...bookings])
      }
      const upcomingList = await fetchUpcomingBookings(page, pageLimit);
      if (upcomingList) {
        setupcoming([...upcomingList])
        setList([...upcomingList])
      }
    };
    getAccessToken();
    fetchData();
  }, [page]);

  // const onShowDetails = (item, index) => {
  //   navigation.navigate(SCREENS.TRACK, { item: item, index: index, pageName: 'HIS', accessToken, status: item?.feedback, feedback_arr: item?.feedback_arr });
  //   console.warn("History------------------", item?.feedback)
  // };


  const historyData = history;



  const onPressTrack = (item) => {
    // Track booking logic
  };

  const showDetails =(item)=>{
    // show detail logics
  }

  const handleCancelBooking = () => {
    // const updatedList = list.map((booking) =>
    //   booking.bookingId === modalVisible.values.bookingId
    //     ? { ...booking, status: 'Cancelled' }
    //     : booking
    // );
    // setList(updatedList);
    // setModalVisible({ isVisible: false });
  };

  const renderhistoryList = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.rowContainer}>
          <Image source={require('../../assets/cardemo.png')} style={styles.image} />

          <View style={styles.divider} />

          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.Guestname}</Text>
            <Text style={styles.detail}>{item.vehiclerequested}</Text>
            <Text style={styles.detail}>{'Booked on: ' + new Date(item.start_date * 1000).toLocaleDateString()}</Text>
            <Text style={styles.detail}>{'Booking Id: ' + item.booking_id}</Text>
            <Text style={styles.detail}>{'Landmark : ' +
              item.Reportingplace.substring(0, 17) + "..."}</Text>
            <Text style={styles.detail}>{'Reporting Time: ' + item.Reporingtime}</Text>
            <View style={styles.actionContainer}>
              <>
                <TouchableOpacity
                  style={styles.trackButton}
                  onPress={() => showDetails(item)}
                >
                  <Text style={styles.trackText}>Show Details</Text>
                </TouchableOpacity>
              </>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderUpcoming = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.rowContainer}>
          <Image source={require('../../assets/cardemo.png')} style={styles.image} />

          <View style={styles.divider} />

          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.Guestname}</Text>
            <Text style={styles.detail}>{item.vehiclerequested}</Text>
            <Text style={styles.detail}>{'Booked on: ' + new Date(item.start_date * 1000).toLocaleDateString()}</Text>
            <Text style={styles.detail}>{'Booking Id: ' + item.booking_id}</Text>
            <Text style={styles.detail}>{'Landmark : ' +
              item.Reportingplace.substring(0, 14) + "..."}</Text>
            <Text style={styles.detail}>{'Reporting Time: ' + item.Reporingtime}</Text>
            <View style={styles.actionContainer}>
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
                  <Image source={require('../../assets/RightArrow.png')} style={styles.arrowIcon} />
                </TouchableOpacity>
              </>
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
    <CustomHeader
        title="Bookings"
        leftIcon={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/ic_back_arrow_white_24.png')}/>
          </TouchableOpacity>
        )}
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
        renderItem={selectedTab === 'Upcoming' ? renderUpcoming : renderhistoryList}
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
    height: 180,
    backgroundColor: '#fff',
    marginVertical: 16,
    marginHorizontal: 16,
    // padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: 150,
    // margin: 10 ,
  },
  image: {
    width: 150,
    // height: 150,
    resizeMode: 'contain',
  },
  divider: {
    width: 1,
    backgroundColor: '#ddd',
    height: '100%',
    marginHorizontal: 7
  },
  textContainer: {
    marginLeft: 7,
    flex: 1,
    marginTop: 10,
    // marginTop: 10 , 
  },
  name: {
    fontSize: 14,
    color: "black",
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  detail: {
    fontSize: 12,
    color: '#212121',
    marginBottom: 1,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
    // paddingVertical: 8,
    // paddingHorizontal: 8,
    marginLeft: 10
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
