export type FilmInfoType = {
    id : string;
    imageURL : string;
    title : string;
    summary : string;
    rating : number;
}

export type ReactSetStateType = 
    React.Dispatch<React.SetStateAction<{
        isFetching: boolean;
        shouldGetNewFilm: boolean;
        serverMsg: string,
        fetchedObj: {};
    }>>

export type DisplayInfoType =
{
    filmInfo: FilmInfoType;
    shownAllRecommendations: boolean;

    setFilmInfo : Function;
    setShownAllRecommendations : Function;
}

export type FetchInfoType = {
    isFetching: boolean;
    shouldGetNewFilm: boolean;
    serverMsg: string;
    fetchedObj: any;
}

export type AppContextType = {
        fetchInfo: FetchInfoType;
        setFetchInfo : ReactSetStateType;
}