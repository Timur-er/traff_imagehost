import initialStore from "../initialStore";
import {IS_USER_LOADING, LOGIN_USER, LOGOUT} from "./types";

export function userReducer (user = initialStore.user, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload
        case IS_USER_LOADING:
            return {...user, is_loading: action.payload}
        case LOGOUT:
            return {...action.payload};
        default:
            return user;
    }
}