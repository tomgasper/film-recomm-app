import { mockAPICall } from "../utils/mockBackend";
import { isCorrectFilmObject } from "../utils/utils"

type FilmInfoType = {
    id : string;
    imageURL : string;
    title : string;
    summary : string;
    rating : number;
}

const handleSetFilmContext = (setShownAllRecommendations: Function, setFilmContext: Function, setShouldGetNewFilm : Function, json : FilmInfoType) =>
{
    // Function to make sure the data received is correct
    // before displaying it to user

    console.log("im checking json!");

    if ( isCorrectFilmObject(json) )
    {
        // No more recommendations to show
        if (json.id == "_RECERROR_01")
        {
            console.log("Shown all recommendations!");
            setShownAllRecommendations(true);
        }
        else
        {
            // Object is correct and we havent run out of recommendations
            // can set new film context
            setFilmContext(json);
        }
    }
}

const handleSuccesfulQuery =  ( setShownAllRecommendations:Function, setIsFetching : Function, setFilmContext : Function, setShouldGetNewFilm : Function, json : any) => {
    setIsFetching(false);
    handleSetFilmContext( setShownAllRecommendations, setFilmContext, setShouldGetNewFilm, json );
}

const handleUnsuccesfulQuery = (setIsFetching : Function, err : any) => {
    setIsFetching(false);
    console.log(err);
}

export const handleQueryNewFilm = (setShownAllRecommendations:Function, isFetching: boolean, setIsFetching : Function, setShouldGetNewFilm : Function, setFilmContext : Function) => {
    if (isFetching)
    {
        console.log("You're already fetching something else! Wait!");
    }

    setIsFetching(true);
    console.log("Calling handle new query!");
    mockAPICall("/recommendation", { method: "GET",
                            credentials: "same-origin",
                            headers: {
                              "Content-type": "application/json" }})
                            .then( (res : any) => res.json() )
                            .then( (json : any) => handleSuccesfulQuery(setShownAllRecommendations, setIsFetching, setFilmContext, setShouldGetNewFilm, json))
                            .catch( (err : any) => handleUnsuccesfulQuery(setIsFetching, err));
}