import SubmitButton from "./Buttons/SubmitButton";
import ImageDisplay from "./Image/ImageDisplay";
import FilmDescription from "./FilmDescription";
import CardHeader from "./CardHeader";
import Rating from "./Raiting/Rating";

import { useContext } from "react";
import { DisplayInfoType, FilmInfoType } from "../global/types";

import NoRecommendationCard from "./NoRecommendationCard/NoRecommendationCard"

const Card = ({ filmInfo, shownAllRecommendations} :
              { filmInfo : FilmInfoType; shownAllRecommendations : boolean }) => {
    const recommendationCard = (
        <div className="card-container">
            <ImageDisplay imgURL={filmInfo.imageURL}/>
            <div className="filminfo-container">
                <CardHeader title={filmInfo.title} />
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