import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {menuBarToggleOperation} from "../../../store/Menu/operations";
import styles from './BurgerButton.module.scss';

const BurgerBtn = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [topLineClass, setTopLineClass] = useState(`${styles.burgerLines}`);
    const [middleLineClass, setMiddleLineClass] = useState(`${styles.burgerLines}`);
    const [bottomLineClass, setBottomLineClass] = useState(`${styles.burgerLines}`);
    const dispatch = useDispatch();

    const burgerHandler = () => {
        setIsMenuOpen(!isMenuOpen);
        setTopLineClass(isMenuOpen ? `${styles.burgerLines}` : `${styles.burgerLines} ${styles.activeTopLine}`)
        setMiddleLineClass(isMenuOpen ? `${styles.burgerLines}` : `${styles.burgerLines} ${styles.activeMiddleLine}`)
        setBottomLineClass(isMenuOpen ? `${styles.burgerLines}` : `${styles.burgerLines} ${styles.activeBottomLine}`)
        dispatch(menuBarToggleOperation(!isMenuOpen));
    }

    return (
        <div onClick={burgerHandler} className={styles.burgerBtn}>
            <div className={topLineClass}/>
            <div className={middleLineClass}/>
            <div className={bottomLineClass}/>
        </div>

    );
};

export default BurgerBtn;