import React from 'react';
import BurgerBtn from "./BurgerButton/BurgerButton";
import {useDispatch, useSelector} from "react-redux";
import {getIsMenuBarOpen} from "../../store/Menu/selectors";
import MenuLink from "./MenuLink/MenuLink";
import styles from './Menu.module.scss';
import {useLocation} from "react-router-dom";
import {logoutAction} from "../../store/User/actions";
import classNames from "classnames";

const Menu = ({availableRoutes}) => {
    const isMenuOpen = useSelector(getIsMenuBarOpen);
    const location = useLocation();
    const dispatch = useDispatch();

    const navigationWrapperStyle = classNames(styles.menu, {
        [styles.menu__close]: !isMenuOpen,
    });

    const logoStyle = classNames(styles.menu__name, {
        [styles.menu__nameClose]: !isMenuOpen,
    });


    const renderLinks = availableRoutes.map((route, index) => (
        <MenuLink
            key={route.id || index}
            isOpen={isMenuOpen}
            icon={route.icon}
            title={route.title}
            path={route.path}
            is_active={location.pathname === route.path}
        />
    ));

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