import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import CustomHeader from '../../ReusableBtn/CustomHeader';

const { height, width } = Dimensions.get('screen');

const Track = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
       <Image source={require('../../Assets/ic_back_arrow_white_24.png')}  />
        </TouchableOpacity>
   <CustomHeader title={"Track Chauffeur"}/>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Booking Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vehicle Number: KA-01-AB-1234</Text>
          <Text style={styles.cardText}>Booking ID: BKG123456</Text>
          <Text style={styles.cardText}>Status: Active</Text>
          <Text style={styles.cardText}>Pickup: Indiranagar, Bangalore</Text>
          <Text style={styles.cardText}>Drop: MG Road, Bangalore</Text>
        </View>

        {/* Feedback Section */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>Feedback</Text>
          <Text style={styles.feedbackText}>Feedback 1: Great service!</Text>
          <Text style={styles.feedbackText}>Feedback 2: Vehicle arrived on time.</Text>
          <Text style={styles.feedbackText}>Feedback 3: Smooth ride experience.</Text>
        </View>

        {/* Track Button */}
        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackButtonText}>Track Vehicle</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Track;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#3C3567',
    elevation: 3,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    // backgroundColor: '#005BBB',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  feedbackContainer: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    elevation: 3,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007AFF',
  },
  feedbackText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  trackButton: {
    marginTop: 24,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  trackButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
