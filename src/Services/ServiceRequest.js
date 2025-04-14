
import {CLIENT_ID, CLIENT_SECRET,BASE_URL} from '@env'


export async function tokenFromMMI() {
  // console.log(CLIENT_ID,CLIENT_SECRET)
  try {
   
    const response = await fetch(
      `${BASE_URL}?grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      {
        method: 'POST',
        redirect: 'follow',
      }
    );

    const result = await response.text();
    const parsedResult = JSON.parse(result);
    console.log(parsedResult,"access_token");
  
    return parsedResult;
  
  } catch (error) {
    console.error('Error fetching MMI token:', error);
    throw error;
  }
  
}

  