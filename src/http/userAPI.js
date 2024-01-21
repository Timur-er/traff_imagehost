import {$authHost, $host} from "./index";

export const loginAPI = async (userName, password) => {
    try {
        return await $host.post('/user/login', {userName, password})
    } catch (error) {
        throw error;
    }
}

export const getNewAccessToken = async () => {
    try {
        return await $authHost.get('/user/refresh');
    } catch (e) {
        console.log(e);
    }
}

export const registerNewUser = async (email, password, roleId, teamId) => {
    try {
        return await $authHost.post('/user/registration', {email, password, roleId, teamId})
    } catch (e) {
        console.log(e);
    }
}