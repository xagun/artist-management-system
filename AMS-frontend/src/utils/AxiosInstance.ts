
import axios, { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request config before sending
    const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Handle response error
    if (axios.isAxiosError(error)) {
      const customError = error as AxiosError;

      if (customError.response) {
        if (customError.response.status === 401) {
          localStorage.clear();
          redirect("/");
        } else {
          // Log or handle other specific errors
          console.error('Response error:', customError.response);
        }
      } else {
        // Handle generic errors
        console.error('Error:', customError.message);
      }
    } else {
      // Handle unknown errors
      console.error('An unknown error occurred:', error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
