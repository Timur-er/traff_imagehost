import React, {useRef} from 'react';
import styles from "../UsersPage.module.scss";
import {createNewTeam} from "../../../http/SettingsAPI";
import {openPopup} from "../../../store/Popup/actions";
import {useDispatch} from "react-redux";

const AddNewTeamForm = () => {
    const newTeamRef = useRef()
    const dispatch = useDispatch()

    const createNewTeamHandler = async () => {
        const teamName = newTeamRef.current.value
        const response = await createNewTeam(teamName)
        // there is some problem here
        dispatch(openPopup(response.data.message, response.status !== 200))
    }

    return (
        <div className={styles.team_wrapper}>
            <h2 className={styles.title}>Create team</h2>
            <input className={styles.input} ref={newTeamRef} type="text" placeholder="add new team"/>
            <button className={styles.button} onClick={() => createNewTeamHandler()}>
                create new team
            </button>
        </div>
    );
};

export default AddNewTeamForm;