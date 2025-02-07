import axios from 'axios';
import Api from '../services/Api';
import Static from '../services/Static';


// Create an Axios instance with a custom configuration
const axiosInstance = axios.create({
  baseURL: Api.BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded', // Default Content-Type
  },
});

export const getToken = async () => {
  try {
    // Construct the request body
    const requestBody = new URLSearchParams();
    requestBody.append('access_codename_jwt', Static.ACCESS_CODE_NAME);
    requestBody.append('access_codepass_jwt', Static.ACCESS_CODE_PASS);

    const response = await axiosInstance.post(Api.Jwt_TOKEN, 
      requestBody.toString(), 
      {
      headers: {
        jwt: '', 
      },

    });
    const token = response.data?.jwt;
    if (!token) {
      throw new Error('Token not retrieved');
    }

    return token;
  } catch (error) {
    console.error('JWT Fetch Error:', error);
    Alert.alert('Error', 'Failed to retrieve access token.');
    return null;
  }
};

export const getSignIn = async () =>{
  
}