//centeralized API setup

import axios from 'axios';
import qs from 'qs';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
    withCredentials: true,
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
});
