import React, {useState} from 'react';
import styles from './ImageCard.module.scss';
import {useDispatch} from "react-redux";
import {openPopup} from "../../../store/Popup/actions";

const ImageCard = ({fileName, imageName, id, aspectRatio, width}) => {
    const [tooltipStyle, setTooltipStyle] = useState({ display: 'none' });
    const dispatch = useDispatch()
    const link = `${process.env.REACT_APP_API_URL}/api/image/getCroppedImage/${id}/crop${aspectRatio}/${width}`

    const handleClick = async (e) => {
        e.preventDefault()
        console.log('created link - ', link);

        try {
            await navigator.clipboard.writeText(link);
            dispatch(openPopup('Link copied to clipboard'))
        } catch (err) {
            dispatch(openPopup('Failed to copy link to clipboard', true))
        }
    }


    const handleMouseMove = (e) => {
        setTooltipStyle({
            display: 'block',
            position: 'fixed',
            left: `${e.clientX + 10}px`,
            top: `${e.clientY + 10}px`
        });
    };

    const handleMouseLeave = () => {
        setTooltipStyle({ display: 'none' });
    };

    return (
            <div className={styles.card} onClick={handleClick}>

                    <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/${fileName}`}
                        alt="Preview"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className={styles.card__image}
                    />
                    <div className={styles.tooltip} style={tooltipStyle}>click to copy image link</div>
                <div>
                    <h5 className={styles.card__title}>{imageName}</h5>
                    <div>{link}</div>
                </div>

            </div>
    );
};

export default ImageCard;