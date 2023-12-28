import React, {useEffect} from "react";
import UserRoutes from "./routes/UserRoutes";
import {useDispatch, useSelector} from "react-redux";
import {useAuth} from "./hooks/auth.hook";
import {authFunctionAction} from "./store/User/actions";
import {getIsUserAuth} from "./store/User/selectors";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
    // const dispatch = useDispatch();
    const isAuth = useSelector(getIsUserAuth)
    // const { login } = useAuth();

    // useEffect(() => {
    //     dispatch(authFunctionAction(login))
    // }, [login, dispatch])


    return (
        <div className="App">
            {isAuth ? <UserRoutes/> : <AuthPage />}

        </div>
    );
}

export default App;
