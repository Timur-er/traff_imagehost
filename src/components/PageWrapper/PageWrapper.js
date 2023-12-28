import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getIsMenuBarOpen} from "../../store/Menu/selectors";
import styles from './PageWrapper.module.scss';

const PageContainer = React.memo(({children}) => {
    const isMenuOpen = useSelector(getIsMenuBarOpen);
    const [pageContainerStyle, setPageContainerStyle] = useState(`${styles.pageContainer} ${styles.pageContainer__withMenuClose}`);

    useEffect(() => {
        if (isMenuOpen) {
            setPageContainerStyle(`${styles.pageContainer}`)
        } else {
            setPageContainerStyle(`${styles.pageContainer} ${styles.pageContainer__withMenuClose}`)
        }
    }, [isMenuOpen])

    return (
        <div className={pageContainerStyle}>
            {children}
        </div>
    );
})

export default PageContainer;