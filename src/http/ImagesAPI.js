import {$uploadImageHost, $authHost} from "./index";

export const addImage = async(image) => {
    try {
        const response = await $uploadImageHost.post('/image/addImage', image)
        console.log('response', response);
    } catch (e) {
        console.log(e);
    }
}

export const getAllImages = async(page, searchQuery, limit = 8) => {
    try {
        return await $authHost.get('/image/getAllImages', {params: {page, limit, searchQuery}})
    } catch (e) {
        console.log(e);
    }
}

export const getAllTeamImages = async (teamId, page, searchQuery, limit = 8) => {
    try {
        // can I pass teamId through the jwt?
        return await $authHost.get(`/image/getTeamImages/2`, {params: {page, limit, searchQuery}})
    } catch (e) {
        console.log(e);
    }
}