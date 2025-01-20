import axios from 'axios';
import Api from '../Services/Api';

// Create an Axios instance with a custom configuration
const axiosInstance = axios.create({
  baseURL: Api.BASE_URL, 
  headers: {                    
    'Content-Type': 'application/json',
    'Authorization': 'Bearer my-token', 
  },
});
// `${Api.BASE_URL}${Api.Jwt_TOKEN}`
export const getToken = async() => {
    try {
        const response = await axiosInstance.post(Api.Jwt_TOKEN)
        
        console.log(response);
    } catch (error) {
        console.error('Error fetching user:', error.message);
    }
}
