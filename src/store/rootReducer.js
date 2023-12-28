import {combineReducers} from "redux";
import {menuReducer} from "./Menu/MenuReducer";
import {userReducer} from "./User/UserReducer";


const rootReducer = combineReducers({
    menu: menuReducer,
    user: userReducer,
});

export default rootReducer;