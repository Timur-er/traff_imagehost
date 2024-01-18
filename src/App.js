import React from "react";
import UserRoutes from "./routes/UserRoutes";
import {useSelector} from "react-redux";
import {getIsUserAuth} from "./store/User/selectors";
import AuthPage from "./pages/AuthPage/AuthPage";
import Popup from "./components/Popup/Popup";

function App() {
    const isAuth = useSelector(getIsUserAuth)

    return (
        <div className="App">
            {isAuth ? <UserRoutes/> : <AuthPage />}
            <Popup />
        </div>
    );
}

export default App;
