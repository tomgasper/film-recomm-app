import SubmitButton from "./Buttons/SubmitButton";
import ImageDisplay from "./Image/ImageDisplay";
import FilmDescription from "./FilmDescription";
import FilmTitle from "./FilmTitle";
import Rating from "./Rating/Rating";

import { FilmInfoType } from "../global/types";

import NoRecommendationCard from "./NoRecommendationCard/NoRecommendationCard"

const Card = ({ filmInfo, shownAllRecommendations} :
              { filmInfo : FilmInfoType; shownAllRecommendations : boolean }) => {
    const recommendationCard = (
        <div data-testid="recommendation-card" className="card-container">
            <ImageDisplay imgURL={filmInfo.imageURL}/>
            <div className="filminfo-container">
                <FilmTitle title={filmInfo.title} />
                <FilmDescription desc={filmInfo.summary} />
                <Rating rating={filmInfo.rating} />
                <div className="buttons-container">
                    <SubmitButton type="accept" id={filmInfo.id} />
                    <SubmitButton type="reject" id={filmInfo.id} />
                </div>
            </div>
        </div>
    )
    return shownAllRecommendations ? <NoRecommendationCard /> : recommendationCard
}

export default Card;