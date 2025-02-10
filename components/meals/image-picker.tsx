"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

type ImagePickerProps = {
    label: string;
    name: string
}

export default function  ImagePicker({ label, name }: ImagePickerProps) {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [pickedImage, setPicketImage] = useState<string | ArrayBuffer | null>(null);

    function handlePickClick() {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            setPicketImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPicketImage(fileReader.result as string);
        }

        fileReader.readAsDataURL(file);

    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>
                {label}
            </label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picket yet.</p>}
                    {pickedImage &&
                        <Image 
                            src={pickedImage as string} 
                            alt={"The image selected by user"}
                            fill
                        />
                    }
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageInputRef}
                    onChange={handleImageChange}
                />
                <button
                    className={classes.button}
                    type="button"
                    onClick={handlePickClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
}