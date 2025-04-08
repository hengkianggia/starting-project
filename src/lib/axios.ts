import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): InternalAxiosRequestConfig<any> => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config as InternalAxiosRequestConfig<any>;
  },
  (error: AxiosError): Promise<AxiosError> => {
    localStorage.removeItem("token");
    window.location.href = "/";
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>): AxiosResponse<ApiResponse> => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("token");
      window.location.href = "/";
      console.error("Unauthorized access. Redirecting to login...");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
