import axios, { AxiosInstance } from "axios";
import KTCSingleton from "../KTCSingleton";
import { jwtTokenApi } from "./jwtToken";
import { oauthApi } from "./oauthToken";

const apiClient = async (baseUrl: any) => {
    const instance = await axios.create({
        baseURL: baseUrl,
        responseType: 'json',

    });
    return(instance)
}

const postHttpClient = async (instance: AxiosInstance, url: any, params?: any, data?: any) => {
    let axiosCall = axios.CancelToken.source();
    var timeOut = setTimeout(() => {
      axiosCall.cancel(
        'Unable to connect server. Please try again after some Time.',
      );
    }, 1000 * 30);
    return instance({
        method: 'post',
        cancelToken: axiosCall.token,
        url: url,
        params: params,
        data: data,
      });
    
}

const postJWtHttpClient = async (instance: AxiosInstance, url: any, params?: any, data?: any, headers?: any) => {
    let axiosCall = axios.CancelToken.source();
    var timeOut = setTimeout(() => {
      axiosCall.cancel(
        'Unable to connect server. Please try again after some Time.',
      );
    }, 1000 * 30);
    instance.interceptors.request.use(async(config) => {
      if(KTCSingleton.getInstance().getJWTToken() !== ''){
        config.headers.jwt = KTCSingleton.getInstance().getJWTToken();
      } else {
        const tokenApi = await jwtTokenApi()
        if(tokenApi.data?.jwt) {
          KTCSingleton.getInstance().setJWTToken(tokenApi.data?.jwt)
          config.headers.jwt = KTCSingleton.getInstance().getJWTToken();
        }
      }
      // config.headers["Content-Type"]="application/json"
      return config;
    })

    instance.interceptors.response.use(async(response) => {
      if(response?.data?.message === "Access denied.") {
        const tokenApi = await jwtTokenApi()
        if(tokenApi.data?.jwt) {
          KTCSingleton.getInstance().setJWTToken(tokenApi.data?.jwt)
          instance.interceptors.request.clear();
          instance.interceptors.request.use(async(config) => {
              
                config.headers.jwt = KTCSingleton.getInstance().getJWTToken();
            // config.headers["Content-Type"]="application/json"
            return config;
          })
        }
          instance.interceptors.response.clear()
          return instance({
            method: 'post',
            cancelToken: axiosCall.token,
            headers: headers,
            url: url,
            params: params,
            data: data,
            onUploadProgress : function(progressEvent) {
            //   var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            //   debuggerLogs("PROGRESS",percentCompleted)
            }
          });
      } else {
        return response
      }
      },
      async (error) => {
        return error;
      }
    )

    return instance({
        method: 'post',
        cancelToken: axiosCall.token,
        headers: headers,
        url: url,
        params: params,
        data: data,
      });
    
}

const postHttpAuthClient = (instance: AxiosInstance, url: any, params?: any, data?: any, headers?: any) => {
  let axiosCall = axios.CancelToken.source();
    // console.log(params)
    var timeOut = setTimeout(() => {
      axiosCall.cancel(
        'Unable to connect server. Please try again after some Time.',
      );
    }, 1000 * 30);

    
    instance.interceptors.request.use(async(config) => {
      if(KTCSingleton.getInstance().getOAuthToken() && KTCSingleton.getInstance().getOAuthToken() !== ''){
        config.headers.Authorization = `bearer ${KTCSingleton.getInstance().getOAuthToken()}`;
      } else {
        const tokenApi = await oauthApi()
        if(tokenApi.data?.access_token) {
          KTCSingleton.getInstance().setOAuthToken(tokenApi.data?.access_token)
          config.headers.Authorization = `bearer ${KTCSingleton.getInstance().getOAuthToken()}`;
        }
      }
      return config;
    })

    instance.interceptors.response.use((response) => {
      return response
    },
    async (error) => {
      if(error && error.response && error.response.status === 401) {
        console.log("status === 401")
        clearTimeout(timeOut);
        try {
          const tokenResponse = await oauthApi()
          if(tokenResponse && tokenResponse.status === 200 && tokenResponse.data?.access_token) {
            KTCSingleton.getInstance().setOAuthToken(tokenResponse.data?.access_token)
            instance.interceptors.request.clear();
            instance.interceptors.request.use((config) => {
              config.headers.delete("Authorization")
              config.headers.Authorization = `bearer ${tokenResponse.data.access_token}`
              return config;
            })
          }

          instance.interceptors.response.clear()
          return instance({
            method: 'post',
            cancelToken: axiosCall.token,
            url: url,
            params: params,
            headers: headers,
            data: data,
            onUploadProgress : function(progressEvent) {
            //   var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            //   debuggerLogs("PROGRESS",percentCompleted)
            }
          });
        } catch(tokenError) {
          return Promise.reject(tokenError);
       }

      }
      console.log(error.response.request)
      return Promise.reject(error)
    })
    return instance({
      method: 'post',
      cancelToken: axiosCall.token,
      url: url,
      params: params,
      headers: headers,
      data: data,
      onUploadProgress : function(progressEvent) {
      //   var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //   debuggerLogs("PROGRESS",percentCompleted)
      }
    });
}



const getHttpAuthClient = (instance: AxiosInstance, url: any, params?: any) => {
  let axiosCall = axios.CancelToken.source();
    // console.log(params)
    var timeOut = setTimeout(() => {
      axiosCall.cancel(
        'Unable to connect server. Please try again after some Time.',
      );
    }, 1000 * 30);

    
    instance.interceptors.request.use(async(config) => {
      if(KTCSingleton.getInstance().getOAuthToken() && KTCSingleton.getInstance().getOAuthToken() !== ''){
        config.headers.Authorization = `bearer ${KTCSingleton.getInstance().getOAuthToken()}`;
      } else {
        const tokenApi = await oauthApi()
        if(tokenApi.data?.access_token) {
          KTCSingleton.getInstance().setOAuthToken(tokenApi.data?.access_token)
          config.headers.Authorization = `bearer ${KTCSingleton.getInstance().getOAuthToken()}`;
        }
      }
      return config;
    })

    instance.interceptors.response.use((response) => {
      return response
    },
    async (error) => {
      if(error && error.response && error.response.status === 401) {
        console.log("status === 401")
        clearTimeout(timeOut);
        try {
          const tokenResponse = await oauthApi()
          if(tokenResponse && tokenResponse.status === 200 && tokenResponse.data?.access_token) {
            KTCSingleton.getInstance().setOAuthToken(tokenResponse.data?.access_token)
            instance.interceptors.request.clear();
            instance.interceptors.request.use((config) => {
              config.headers.delete("Authorization")
              config.headers.Authorization = `bearer ${tokenResponse.data.access_token}`
              return config;
            })
          }

          instance.interceptors.response.clear()
          return instance({
            method: 'get',
            cancelToken: axiosCall.token,
            url: url,
            params: params,
            onUploadProgress : function(progressEvent) {
            //   var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            //   debuggerLogs("PROGRESS",percentCompleted)
            }
          });
        } catch(tokenError) {
          return Promise.reject(tokenError);
       }

      }
      console.log(error.response.request)
      return Promise.reject(error)
    })
    return instance({
      method: 'get',
      cancelToken: axiosCall.token,
      url: url,
      params: params,
      onUploadProgress : function(progressEvent) {
      //   var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //   debuggerLogs("PROGRESS",percentCompleted)
      }
    });
}

export {
    apiClient,
    postHttpClient,
    postJWtHttpClient,
    postHttpAuthClient,
    getHttpAuthClient
}