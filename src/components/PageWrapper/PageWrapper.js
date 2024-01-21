import React from 'react';
import {useSelector} from "react-redux";
import {getIsMenuBarOpen} from "../../store/Menu/selectors";
import styles from './PageWrapper.module.scss';
import classNames from 'classnames';

const PageContainer = React.memo(({children}) => {
    const isMenuOpen = useSelector(getIsMenuBarOpen);

    const containerClass = classNames(styles.pageContainer, {
        [styles.pageContainer__withMenuClose]: !isMenuOpen,
    });

    return (
        <div className={containerClass}>
            {children}
        </div>
    );
})

export default PageContainer;