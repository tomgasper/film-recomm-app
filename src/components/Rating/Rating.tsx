import { useEffect, useState } from "react";
import RaitingStar from "./RatingStar";

const Rating = ( { rating } : { rating : number } ) => {

    const [ stars , setStars ] = useState<any[]>([]);
    useEffect( () => { renderStars() }, [rating] );
    
    const renderStars = () => 
    {
        setStars([]);
        for (let i = 0; i < Math.round(rating); i++)
        {
            // handle edge case
            if (stars.length >= 10) return;
            
            setTimeout( () => {
                setStars(  stars  => [...stars, <RaitingStar key={i} />] );
            }, 100+(i*50));
        }
        return stars;
    }

    return (
        <div data-testid="rating-container" className="rating-container">{ stars }</div>
    )
}

export default Rating;