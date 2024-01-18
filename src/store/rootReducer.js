import {combineReducers} from "redux";
import {menuReducer} from "./Menu/MenuReducer";
import {userReducer} from "./User/UserReducer";
import {popupReducer} from "./Popup/popupReducer";


const rootReducer = combineReducers({
    menu: menuReducer,
    user: userReducer,
    popup: popupReducer,
});

export default rootReducer;