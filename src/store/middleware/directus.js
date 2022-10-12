import axios from 'axios';

const { REACT_APP_DIRECTUS_URL, REACT_APP_DIRECTUS_TOKEN } = process.env

export const axiosInstance = axios.create({
   baseURL: REACT_APP_DIRECTUS_URL,
   headers: {
     'Authorization': `Bearer ${REACT_APP_DIRECTUS_TOKEN}`,
     'Content-Type' : 'application/json',
     'Access-Control-Allow-Origin' : '*',
     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH',
     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
     'Access-Control-Allow-Credentials' : 'true'
   }
 });