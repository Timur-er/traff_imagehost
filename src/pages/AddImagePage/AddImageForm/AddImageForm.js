import React, {useRef, useState} from "react";
import { centerAspectCrop } from "./utils/CenterAspectCrop";
import "react-image-crop/dist/ReactCrop.css";
import ImagePreview from "./ImagePreview/ImagePreview";
import styles from './AddImageForm.module.scss';
import {addImage} from "../../../http/ImagesAPI";
import {useDispatch} from "react-redux";
import {openPopup} from "../../../store/Popup/actions";


const AddImageForm = () => {
    const dispatch = useDispatch()
    const [imgSrc, setImgSrc] = useState("");
    const [image, setImage] = useState(null)
    const [originalWidth, setOriginalWidth] = useState()
    const [originalHeight, setOriginalHeight] = useState()
    const fileRef = useRef()
    const [crops, setCrops] = useState({
        crop1x1: null,
        crop4x3: null,
        crop16x9: null,
        crop2x1: null,
        crop3x2: null,
    });

    const aspectRatios = [
        { aspect: 1, cropKey: 'crop1x1' },
        { aspect: 4/3, cropKey: 'crop4x3' },
        { aspect: 16/9, cropKey: 'crop16x9' },
        { aspect: 2, cropKey: 'crop2x1' }, // is 2 working the same as 2/1
        { aspect: 3/2, cropKey: 'crop3x2' }
    ];

    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            setImage(e.target.files[0])
            reader.addEventListener("load", () => {
                setImgSrc(reader.result?.toString() || "");
                const image = new Image();
                image.addEventListener('load', function() {
                    const {width, height} = image;

                    setOriginalWidth(width / 100)
                    setOriginalHeight(height / 100)

                    aspectRatios.forEach(({aspect, cropKey}) => {
                        const cropped = centerAspectCrop(width, height, aspect)
                        setCrops(prevCrops => ({
                            ...prevCrops,
                            [cropKey]: cropped
                        }))
                    })
                });
                image.src = reader.result?.toString() || "";
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    const handleSubmit = async () => {
        const formData = new FormData();

        formData.append('image', image)

        const testArray = [];
        Object.entries(crops).forEach(([key, cropData]) => {
            let test = {
                format: key,
                height: Math.floor(cropData.height * originalHeight),
                width: Math.floor(cropData.width * originalWidth),
                left: Math.floor((cropData.x) * originalWidth),
                top: Math.floor((cropData.y) * originalHeight)
            }
            testArray.push(test)
        })

        const cropsDataString = JSON.stringify(testArray);
        formData.append('crops', cropsDataString);
        formData.append('width', originalWidth)
        formData.append('height', originalHeight)

        console.log('submit images');
        const response  = await addImage(formData)
        dispatch(openPopup(response.data.message, response.status !== 200))
        setImgSrc("")
        setImage(null)
        fileRef.current.value = "";
    }

    const renderPreview = aspectRatios.map(({aspect, cropKey}) => {
        return (
            <ImagePreview
                key={cropKey}
                imgSrc={imgSrc}
                aspect={aspect}
                setCrop={(newCrop) => setCrops({ ...crops, [cropKey]: newCrop })}
            />
        )
    })

    return (
        <div>
            <div className={styles.form}>
                <label htmlFor="file-upload" className={styles.form__customUpload}>
                    Upload Image
                </label>
                <input id="file-upload" className={styles.form__hiddenInput} ref={fileRef} type="file" accept="image/*" onChange={onSelectFile} />
                <b className={styles.form__hint}>please, specify the file name to make it easier to find in the future </b>
            </div>

            {imgSrc && renderPreview}

            <div className={styles.form__buttonWrapper}>
                {imgSrc && (
                    <button className={styles.form__submit} onClick={handleSubmit}>
                        save
                    </button>
                )}
            </div>
        </div>
    );
}

export default AddImageForm;