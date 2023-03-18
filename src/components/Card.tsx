import SubmitButton from "./Buttons/SubmitButton";
import ImageDisplay from "./Image/ImageDisplay";
import FilmDescription from "./FilmDescription";
import CardHeader from "./CardHeader";
import Rating from "./Raiting/Rating";

import { useContext } from "react";
import { FilmContext, FilmContextType } from "../context/FilmContext";

import NoRecommendationCard from "./NoRecommendationCard/NoRecommendationCard"

const Card = () => {
    const { isFetching, filmContext, shownAllRecommendations } = useContext<FilmContextType>(FilmContext);

    const recommendationCard = (
        <div className="card-container">
            <ImageDisplay imgURL={filmContext.imageURL}/>
            <div className="filminfo-container">
                <CardHeader title={filmContext.title} />
                <FilmDescription desc={filmContext.summary} />
                <Rating rating={filmContext.rating} />
                <div className="buttons-container">
                    <SubmitButton type="accept" id={filmContext.id} />
                    <SubmitButton type="reject" id={filmContext.id} />
                </div>
            </div>
        </div>
    )

    return shownAllRecommendations ? <NoRecommendationCard /> : recommendationCard
}

export default Card;