import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/',
  timeout: 5000,
  headers: { Authorization: 'Bearer'.concat(sessionStorage.getItem('access_token')) },
});

export default axiosInstance;