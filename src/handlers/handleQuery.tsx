import { mockAPICall } from "../utils/mockBackend";
import { isCorrectFilmObject } from "../utils/utils"
import { FilmInfoType, AppContextType, FetchInfoType, ReactSetStateType } from "../global/types";

const handleSetFilmContext = (fetchInfo : FetchInfoType, setFetchInfo : ReactSetStateType, json : FilmInfoType) =>
{
    // Set fetched object via global setter available via AppContext object
    setFetchInfo( (fetchInfo) => ({...fetchInfo, fetchedObj: json}) );
}

const handleSuccesfulQuery =  ( fetchInfo : FetchInfoType, setFetchInfo : ReactSetStateType, json : FilmInfoType) => {
    setFetchInfo( (fetchInfo) => ({...fetchInfo, isFetching: false}));
    handleSetFilmContext( fetchInfo, setFetchInfo, json );
}

const handleUnsuccesfulQuery = (setIsFetching : Function, err : any) => {
    setIsFetching(false);
    console.log(err);
}

export const handleQueryNewFilm = (fetchInfo : FetchInfoType, setFetchInfo : ReactSetStateType) => {
    setFetchInfo((fetchInfo) => ({...fetchInfo, shouldGetNewFilm: false}));

    if (fetchInfo.isFetching)
    {
        console.log("You're already fetching something else! Wait!");
    }

    setFetchInfo((fetchInfo) => ({...fetchInfo, isFetching: true}));
    console.log("Calling handle new query!");
    mockAPICall("/recommendation", { method: "GET",
                            credentials: "same-origin",
                            headers: {
                              "Content-type": "application/json" }})
                            .then( (res : any) => res.json() )
                            .then( (json : any) => handleSuccesfulQuery(fetchInfo, setFetchInfo, json))
                            .catch( (err : any) => handleUnsuccesfulQuery(setFetchInfo, err));
}