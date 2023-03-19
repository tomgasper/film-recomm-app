import imgPlaceholderSVG from "./placeholder.svg"

const ImagePlaceholder = () => {
    return(
        <img alt="placeholder" data-testid="image-placeholder" src= {imgPlaceholderSVG} />
    )
}

export default ImagePlaceholder;