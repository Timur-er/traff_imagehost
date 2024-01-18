import React from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({count, setActivePage, activePage}) => {
    const pages = []

    for (let i = 0; i < count; i++) {
        pages.push(i + 1)
    }

    const renderPagination = pages.length !== 0 && pages.map(index => {
        let className = index === activePage ? `${styles.pagination__active} ${styles.pagination__button}` : `${styles.pagination__button}`
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