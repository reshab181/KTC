// Reshabh
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { RadioButton, TextInput } from 'react-native-paper'
import CustomHeader from '../component/CustomHeader'

const { height, width } = Dimensions.get('screen')

const Feedback = () => {
  // Sample data for demonstration
  const feedbackItems = [
    { label: "Was the driver on time?", id: 1 },
    { label: "Was the vehicle clean?", id: 2 },
    { label: "Was the driver professional?", id: 3 },
    { label: "Did you feel safe during the ride?", id: 4 }
  ]

  const BackButtonHeader = () => (
    <View style={styles.header}>
      <CustomHeader title={"Feedback"}/>
    </View>
  )

  const FeedbackItem = ({ item }) => (
    <View style={styles.feedbackItem}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{item.label}</Text>
      </View>
      <View style={styles.radioContainer}>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value="Yes"
            status="unchecked"
            color="#3C3567"
          />
          <Text style={styles.radioText}>Yes</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton.Android
            value="No"
            status="unchecked"
            color="#3C3567"
          />
          <Text style={styles.radioText}>No</Text>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <BackButtonHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {feedbackItems.map((item) => (
          <FeedbackItem key={item.id} item={item} />
        ))}
        
        <View style={styles.remarkContainer}>
          <TextInput
            placeholder="Other remarks"
            placeholderTextColor="grey"
            style={styles.remarkInput}
            multiline
          />
        </View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  feedbackItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: height / 12,
  },
  questionContainer: {
    width: '50%',
  },
  questionText: {
    fontSize: 13,
    color: '#000',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  radioText: {
    marginLeft: 5,
    color: '#000',
    fontSize: 12,
  },
  remarkContainer: {
    width: '90%',
    marginHorizontal: 20,
    marginVertical: 30,
  },
  remarkInput: {
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    color: '#000',
    backgroundColor: '#fff',
    height: 200,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#3C3567',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
})

export default Feedback