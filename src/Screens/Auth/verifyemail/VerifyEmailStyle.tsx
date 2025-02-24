import { StyleSheet } from "react-native";


const verifyEmailStyle = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.9)',
    },
    modalContainer: {
      width: '92.7%',
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    formContainer: {},
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#3C3567',
      padding: 15,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    headerText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
    instruction: {
      fontSize: 16,
      color: '#212121',
      marginBottom: 10,
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 5,
    },
  });

  export default verifyEmailStyle;