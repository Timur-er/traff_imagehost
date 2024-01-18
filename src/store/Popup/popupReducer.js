import initialStore from "../initialStore";
import {CLOSE_POPUP, OPEN_POPUP} from "./types";

export function popupReducer (popup = initialStore.popup, action) {
    switch (action.type) {
        case OPEN_POPUP:
            return action.payload;
        case CLOSE_POPUP:
            return {message: '', is_open: action.payload, is_error: false};
        default:
            return popup;
    }
}