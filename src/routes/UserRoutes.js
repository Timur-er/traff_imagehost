import React from 'react';
import {useRoutes} from 'react-router-dom';
import {userRoutes} from "./routes";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import Menu from "../components/Menu/Menu";
import {getUserRole} from "../store/User/selectors";
import {useSelector} from "react-redux";

const UserRoutes = () => {
    const userRole = useSelector(getUserRole)
    const availableRoutes = userRoutes.filter(route => route.permission.includes(userRole))

    const routes = availableRoutes.map(route => {
        return {path: route.path, element: route.element}
    })

    const renderRoutes = useRoutes([...routes])

    return (
        <>
            <Menu availableRoutes={availableRoutes}/>
            <PageWrapper>
                {renderRoutes}
            </PageWrapper>
        </>
    );
};

export default UserRoutes;