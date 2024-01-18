import React, {useEffect, useState} from 'react';
import {userRoutes} from "../../routes/routes";
import BurgerBtn from "./BurgerButton/BurgerButton";
import {useDispatch, useSelector} from "react-redux";
import {getIsMenuBarOpen} from "../../store/Menu/selectors";
import MenuLink from "./MenuLink/MenuLink";
import styles from './Menu.module.scss';
import {useLocation} from "react-router-dom";
import {logoutAction} from "../../store/User/actions";

const Menu = () => {
    const isMenuOpen = useSelector(getIsMenuBarOpen);
    const [navigationWrapperStyle, setNavigationWrapperStyle] = useState(`${styles.menu} ${styles.menu__close}`);
    const [logoStyle, setLogoStyle] = useState(`${styles.menu__name} ${styles.menu__nameClose}`)
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isMenuOpen) {
            setNavigationWrapperStyle(`${styles.menu}`);
            setLogoStyle(`${styles.menu__name}`)
        } else {
            setNavigationWrapperStyle(`${styles.menu} ${styles.menu__close}`);
            setLogoStyle(`${styles.menu__name} ${styles.menu__nameClose}`)
        }
    }, [isMenuOpen])


    const renderLinks = userRoutes.map((route, index) => {
        const {icon, title, path} = route;
        return (
            <MenuLink key={index} isOpen={isMenuOpen} icon={icon} title={title} path={path} is_active={location.pathname === path}/>
        )
    })

    const logoutHandler = () => {
        localStorage.clear()
        dispatch(logoutAction())
    }

    return (
        <div className={navigationWrapperStyle}>
            <div>
                <div className={styles.menu__logoWrapper}>
                    <div className={logoStyle}>
                    <span>
                        Traffic devS
                     </span>
                    </div>

                    <div>
                        <BurgerBtn/>
                    </div>
                </div>

                <div className={styles.menu__linksWrapper}>
                    {renderLinks}
                </div>
            </div>

            <div className={styles.menu__buttonWrapper}>
                <button className={styles.menu__button} onClick={() => logoutHandler()}>log out</button>
            </div>
        </div>
    );
};

export default Menu;