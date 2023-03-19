import sadFaceSVG from "./sadface.svg"

const NoRecommendationCard = () =>
{
    return (
        <div className="card-container">
            <div data-testid="norecommendation-card" className="no-recommendations-container">
                <img alt="sad face" data-testid="img-sadface" src={sadFaceSVG} />We ran out of recommendations for you! Check again later!</div>
        </div>   
    )
}

export default NoRecommendationCard;