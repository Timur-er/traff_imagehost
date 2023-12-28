import React, {useState} from 'react';
import styles from './ImageCard.module.scss';

const ImageCard = ({fileName, imageName, id, aspectRatio, width}) => {
    const [tooltipStyle, setTooltipStyle] = useState({ display: 'none' });

    const handleClick = async (e) => {
        e.preventDefault()
        const link = `http://localhost:8000/api/image/getCroppedImage/${id}/crop${aspectRatio}/${width}`
        console.log('created link - ', link);

        try {
            await navigator.clipboard.writeText(link);
            console.log('Link copied to clipboard');
        } catch (err) {
            console.error('Failed to copy link to clipboard', err);
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
                        src={`http://localhost:8000/uploads/${fileName}`}
                        alt="Preview"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className={styles.card__image}
                    />
                    <div className={styles.tooltip} style={tooltipStyle}>click to copy image link</div>
                <div>
                    <h5 className={styles.card__title}>{imageName}</h5>
                </div>

            </div>
    );
};

export default ImageCard;