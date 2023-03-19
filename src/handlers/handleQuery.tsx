import { mockAPICall } from "../utils/mockBackend";
import { FilmInfoType, FetchInfoType, ReactSetStateType } from "../global/types";


const handleSuccesfulQuery =  ( fetchInfo : FetchInfoType, setFetchInfo : ReactSetStateType, json : FilmInfoType) : void => {
    setFetchInfo( (fetchInfo) => ({...fetchInfo, isFetching: false, fetchedObj: json}));
}

const handleUnsuccesfulQuery = (fetchInfo : FetchInfoType, setFetchInfo : ReactSetStateType, err : any) : void => {
    setFetchInfo( (fetchInfo) => ({...fetchInfo, isFetching: false, serverMsg: "[SERVER ERROR]: " + err}));
    console.log(err);
}

export const handleQueryNewFilm = (fetchInfo : FetchInfoType, setFetchInfo : ReactSetStateType) : void => {
    setFetchInfo((fetchInfo) => ({...fetchInfo, isFetching: true}));

    mockAPICall("/recommendation", { method: "GET",
                            credentials: "same-origin",
                            headers: {
                              "Content-type": "application/json" }})
                            .then( (res : any) => res.json())
                            .then( (json : any) => handleSuccesfulQuery(fetchInfo, setFetchInfo, json))
                            .catch( (err : any) => handleUnsuccesfulQuery(fetchInfo,setFetchInfo, err));
}