import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

interface ApiConfig {
  baseURL: string
  headers: {
    'Content-Type': string
    Authorization?: string
  }
}

const config: ApiConfig = {
  baseURL: 'https://pwncore.udk.me/api',
  headers: {
    'Content-Type': 'application/json'
  }
}

const api: AxiosInstance = axios.create(config)

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) localStorage.removeItem('token')
    return Promise.reject(error)
  }
)

export default api
