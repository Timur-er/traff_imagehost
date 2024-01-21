import React, {useState} from 'react';
import Icon from "../../Icon/Icon";
import {NavLink} from "react-router-dom";
import styles from './MenuLink.module.scss';
import classNames from "classnames";

const MenuLink = React.memo(({isOpen, icon, title, path, is_active}) => {
    const [isLinkHovered, setIsLinkHovered] = useState(false);

    const linkStyle = classNames(styles.menuLink, {
        [styles.menuLink__active]: is_active,
    });

    const titleStyle = classNames(styles.menuLink__title, {
        [styles.menuLink__closedTitle]: !isOpen,
    });

    return (
        <NavLink className={styles.menuLink__link} to={path}>
            <li onMouseEnter={() => setIsLinkHovered(true)}
                onMouseLeave={() => setIsLinkHovered(false)}
                className={linkStyle}>
                    <span>
                        <Icon
                            type={icon}
                            width={'35px'}
                            height={'35px'}
                            color={isLinkHovered || is_active ? '#07f763' : '#78787e'}
                        />
                    </span>
                <span
                    className={titleStyle}>
                {title}
            </span>
            </li>
        </NavLink>
    );
})

export default MenuLink;