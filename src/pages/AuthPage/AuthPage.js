import React from 'react';
import * as Yup from 'yup';
import {Field, Form, Formik} from "formik";
import {useAuth} from '../../hooks/auth.hook';
import {loginAPI} from "../../http/userAPI";
import {useNavigate} from 'react-router-dom';
import {ADD_IMAGE} from "../../routes/consts";
import style from './AuthPage.module.scss';

const AuthenticatePage = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        userName: Yup.string().required("username is required!"),
        password: Yup.string().required('password is required')
    })

    return (
        <div className={style.auth}>
            <Formik
                initialValues={{
                    userName: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting}) => {
                    const {userName, password} = values;
                    try {
                        const token = await loginAPI(userName, password)
                        const {access_token, refresh_token} = token.data;
                        login(access_token, refresh_token)
                        navigate(ADD_IMAGE);
                        setSubmitting(false)
                    } catch (err) {
                        console.log(err);
                    }
                }}
            >
                {() => {
                    return (
                        <div>
                            <Form className={style.form}>

                                <div className={style.form__title}>
                                    Image Hosting traffDevS
                                </div>

                                <div className={style.form__inputWrapper}>
                                    <label className={style.form__labels} htmlFor="userName">
                                        username:
                                    </label>
                                    <Field className={style.form__input} type='text' name='userName'/>
                                </div>


                                <div className={style.form__inputWrapper}>
                                    <label className={style.form__labels} htmlFor="">
                                        password:
                                    </label>
                                    <Field className={`${style.form__input} ${style.form__input__password}`}
                                           type='password' name='password'/>
                                </div>

                                <button type='submit' className={style.form__submit}>Login</button>
                            </Form>
                        </div>
                    )
                }}

            </Formik>
        </div>
    );
};

export default AuthenticatePage;