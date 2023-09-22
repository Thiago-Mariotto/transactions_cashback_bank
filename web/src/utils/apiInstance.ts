import axios from 'axios';

const ApiInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3001',
  timeout: 10000,
});

export default ApiInstance;