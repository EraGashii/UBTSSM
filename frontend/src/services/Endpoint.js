import axios from 'axios';

// Backend API URL
export const BaseUrl = 'http://localhost:8000'; // Replace with your backend's URL

const instance = axios.create({
    baseURL: BaseUrl,
    withCredentials: true, // Allow cookies or credentials
});

// HTTP methods
export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const patch = (url, data) => instance.patch(url, data);
export const dele = (url) => instance.delete(url);

