import React, { useState,useEffect } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

type ImageDisplayProps = {
    imgURL : string
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imgURL } : ImageDisplayProps) => {
    const [ imgLoaded, setImgLoaded ] = useState(false);

    useEffect(() => {
        setImgLoaded(false);
    }, [imgURL] );

    const imgStyle = imgLoaded ? undefined : { display: "none" };

    return ( 
        <div className="imgdisplay-container" >
            <div className='imgdisplay-placeholder'>{ !imgLoaded && <ImagePlaceholder /> }</div>
            <img
            alt="card"
            data-testid="image-display"
            src={imgURL}
            onLoad={ () => setImgLoaded(true) }
            onError= {(err) => { console.log(err); setImgLoaded(false); }}
            style={imgStyle} />
        </div>
    )
}

export default ImageDisplay;