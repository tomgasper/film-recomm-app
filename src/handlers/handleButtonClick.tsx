import { FetchInfoType } from "../global/types";
import { mockAPICall } from "../utils/mockBackend";
import { handleQueryNewFilm } from "./handleQuery";

import { ReactSetStateType } from "../global/types";

// Need to provide callback functions
export const onButtonClick = (  fetchInfo : FetchInfoType,
                                setFetchInfo : ReactSetStateType,
                                type: "accept" | "reject",
                                id: string ) => {
    if (fetchInfo.isFetching)
    {   
        const msg = "You're already fetching data! Wait until response!";
        setFetchInfo( (fetchInfo) => ({ ...fetchInfo,
                                        serverMsg: msg }));
        return;
    }

    setFetchInfo( (fetchInfo) => ({ ...fetchInfo , isFetching: true }));
    handleSubmit(type, id)
    .then( (res : any) : any => res.json() )
    .then( ( json : any ) => handleSuccesfulPUTrequest(fetchInfo, setFetchInfo, json))
    .catch( ( err : any ) => handleUnsuccesfulPUTrequest(err, fetchInfo, setFetchInfo))
}

export const handleSubmit = (type : "accept" | "reject", id: string ) => {
    return mockAPICall(`/recommendations/${id}/${type}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            data: 
            {
                id : id,
                type: type
            }
        })
    });
}

const handleSuccesfulPUTrequest = (fetchInfo: FetchInfoType, setFetchInfo: ReactSetStateType, res : { status: string } ) => 
{
    const succesfulServerResponse: string = "[PUT REQUEST RESPOND]: " + res.status;
    
    // Not setting isFetching to false might be buggy but allows for nice continuous loader animation
    // Remove if there are any problems with state

    // Immedietely ask for new reccomendation after succesful PUT request
    setFetchInfo( (fetchInfo) => ( {...fetchInfo, shouldGetNewFilm : true,
                                                serverMsg: succesfulServerResponse}) );

    return;
}

const handleUnsuccesfulPUTrequest = (err : any, fetchInfo: FetchInfoType, setFetchInfo : ReactSetStateType) => 
{
    const unsuccesfulServerResponse: string = "[PUT REQUEST RESPOND]: ERROR: " + err;

    // Inform about fetch status
    setFetchInfo((fetchInfo) => ({ ...fetchInfo , isFetching: false,
                                                   serverMsg: unsuccesfulServerResponse }));

    console.log(err);
}