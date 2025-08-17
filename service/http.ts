import axios, {AxiosRequestConfig} from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://expense-app-bc386-default-rtdb.firebaseio.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export function get<ResponseType>(url: string, config: AxiosRequestConfig = {}) {
  return axiosInstance.get<ResponseType>(url, config)
}

export function post<ResponseType, RequestType>(url: string, data: RequestType, config: AxiosRequestConfig = {}) {
  return axiosInstance.post<ResponseType>(url, data, config)
}
