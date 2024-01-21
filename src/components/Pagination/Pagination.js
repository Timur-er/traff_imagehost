import React from 'react';
import styles from './Pagination.module.scss';
import classNames from "classnames";

const Pagination = ({count, setActivePage, activePage}) => {
    const pages = Array.from({ length: count }, (_, i) => i + 1);

    const renderPagination = pages.length !== 0 && pages.map(index => {
        let className = classNames(styles.pagination__button, {
            [styles.pagination__active]: index === activePage,
        });
        return (
            <div key={index} className={className} onClick={() => setActivePage(index)}>
                {index}
            </div>
        )
    })

    return (
        <div className={styles.pagination}>
            {renderPagination}
        </div>
    );
};

export default Pagination;