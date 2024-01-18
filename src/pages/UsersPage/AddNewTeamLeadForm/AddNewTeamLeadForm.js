import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from "formik";
import styles from './AddNewTeamLeadForm.module.scss';
import {getAllRoles} from "../../../http/usersAPI";
import {getAllTeams} from "../../../http/SettingsAPI";
import {registerNewUser} from "../../../http/userAPI";
import {openPopup} from "../../../store/Popup/actions";
import {useDispatch} from "react-redux";
const AddNewTeamLeadForm = () => {
    const [roles, setRoles] = useState([])
    const [teams, setTeams] = useState([])
    const dispatch = useDispatch()

    useEffect( () => {
        (async () => {
            const fetchedRoles = await getAllRoles()
            const fetchedTeams = await getAllTeams()

            setRoles(fetchedRoles.data)
            setTeams(fetchedTeams.data)
        })()
    }, [])


    return (
        <Formik
            enableReinitialize={true}
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
                            <Field className={styles.form__input} type="text" name='email' placeholder="user email"/>
                            <Field className={styles.form__input} type="text" name='password' placeholder="user password"/>

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

                            <button className={styles.form__button} type="submit">Create new team lead</button>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    );
};

export default AddNewTeamLeadForm;