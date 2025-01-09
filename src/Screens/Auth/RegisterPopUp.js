import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';

const { height } = Dimensions.get('screen');

const RegisterPOPUP = () => {
  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          backgroundColor: '#F5F5F5',
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 10,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <Formik
          initialValues={{ email: '' }}
          validateOnBlur={false}
          validateOnChange={false}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (!emailRegex.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values) => {
            // Handle form submission
            console.log('Form submitted with email:', values.email);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={{ width: '100%', padding: 15, marginVertical: height / 4 }}>
              <View
                style={{
                  width: '100%',
                  height: 270,
                  backgroundColor: '#fff',
                  borderTopEndRadius: 20,
                  borderTopStartRadius: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: '25%',
                    backgroundColor: '#3C3567',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20,
                  }}
                >
                  <Text style={styles.CorporateText}>Register</Text>
                  <TouchableOpacity>
                    <Image source={require('../../Assets/close.png')} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.resend}>Please enter your official email ID</Text>

                <View style={{ width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={styles.Email}>
                    <TextInput
                      style={styles.emailText}
                      placeholder="Email ID"
                      placeholderTextColor="#212121"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                  </View>
                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

                <View style={styles.button}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View
                      style={{
                        width: '100%',
                        height: '55%',
                        backgroundColor: '#3C3567',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                    >
                      <Text style={styles.CorporateText}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPOPUP;

const styles = StyleSheet.create({
  CorporateText: {
    color: '#FFFFFF',
    fontSize: 20,
    width: '80%',
    textAlign: 'center',
  },
  resend: {
    color: '#212121',
    fontSize: 17,
    marginTop: 20,
    marginLeft: 20,
  },
  Email: {
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 3,
    width: '90%',
  },
  emailText: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 20,
  },
});
