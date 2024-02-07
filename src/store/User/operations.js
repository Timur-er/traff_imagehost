import {loginUserAction} from "./actions";
import {jwtDecode} from "jwt-decode";

export const loginUserOperation = (token) => dispatch => {
    const {email, role, team, teamId, id} = jwtDecode(token)
    dispatch(loginUserAction({email, role, team, isAuth: true, teamId, id, is_loading:false}))
}
