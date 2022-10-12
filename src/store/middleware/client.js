// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

const { REACT_APP_DIRECTUS_URL, REACT_APP_DIRECTUS_TOKEN } = process.env

export async function client(endpoint, { body, ...customConfig } = {}) {
   const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${REACT_APP_DIRECTUS_TOKEN}` }
 
   const config = {
     baseURL: REACT_APP_DIRECTUS_URL,
     method: body ? 'POST' : 'GET',
     ...customConfig,
     headers: {
       ...headers,
       ...customConfig.headers,
     },
   }
 
   if (body) {
     config.body = JSON.stringify(body)
   }
 
   let data
   try {
     const response = await window.fetch(endpoint, config)
     data = await response.json()
     if (response.ok) {
       // Return a result object similar to Axios
       return {
         status: response.status,
         data,
         headers: response.headers,
         url: response.url,
       }
     }
     throw new Error(response.statusText)
   } catch (err) {
     return Promise.reject(err.message ? err.message : data)
   }
 }
 
 client.get = function (endpoint, customConfig = {}) {
   return client(endpoint, { ...customConfig, method: 'GET' })
 }
 
 client.post = function (endpoint, body, customConfig = {}) {
   return client(endpoint, { ...customConfig, body })
 }
 