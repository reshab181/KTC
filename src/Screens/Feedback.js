import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native';

import { FeedbackApi, submitFeedback } from '../services/api/feedback';
import { decryptData } from '../Utils/EncryptionUtility';
import CustomHeader from '../component/CustomHeader';

const FeedbackScreen = ({ route, navigation }) => {
  const { Booking } = route?.params || {};

  const [feedbackFormData, setFeedbackFormData] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [bookingId, setBookingId] = useState(Booking || '');
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const loadFeedbackForm = async () => {
      try {
        const response = await FeedbackApi();
        console.log('Fetched Feedback Form:', response);

        const labels = decryptData(response?.data?.label);
        console.log('Decrypted Labels:', labels);

        if (Array.isArray(labels)) {
          const structuredLabels = labels.map((label, index) => ({
            id: index + 1,
            value: label,
          }));
          setFeedbackFormData(structuredLabels);
        } else {
          console.warn('Labels data is not an array:', labels);
        }
      } catch (error) {
        console.error('Error fetching feedback form:', error);
        Alert.alert('Error', 'Failed to load feedback options.');
      }
    };

    loadFeedbackForm();
  }, []);

  const handleAnswerChange = (labelId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [labelId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!bookingId) {
      Alert.alert('Validation', 'Please enter a valid Booking ID.');
      return;
    }
  
    const selectedLabels = feedbackFormData
      .map((item) => ({
        id: item.id,
        value: item.value,
        answer: answers[item.id],
      }))
      .filter((item) => item.answer);
  
    if (selectedLabels.length === 0) {
      Alert.alert('Validation', 'Please answer at least one feedback question.');
      return;
    }
  
    try {
      const response = await submitFeedback({
        remarks,
        booking_id: Booking,
        label: selectedLabels,
      });
  
      console.log('Feedback Submitted:', response);
      
    
      Alert.alert(
        'Success', 
        'Feedback submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate("Upcoming")
          }
        ]
      );
      
      setRemarks('');
      setAnswers({});
    } catch (error) {
      console.error('Submission Error:', error);
      Alert.alert('Error', 'Failed to submit feedback.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title={'Feedback'}
        leftIcon={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/ic_back_arrow_white_24.png')} />
          </TouchableOpacity>
        )}
      />
      
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Enter Booking ID"
            value={Booking}
            onChangeText={setBookingId}
            style={styles.input}
            editable={false}
          />

          <TextInput
            placeholder="Enter Remarks (Optional)"
            value={remarks}
            onChangeText={setRemarks}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={styles.remarkInput}
          />

          <Text style={styles.sectionTitle}>Please answer the following questions:</Text>

          <FlatList
            data={feedbackFormData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const selectedAnswer = answers[item.id];
              return (
                <View style={styles.radioGroup}>
                  <Text style={styles.radioQuestion}>{item.value}</Text>

                  <View style={styles.radioRow}>
                    <TouchableOpacity
                      style={[
                        styles.radioOption,
                        selectedAnswer === 'Yes' && styles.selectedRadio,
                      ]}
                      onPress={() => handleAnswerChange(item.id, 'Yes')}
                    >
                      <Text
                        style={[
                          styles.radioText,
                          selectedAnswer === 'Yes' && styles.selectedRadioText,
                        ]}
                      >
                        Yes
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.radioOption,
                        selectedAnswer === 'No' && styles.selectedRadio,
                      ]}
                      onPress={() => handleAnswerChange(item.id, 'No')}
                    >
                      <Text
                        style={[
                          styles.radioText,
                          selectedAnswer === 'No' && styles.selectedRadioText,
                        ]}
                      >
                        No
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            style={styles.listContainer}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>SUBMIT FEEDBACK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    marginTop: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  remarkInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
    fontSize: 16,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listContainer: {
    marginTop: 8,
  },
  radioGroup: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  radioQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 6,
  },
  radioOption: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#eee',
    minWidth: 100,
    alignItems: 'center',
  },
  selectedRadio: {
    backgroundColor: '#3C3567',
  },
  radioText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  selectedRadioText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#3C3567',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default FeedbackScreen;