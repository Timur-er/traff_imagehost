import React, {useEffect} from "react";
import UserRoutes from "./routes/UserRoutes";
import {useSelector} from "react-redux";
import {getIsUserAuth, getIsUserLoading} from "./store/User/selectors";
import AuthPage from "./pages/AuthPage/AuthPage";
import Popup from "./components/Popup/Popup";
import {useAuth} from "./hooks/auth.hook";

function App() {
    const isAuth = useSelector(getIsUserAuth)
    const { login } = useAuth();
    const isLoading = useSelector(getIsUserLoading)

    useEffect(() => {
        const storedAccessToken = JSON.parse(localStorage.getItem('access_token'));
        const storedRefreshToken = JSON.parse(localStorage.getItem('refresh_token'));

        if (storedAccessToken && storedRefreshToken && !isLoading && !isAuth) {
            login(storedAccessToken, storedRefreshToken);
        }
    }, [isLoading, isAuth, login]);

    if (isLoading) return <div>LOADING!!!!</div>

    return (
        <div className="App">
            {isAuth ? <UserRoutes/> : <AuthPage />}
            <Popup />
        </div>
    );
}

export default App;
