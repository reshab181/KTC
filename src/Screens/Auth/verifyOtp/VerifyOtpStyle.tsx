import { StyleSheet, useWindowDimensions } from "react-native";

// const { width: winwidth, height: winheight } = useWindowDimensions();

const verifyOtpStyle = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F1F1F3',
        alignItems: 'center',
      },
      img: {
        marginTop: 47,
        marginBottom: 32,
        width: 122.1,
      },
      txt: {
        width: '80%',
        marginBottom: 32,
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'normal',
        color: '#212121',
        opacity: 0.87,
        fontWeight: '600',
      },
      txtInputBox: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 32,
      },
      otpInput: {
        width: 40,
        height: 40,
        fontSize: 20,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#1C4096',
        backgroundColor: '#F1F1F3',
        color: '#000',
      },
      errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
      },
      btn: {
        width: '90%',
      },
      footerText: {
        marginTop: 110,
        fontSize: 15,
        color: '#212121',
      },
      footerText2: {
        marginTop: 10,
        fontSize: 14,
        textAlign: 'center',
        color: '#212121',
        opacity: 0.54,
      },
    }
);

export default verifyOtpStyle;