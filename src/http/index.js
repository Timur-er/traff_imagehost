import axios from "axios";

const createAPIHost = (withCredentials, baseURL, headers = {}) => {
    return axios.create({ withCredentials, baseURL, headers });
};
const $host = createAPIHost(true, 'http://localhost:8000/api');
const $uploadImageHost = createAPIHost(false, 'http://localhost:8000/api', {'Content-Type': 'multipart/form-data'});
const $authHost = createAPIHost(true, 'http://localhost:8000/api');

const handleResponseError = error => {
    if (error.response && error.response.status === 401) {
        console.log('Unauthorized error');
        // Additional error handling (e.g., redirect to login or refresh token)
    }
    return Promise.reject(error);
};
const authInterceptor = config => {
    const token = JSON.parse(localStorage.getItem('access_token'));
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}

[$authHost, $uploadImageHost].forEach(host => {
    host.interceptors.request.use(authInterceptor);
    host.interceptors.response.use(response => response, handleResponseError);
});


export {$host, $uploadImageHost, $authHost}