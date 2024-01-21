import React, { useRef, useState } from 'react';
import ReactCrop from "react-image-crop";
import {centerAspectCrop} from "../utils/CenterAspectCrop";
import {useDebounceEffect} from "../utils/useDebounceEffect";
import {canvasPreview} from "../utils/canvasPreview";
import styles from './ImagePreview.module.scss';

const ImagePreview = ({imgSrc, aspect, setCrop}) => {
    const [localCrop, setLocalCrop] = useState(null)
    const [completedCrop, setCompletedCrop] = useState(null);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const onImageLoad = (e) => {
        if (aspect) {
            const { width, height } = e.currentTarget;
            const crop = centerAspectCrop(width, height, aspect);
            setLocalCrop(crop);
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {

                await canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                );
            }
        },
        100,
        [completedCrop],
    );

    const changeCrop = (c) => {
        setLocalCrop(c)
        setCrop(c)
    }

    return (
        <div className={styles.imagePreview__wrapper}>

            {!!imgSrc && (
                <div className={styles.imagePreview__cropWrapper}>
                    <ReactCrop
                        crop={localCrop}
                        onChange={(_, percentCrop) => changeCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                        minHeight={100}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                </div>
            )}
            {!!completedCrop && (
                    <div className={styles.imagePreview__canvasWrapper}>
                        <canvas
                            ref={previewCanvasRef}
                            className={styles.imagePreview__canvas}
                        />
                    </div>
            )}
        </div>
    );
};

export default ImagePreview;