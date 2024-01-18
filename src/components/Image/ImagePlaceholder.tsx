import imgPlaceholderSVG from "./placeholder.svg"
import Loader from "../../components/Loader"

const ImagePlaceholder = () => {
    return (
        <div data-testid="image-placeholder" className="img-loader-container">
            <div className="img-loader-spinner-container">
                    <div className="loading-spinner2"></div> 
            </div>
        </div>
    )
}

export default ImagePlaceholder;