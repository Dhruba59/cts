import axios from "axios";

export const axioInstance = axios.create({
  //baseURL: 'https://app-cts-dev-api.azurewebsites.net/api/',
  baseURL: process.env.API_BASE_URL
});

export const request = async ({ ...options }) => {
  axioInstance.defaults.headers.common.Authorization = `Bearer `;
  axioInstance.defaults.headers.common.Apikey = `${process.env.API_KEY}`;
  const onSuccess = (response: any) => {
    console.log(response);
    return { data: response.data };
  }
  const onError = (error: any) => {
    console.log(error);
    return { error: error.response.data };
  }
  return await axioInstance(options).then(onSuccess).catch(onError);
}
