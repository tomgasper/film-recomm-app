import star from "./star.svg";

const RaitingStar = ()  => {
    return (
        <div className="rating-container-star"><img alt="star" data-testid="star" src={star} /></div>
    )
}

export default RaitingStar;