import { ACCESS_CODE_NAME, ACCESS_CODE_PASS, BASE_URL, COMMON_USER_API_URL, JWT_TOKEN } from '../../config/api-config';
import {apiClient, postHttpClient} from './axiosClient'

const jwtClient = apiClient(BASE_URL + JWT_TOKEN);

const jwtTokenApi = async () => {
    const data = {
        access_codename_jwt: ACCESS_CODE_NAME,
        access_codepass_jwt: ACCESS_CODE_PASS
    }
    let instance = await jwtClient;
    instance.interceptors.request.use((config) => {
        config.headers.jwt = ''
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        // config.headers["Content-Type"]="application/json"
        return config;
      })
    return (postHttpClient(instance, '', null, data))
}

export {jwtTokenApi}