import {$uploadImageHost, $authHost} from "./index";

export const addImage = async(image) => {
    try {
        const response = await $uploadImageHost.post('/image/addImage', image)
        console.log('response', response);
    } catch (e) {
        console.log(e);
    }
}

export const getAllImages = async() => {
    try {
        return await $authHost.get('/image/getAllImages')
    } catch (e) {
        console.log(e);
    }
}