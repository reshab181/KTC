import { CLIENT_ID, CLIENT_SECRET, TOKEN_URL } from "../../config/api-config";
import { apiClient, postHttpClient } from "./axiosClient";

const oauthClient = apiClient(TOKEN_URL)

const oauthApi = async() => {
    const data = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials'
    }
        
    let instance = await oauthClient;
    instance.interceptors.request.use((config) => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        // config.headers["Content-Type"]="application/json"
        return config;
    })
    return(postHttpClient(instance, '', null, data))
}
export {oauthApi}