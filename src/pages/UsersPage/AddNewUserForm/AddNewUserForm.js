import React from 'react';
import {Field, Form, Formik} from "formik";
import styles from './AddNewUserForm.module.scss';

const AddNewUserForm = () => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            onSubmit={async (values) => {
                console.log(values);
                console.log('user created');
            }}
        >
            {() => {
                return (
                    <div>
                        <Form className={styles.form}>
                            <Field className={styles.form__input} type="text" name='email' placeholder="user email"/>
                            <Field className={styles.form__input} type="text" name='password' placeholder="user password"/>

                            <button className={styles.form__button} type="submit">Create new user</button>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    );
};

export default AddNewUserForm;