import {useDispatch} from "react-redux";
import {useCallback, useEffect} from "react";
import {loginUserOperation} from "../store/User/operations";
import {getNewAccessToken} from "../http/userAPI";
import {isUserLoadingAction} from "../store/User/actions";


export const useAuth = () => {
    const dispatch = useDispatch()

    const login = useCallback((access_token, refresh_token) => {
        if (access_token === undefined || refresh_token === undefined) return;
        dispatch(loginUserOperation(access_token))
        localStorage.setItem('access_token', JSON.stringify(access_token))
        localStorage.setItem('refresh_token', JSON.stringify(refresh_token))
    }, [dispatch])

    useEffect(() => {
        dispatch(isUserLoadingAction(true));
        async function refreshAccessToken() {
            const refresh_token = JSON.parse(localStorage.getItem('refresh_token'))
            if (refresh_token) {
                let response = await getNewAccessToken(refresh_token)
                if (response && response.data) {
                    const new_access_token = response.data.access_token;
                    login(new_access_token, refresh_token);
                } else {
                    // Handle the case where response or response.data is not as expected
                    console.error('Invalid response from getNewAccessToken:', response);
                }
            }
            dispatch(isUserLoadingAction(false));
        }
        refreshAccessToken();
    }, [dispatch, login])

    return {login}
}