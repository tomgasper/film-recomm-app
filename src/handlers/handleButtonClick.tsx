import { mockAPICall } from "../utils/mockBackend";
import { handleQueryNewFilm } from "./handleQuery";

// Need to provide callback functions
export const onButtonClick = (  setShouldGetNewFilm : Function,
                                setFilmContext : Function,
                                isFetching: boolean,
                                setIsFetching : Function,
                                type: "accept" | "reject",
                                id: string ) => {
    if (isFetching)
    {   
        console.log("You're already fetching data! Wait until response!");
        return;
    }

    setIsFetching(true);
    handleSubmit(type, id)
    .then( (res : any) : any => res.json() )
    .then( ( json : any ) => handleSuccesfulPUTrequest(setShouldGetNewFilm, isFetching, setIsFetching, setFilmContext, json)) 
    .catch( ( json : any ) => handleUnsuccesfulPUTrequest(setIsFetching, json) )
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

const handleSuccesfulPUTrequest = (setShouldGetNewFilm : Function, isFetching : boolean, setIsFetching: Function, setFilmContext : Function, res : { status: string } ) => 
{
    console.log("[PUT REQUEST RESPOND]: " + res.status);

    // setIsFetching(false);
    // Might be buggy to comment it out but allows for nice continuous loader animation

    // Immedietely ask for new reccomendation after succesful PUT request
    setShouldGetNewFilm(true);
    return;
}

const handleUnsuccesfulPUTrequest = (err : any, setIsFetching : Function) => 
{
    console.log(err);
    
    // Inform about fetch status and don't ask for new recommendation
    setIsFetching(false);
}