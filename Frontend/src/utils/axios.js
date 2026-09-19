// Centralized API setup
import axios from 'axios';
import qs from 'qs';

let rawBaseURL = import.meta.env.VITE_API_BASE_URL || '';

// Clean up baseURL to avoid duplicating /api/v1
if (rawBaseURL.endsWith('/api/v1')) {
  rawBaseURL = rawBaseURL.slice(0, -7);
} else if (rawBaseURL.endsWith('/api/v1/')) {
  rawBaseURL = rawBaseURL.slice(0, -8);
}

// Remove trailing slash if present
if (rawBaseURL.endsWith('/')) {
  rawBaseURL = rawBaseURL.slice(0, -1);
}

export const axiosInstance = axios.create({
    baseURL: rawBaseURL,
    withCredentials: true,
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
});
