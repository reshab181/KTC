// jwtHelper.js

import { Alert } from 'react-native';
import Api from '../services/Api';
import Static from '../services/Static';

export const fetchJwtAccess = async () => {
  try {
    const response = await fetch(`${Api.BASE_URL}${Api.Jwt_TOKEN}`, {
      method: 'POST',
      headers: {
        'jwt': '',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `access_codename_jwt=${Static.ACCESS_CODE_NAME}&access_codepass_jwt=${Static.ACCESS_CODE_PASS}`,
    });

    const result = await response.json();
    console.log('====================================');
    console.log(result);
    console.log('====================================');
    const token = result?.jwt;
    if (!token) {
      throw new Error('Token not retrieved');
    }
    return token;
  } catch (error) {
    console.error('JWT Fetch Error:', error);
    // Alert.alert('Error', 'Failed to retrieve access token.');
    return null;
  }
};
