import React from "react";
import {ADD_IMAGE, SHOW_IMAGES, USERS_PAGE} from "./consts";
import AddImagePage from "../pages/AddImagePage/AddImagePage";
import ImagesPreviewPage from "../pages/ImagesPreviewPage/ImagesPreviewPage";
import UsersPage from "../pages/UsersPage/UsersPage";
import {ADMIN, MANAGER, TEAM_LEAD} from "./roles";

export const userRoutes = [
    {
        title: 'Add Image',
        path: ADD_IMAGE,
        element: <AddImagePage />,
        icon: 'addImageIcon',
        permission: [
            ADMIN,
            TEAM_LEAD,
            MANAGER
        ]
    },
    {
        title: 'Images preview',
        path: SHOW_IMAGES,
        element: <ImagesPreviewPage />,
        icon: 'creatorIcon',
        permission: [
            ADMIN,
            TEAM_LEAD,
            MANAGER
        ]
    },
    {
        title: 'Users page',
        path: USERS_PAGE,
        element: <UsersPage />,
        icon: 'settingsIcon',
        permission: [
            ADMIN,
            TEAM_LEAD,
        ]
    },
]