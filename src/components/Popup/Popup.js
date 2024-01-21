import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './Popup.module.scss';
import {getIsPopupError, getIsPopupOpen, getPopupMessage} from "../../store/Popup/selectors";
import {closePopup} from "../../store/Popup/actions";

const Popup = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(getIsPopupOpen);
    const message = useSelector(getPopupMessage);
    const isError = useSelector(getIsPopupError);

    useEffect(() => {
        let timer;
        if (isOpen) {
            timer = setTimeout(() => {
                dispatch(closePopup());
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [isOpen, dispatch]);

    return isOpen ? (
        <div className={styles.popup} style={isError ? {color: '#d3375d'} : {color: 'rgb(18 231 98)'}}>
            {message}
        </div>
    ) : null;
};

export default Popup;