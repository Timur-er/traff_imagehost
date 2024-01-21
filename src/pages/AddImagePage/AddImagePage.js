import React from 'react';
import AddImageForm from "./AddImageForm/AddImageForm";
import styles from './AddImagePage.module.scss';

const AddImagePage = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>
                Add image page
            </h1>

            <AddImageForm/>
        </div>
    );
};

export default AddImagePage;