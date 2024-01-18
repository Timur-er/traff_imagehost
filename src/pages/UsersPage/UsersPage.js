import React, {useEffect, useRef, useState} from 'react';
import {getAllUsers} from "../../http/usersAPI";
import styles from './UsersPage.module.scss';
import AddNewTeamLeadForm from "./AddNewTeamLeadForm/AddNewTeamLeadForm";
import {createNewTeam} from "../../http/SettingsAPI";
import {useDispatch} from "react-redux";
import {openPopup} from "../../store/Popup/actions";

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const newTeamRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllUsers();
                setUsers(response.data)
            } catch (error) {
                console.error('Failed to fetch images', error);
            }
        })();
    }, []);


    const renderUsers = users.map(({email, Role}, id) => {
        return (
            <div key={id} className={styles.usersTable__row}>
                <div>{email}</div>
                <div>{Role.name}</div>
                <div>team name...</div>
                <button className={styles.button}>remove user</button>
            </div>
        )
    })

    const createNewTeamHandler = async () => {
        const teamName = newTeamRef.current.value
        const response = await createNewTeam(teamName)
        dispatch(openPopup(response.data.message, response.status !== 200))
    }


    return (
        <div className={styles.wrapper}>

            <div className={styles.formsWrapper}>
                <div className={styles.team_wrapper}>
                    <h2 className={styles.title}>Create team</h2>
                    <input className={styles.input} ref={newTeamRef} type="text" placeholder="add new team"/>
                    <button className={styles.button} onClick={() => createNewTeamHandler()}>
                        create new team
                    </button>
                </div>
                {/*<div>*/}
                {/*    <h2 className={styles.title}>Add new user</h2>*/}
                {/*    <AddNewUserForm/>*/}
                {/*</div>*/}
                <div>
                    <h2 className={styles.title}>Add new team lead</h2>
                    <AddNewTeamLeadForm/>
                </div>
            </div>

            <div>
                <h2 className={styles.title}>Existed users</h2>

                <div className={styles.usersTable}>
                    {renderUsers}
                </div>
            </div>
        </div>
    );
};

export default UsersPage;