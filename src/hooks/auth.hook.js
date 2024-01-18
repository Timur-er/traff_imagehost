import {useDispatch} from "react-redux";
import {useCallback, useEffect} from "react";
import {loginUserOperation} from "../store/User/operations";
import {getNewAccessToken} from "../http/userAPI";
import {isUserLoadingAction} from "../store/User/actions";


export const useAuth = () => {
    const dispatch = useDispatch()

    const login = useCallback((access_token, refresh_token) => {
        if (access_token === undefined || refresh_token === undefined) return;
        dispatch(loginUserOperation())
        localStorage.setItem('access_token', JSON.stringify(access_token))
        localStorage.setItem('refresh_token', JSON.stringify(refresh_token))
    }, [dispatch])


    // сделать рефреш токена, если рефреш токен не работает, авторизоваться заново
    useEffect(() => {
        dispatch(isUserLoadingAction(true));
        async function refreshAccessToken() {
            const refresh_token = JSON.parse(localStorage.getItem('refresh_token'))
            if (refresh_token) {
                let new_access_token = await getNewAccessToken(refresh_token)
                new_access_token = new_access_token.data.access_token
                login(new_access_token, refresh_token)
            }
            dispatch(isUserLoadingAction(false));
        }
        refreshAccessToken();
    }, [dispatch, login])

    return {login}
}