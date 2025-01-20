import axios from 'axios';
import Api from '../Services/Api';
import Static from '../Services/Static';

// Create an Axios instance with a custom configuration
const axiosInstance = axios.create({
  baseURL: Api.BASE_URL,
});
// `${Api.BASE_URL}${Api.Jwt_TOKEN}`
export const getToken = async () => {
  try {
    const response = await axiosInstance.post(Api.Jwt_TOKEN, {
      headers: {
        jwt: '',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `access_codename_jwt=${Static.ACCESS_CODE_NAME}&access_codepass_jwt=${Static.ACCESS_CODE_PASS}`,
    })

    console.log("Caling from " , response);
  } catch (error) {
    console.error('Error fetching user:', error.message);
  }
}
