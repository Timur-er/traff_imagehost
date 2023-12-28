import React from 'react';
import {useRoutes} from 'react-router-dom';
import {userRoutes} from "./routes";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import Menu from "../components/Menu/Menu";
import {getIsUserLoading} from "../store/User/selectors";
import {useSelector} from "react-redux";

const UserRoutes = () => {
    const routes = userRoutes.map(route => {
        return {path: route.path, element: route.element}
    })

    const renderRoutes = useRoutes([...routes])

    const isUserLoading = useSelector(getIsUserLoading)

    // if (isUserLoading) { return <Loader fixed={true} /> }
    if (isUserLoading) { return <h1>LOADING</h1> }


    return (
        <>
            <Menu />
            <PageWrapper>
                {renderRoutes}
            </PageWrapper>
        </>
    );
};

export default UserRoutes;