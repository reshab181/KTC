import { setUserProfile } from '../Redux/slice/UserProfileSlice';


export const setUserProfileData = (dispatch, userData) => {
  const birthDate = new Date(userData.bithdate * 1000).toLocaleDateString();
  dispatch(setUserProfile({
    email_id: userData.email_id,
    user_id: userData.user_id,
    client_name: userData.client_name,
    f_name: userData.f_name,
    l_name: userData.l_name,
    gender: userData.gender,
    country: userData.country,
    user_type: userData.user_type,
    client_id: userData.client_id,
    alternative_no: userData.alternative_no,
    bithdate: birthDate,
    mobile_number: userData.mobile_number,
  }));
};
