import {$authHost} from "./index";

export const createNewTeam = async (teamName) => {
    try {
        const response = await $authHost.post('/settings/createNewTeam', {teamName})
        console.log(response);
    } catch (e) {
        console.log(e);
    }
}

export const getAllTeams = async () => {
    try {
        return await $authHost.get('/settings/getAllTeams')
    } catch (e) {
        console.log(e);
    }
}