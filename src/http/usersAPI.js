import {$authHost} from "./index";

export const getAllUsers = async () => {
    try {
        return await $authHost.get('/users/getAllUsers');
    } catch (e) {
        console.log(e);
    }
}

export const getAllRoles = async () => {
    try {
        return await $authHost.get('/users/getAllRoles');
    } catch (e) {
        console.log(e);
    }
}