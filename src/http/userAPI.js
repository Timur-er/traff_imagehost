import {$host} from "./index";

export const loginAPI = async (userName, password) => {
    try {
        console.log('user name - ', userName);
        const response =  await $host.post('/user/login', {userName, password})
        console.log(response);
        return response
    } catch (error) {
        throw error;
    }
}

export const getNewAccessToken = async (refresh) => {
    try {
        const response = await $host.get('/user/refresh');
        return response;
    } catch (e) {
        console.log(e);
    }
}