import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const OtpInput = ({changeOtp}) => {
  const [otp, setOtp] = useState('');
  const inputs = useRef([]);

  useEffect(() => {
    if (otp.length === 6) {
      changeOtp(otp);
    } else {
      changeOtp('');
    }
  }, [otp]);

  const handleChange = (value: string, index: number) => {
    const newOtp = otp.split('');

    for (let i = 0; i < index; i++) {
      if (!newOtp[i]) {
        inputs.current[i]?.focus();
        return;
      }
    }

    newOtp[index] = value;
    setOtp(newOtp.join(''));

    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleFocus = index => {
    // Find the first empty field before the focused input
    for (let i = 0; i < index; i++) {
      if (!otp[i]) {
        inputs.current[i]?.focus();
        return;
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = otp.split('');

      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
      newOtp[index] = '';
      setOtp(newOtp.join(''));
      console.log(newOtp);
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({length: 6}).map((_, index) => (
        <TextInput
          key={index}
          style={styles.input}
          // theme={{ colors: { background: '#F1F1F3' } }}
          keyboardType="number-pad"
          maxLength={1}
          ref={ref => (inputs.current[index] = ref)}
          onChangeText={value => handleChange(value, index)}
          onFocus={() => handleFocus(index)}
          onKeyPress={({nativeEvent}) => handleKeyPress(nativeEvent, index)}
          value={otp[index] || ''}
          accessible={true}
          accessibilityLabel={`OTP Input ${index + 1}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  input: {
    width: 40,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#1C4096',
    backgroundColor: '#F1F1F3',
    textAlign: 'center',
    color: '#212121',
    fontSize: 20,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  highlightedInput: {
    borderBottomColor: '#007BFF',
  },
  lastInput: {
    borderBottomColor: '#28A745',
  },
});

export default OtpInput;
