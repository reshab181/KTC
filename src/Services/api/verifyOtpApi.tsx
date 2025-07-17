import { apiClient, getHttpAuthClient } from "./axiosClient"


const verifyOtpApi = async(url: string, passPhrase: string, process: string) => {
    const verifyOtpClient = await apiClient(url);
    if(process === "processSignUp"){
        return getHttpAuthClient(verifyOtpClient, '', {passPhrase: passPhrase, processSignUp: ""})
    } else {
        return getHttpAuthClient(verifyOtpClient, '', {passPhrase: passPhrase, processForgotPassword: ""})
    }
}

export default verifyOtpApi;