import React, {useEffect, useState} from 'react';
import {getAllUsers} from "../../http/usersAPI";
import styles from './UsersPage.module.scss';
import AddNewUserForm from "./AddNewUserForm/AddNewUserForm";
import {useSelector} from "react-redux";
import {getUserRole} from "../../store/User/selectors";
import AddNewTeamForm from "./AddNewTeamForm/AddNewTeamForm";

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const role = useSelector(getUserRole)

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllUsers();
                setUsers(response.data)
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        })();
    }, []);


    const renderUsers = users.map(({email, Role, Team}, id) => {
        return (
            <div key={id} className={styles.usersTable__row}>
                <div>{email}</div>
                <div>{Role.name}</div>
                <div>{Team.name}</div>
                <button className={styles.button}>remove user</button>
            </div>
        )
    })


    return (
        <div className={styles.wrapper}>

            <div className={styles.formsWrapper}>
                {role === 'admin' && <AddNewTeamForm />}
                <div>
                    <h2 className={styles.title}>Add new user</h2>
                    <AddNewUserForm role={role}/>
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