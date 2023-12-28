import React, {useEffect, useState} from 'react';
import Icon from "../../Icon/Icon";
import {NavLink} from "react-router-dom";
import styles from './MenuLink.module.scss';

const MenuLink = React.memo(({isOpen, icon, title, path, is_active}) => {
    const [isLinkHovered, setIsLinkHovered] = useState(false);
    const [linkStyle, setLinkStyle] = useState(`${styles.menuLink}`)

    useEffect(() => {
        if (is_active) {
            setLinkStyle(`${styles.menuLink} ${styles.menuLink__active}`)
        } else {
            setLinkStyle(`${styles.menuLink}`)
        }
    }, [is_active])

    const handleMouse = () => {
        setIsLinkHovered(!isLinkHovered)
    }

    return (
        <NavLink className={styles.menuLink__link} to={path}>
            <li onMouseEnter={handleMouse} onMouseLeave={handleMouse} className={linkStyle}>
                    <span>
                        <Icon
                            type={icon}
                            width={'35px'}
                            height={'35px'}
                            color={isLinkHovered || is_active ? '#07f763' : '#78787e'}
                        />
                    </span>
                <span
                    className={isOpen ? `${styles.menuLink__title}`
                        : `${styles.menuLink__title} ${styles.menuLink__closedTitle}`
                    }>
                {title}
            </span>
            </li>
        </NavLink>
    );
})

export default MenuLink;