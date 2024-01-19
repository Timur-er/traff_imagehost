import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import styles from './AddNewUserForm.module.scss';
import {getAllRoles} from "../../../http/usersAPI";
import {getAllTeams} from "../../../http/SettingsAPI";
import {registerNewUser} from "../../../http/userAPI";
import {openPopup} from "../../../store/Popup/actions";
import {useDispatch, useSelector} from "react-redux";
import {getUserTeam, getUserTeamId} from "../../../store/User/selectors";
import {validationSchema} from "./validationSchema";
const AddNewUserForm = ({role}) => {
    const [roles, setRoles] = useState([])
    const [teams, setTeams] = useState([])
    const dispatch = useDispatch()
    const userTeam = useSelector(getUserTeam)
    const userTeamId = useSelector(getUserTeamId)

    useEffect( () => {
        if (role === "admin") {
            (async () => {
                const fetchedRoles = await getAllRoles()
                const fetchedTeams = await getAllTeams()
                console.log(fetchedTeams);

                setRoles(fetchedRoles.data)
                setTeams(fetchedTeams.data)
            })()
        } else {
            setRoles([{name: "manager", id: 3}])
            setTeams([{name: userTeam, id: userTeamId}])
        }
    }, [role, userTeam, userTeamId])


    return (
        <Formik
            enableReinitialize={true}
            validationSchema={validationSchema}
            initialValues={{
                email: '',
                password: '',
                roleId: roles.length !==0 && roles[0].id,
                teamId: teams.length !==0 && teams[0].id,
            }}
            onSubmit={async (values, {resetForm}) => {
                const {email, password, roleId, teamId} = values
                const register = await registerNewUser(email, password, roleId, teamId)
                dispatch(openPopup(register.data))
                resetForm()
            }}
        >
            {() => {
                return (
                    <div>
                        <Form className={styles.form}>
                            <div>
                                <Field className={styles.form__input} type="text" name='email' placeholder="user email"/>
                                <ErrorMessage name="email" component="div" className={styles.form__error}/>
                            </div>

                            <div>
                                <Field className={styles.form__input} type="text" name='password' placeholder="user password"/>
                                <ErrorMessage name="password" component="div" className={styles.form__error}/>
                            </div>


                            <Field as="select" name='teamId' className={styles.form__input}>

                                {teams.map((team, id) => {
                                    return <option key={id} value={team.id}>{team.name}</option>
                                })}

                            </Field>


                            <Field as="select" name='roleId' className={styles.form__input}>

                                {roles.map((role, id) => {
                                    return <option key={id} value={role.id}>{role.name}</option>
                                })}

                            </Field>

                            <button className={styles.form__button} type="submit">Create new user</button>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    );
};

export default AddNewUserForm;