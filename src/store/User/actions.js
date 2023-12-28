import {IS_USER_LOADING, LOGIN_FUNCTIONS, LOGIN_USER, LOGOUT} from "./types";

export const loginUserAction = user => ({type: LOGIN_USER, payload: user})
export const authFunctionAction = loginFunction => ({type: LOGIN_FUNCTIONS, payload: loginFunction})
export const isUserLoadingAction = isLoading => ({type: IS_USER_LOADING, payload: isLoading})
export const logoutAction = () => ({type: LOGOUT, payload: {isAuth: false, is_loading: false}})