import React from "react";
import {ADD_IMAGE, SHOW_IMAGES} from "./consts";
import AddImagePage from "../pages/AddImagePage/AddImagePage";
import ImagesPreviewPage from "../pages/ImagesPreviewPage/ImagesPreviewPage";

export const userRoutes = [
    {
        title: 'Add Image',
        path: ADD_IMAGE,
        element: <AddImagePage />,
        icon: 'addImageIcon',
    },
    {
        title: 'Images preview',
        path: SHOW_IMAGES,
        element: <ImagesPreviewPage />,
        icon: 'creatorIcon',
    },
]