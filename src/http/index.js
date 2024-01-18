import axios from "axios";

const $uploadImageHost = axios.create({
    withCredentials: false,
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

const $host =axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api',
})

const $authHost = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api'
})

const authInterceptor = config => {
    const token = JSON.parse(localStorage.getItem('access_token'));
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}

$authHost.interceptors.request.use(authInterceptor);
$uploadImageHost.interceptors.request.use(authInterceptor)
$authHost.interceptors.response.use((config) => {
    return config;
}, (error => {
    if (error.response.status === 401) {
        console.log('Unauthorized error')
    }
}))

$uploadImageHost.interceptors.response.use((config) => {
    return config;
}, (error => {
    if (error.response.status === 401) {
        console.log('Unauthorized error')
    }
}))


export {$host, $uploadImageHost, $authHost}