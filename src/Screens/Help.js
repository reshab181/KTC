// Reshab Kumar Pandey
// Help.js
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    Dimensions, 
    Linking ,Image,
    StatusBar,
    useColorScheme
  } from 'react-native'
  import React from 'react'
  import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../component/CustomHeader'

  
  const { height, width } = Dimensions.get('screen')
  
  const EmailLink = ({ email }) => (

    <TouchableOpacity 
      style={styles.emailButton}
      onPress={() => Linking.openURL(`mailto:${email}?subject=Account Deactivation Request&body=Hello,\n\nI would like to request account deactivation.\n\nRegards,`)}
    >
      <Text style={styles.emailText}>{email}</Text>
    </TouchableOpacity>
  )
  
  const Help = () => {
         const colorScheme = useColorScheme();
            const isDarkMode = colorScheme === 'dark';
            
            const backgroundStyle = {
              backgroundColor: isDarkMode ? '#121212' : '#ffffff',
            };
    const navigation = useNavigation()
  
  
  
    return (
      <SafeAreaView style={styles.container}>
        
   <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={backgroundStyle.backgroundColor}
                  />
    
        <CustomHeader title={"Help"}
         leftIcon={() => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/ic_back_arrow_white_24.png')}/>
                  </TouchableOpacity>
                )}/>
        
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <Text style={styles.heading}>Account Deactivation</Text>
            
            <Text style={styles.description}>
              To deactivate your account, please contact KTC administration by email at:
            </Text>
            
            <View style={styles.emailContainer}>
              <EmailLink email="corporate@ktcindia.com" />
              <Text style={styles.orText}>or</Text>
              <EmailLink email="reservation@ktcindia.com" />
            </View>
            
            <Text style={styles.note}>
              Our team will process your request and get back to you shortly.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 24,
      width: '100%',
      maxWidth: 500,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    heading: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000',
      marginBottom: 16,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 24,
    },
    emailContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    emailButton: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      marginVertical: 8,
      width: '100%',
    },
    emailText: {
      fontSize: 16,
      color: '#3C3567',
      textAlign: 'center',
      fontWeight: '500',
    },
    orText: {
      fontSize: 14,
      color: '#666',
      marginVertical: 4,
    },
    note: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      fontStyle: 'italic',
    },
  })
  
  export default Help