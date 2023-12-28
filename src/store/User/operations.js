import {loginUserAction} from "./actions";

export const loginUserOperation = () => dispatch => {
    dispatch(loginUserAction(true))
}
