import initialStore from "../initialStore";
import {MENU_TOGGLE} from "./types";

export function menuReducer(menu = initialStore.menu, action) {
    switch (action.type) {
        case MENU_TOGGLE:
            return {...menu, is_open: action.payload};
        default:
            return menu;
    }
}