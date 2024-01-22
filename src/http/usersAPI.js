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

export const deleteUser = async (id) => {
    try {
        return await $authHost.delete(`/users/removeUser/${id}`);
    } catch (e) {
        console.log(e);
    }
}