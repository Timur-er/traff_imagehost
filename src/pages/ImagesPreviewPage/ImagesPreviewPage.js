import React, {useEffect, useState} from 'react';
import {getAllTeamImages} from "../../http/ImagesAPI";
import ImageCard from "./ImageCard/ImageCard";
import styles from './ImagesPreviewPage.module.scss';
import Pagination from "../../components/Pagination/Pagination";
import {useDebounce} from "../../hooks/useDebounce.hook";
import {useSelector} from "react-redux";
import {getUserTeam} from "../../store/User/selectors";

const ImagesPreviewPage = () => {
    const [images, setImages] = useState(null)
    const [aspectRatio, setAspectRatio] = useState('1x1');
    const [width, setWidth] = useState(500)
    const [pageCount, setPageCount] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay
    const teamName = useSelector(getUserTeam)
    const crops = [
        { label: '1x1', value: 'crop1x1' },
        { label: '4x3', value: 'crop4x3' },
        { label: '16x9', value: 'crop16x9' },
        { label: '2x1', value: 'crop2x1' },
        { label: '3x2', value: 'crop3x2' },
    ];


    useEffect(() => {
        (async () => {
            try {
                // move teamId from here to JWT???
                const teamImages = await getAllTeamImages(teamName, activePage, debouncedSearchQuery);
                setImages(teamImages.data.rows)
                setPageCount(Math.ceil(teamImages.data.count / 8))
            } catch (error) {
                console.error('Failed to fetch images', error);
            }
        })();
    }, [activePage, debouncedSearchQuery]);




    const renderImages = images && images.map((image) => {
        const {imageName, fileName, id} = image
        return (
           <ImageCard
               key={id}
               imageName={imageName}
               fileName={fileName}
               id={id}
               aspectRatio={aspectRatio}
               width={width}
           />
        )
    })


    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Images preview page</h1>

            <div className={styles.input__wrapper}>

                <select
                    value={aspectRatio}
                    onChange={(e) => {
                        setAspectRatio(e.target.value)
                    }}
                    className={styles.input}
                >
                    <option value="">Select crop ratio</option>
                    {crops.map((crop) => (
                        <option key={crop.label} value={crop.label}>
                            {crop.label}
                        </option>
                    ))}
                </select>

                <input
                    className={styles.input}
                    type="text"
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder='change width'
                />

                <input
                    className={styles.input}
                    placeholder="search query..."
                    type="text"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className={styles.imagesWrapper}>
                {renderImages}
            </div>

            <Pagination activePage={activePage} setActivePage={setActivePage} count={pageCount}/>
        </div>
    );
};

export default ImagesPreviewPage;