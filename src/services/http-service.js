import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3004',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default http;
