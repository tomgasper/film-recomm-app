import sadFaceSVG from "./sadface.svg"

const NoRecommendationCard = () =>
{
    return (
        <div className="card-container">
            <div className="no-recommendations-container">
                <img src={sadFaceSVG} />
            We ran out of recommendations for you! Check again later!</div>
        </div>   
    )
}

export default NoRecommendationCard;