import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:80/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept':'application/json'
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request config before sending
const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN")
if(ACCESS_TOKEN){
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
    return response

  },
  (error) => {
    // Handle response error
    if (error.response.status === 401) {
      // Handle unauthorized error
      // e.g., redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
