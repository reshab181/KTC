
import { Alert } from 'react-native';
import { tokenFromMMI } from '../Services/ServiceRequest';


export const emailsms = async (email, accessToken, navigation, setLoading) => {
  if (!accessToken) {
    Alert.alert('Error', 'Access token is not available.');
    return;
  }

  try {
    setLoading(true);

    const mmiToken = await tokenFromMMI();
    if (!mmiToken?.access_token) {
      throw new Error("Failed to retrieve MMI access token.");
    }

    const headersList = {
      Authorization: `Bearer ${mmiToken.access_token}`,
    };

    const apiUrl = `https://anchor.mapmyindia.com/api/users/authenticate?handle=${email}&autoMigrate`;
    console.log('Making API request to:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headersList,
    });

    if (response?.ok) {
      const locationUrl = response.headers.get('location');
      if (!locationUrl) {
        throw new Error("Location header is missing in the response.");
      }

      console.log('Navigating to OTP screen...');
      navigation.navigate('OTP', {
        url: locationUrl,
        email,
        from: 'ForgotPassword',
        accessToken,
      });
    } else {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  } catch (error) {
    console.error('Error in emailsms:', error.message);
    Alert.alert('Error', error.message || 'An unexpected error occurred.');
  } finally {
    setLoading(false);
  }
};

