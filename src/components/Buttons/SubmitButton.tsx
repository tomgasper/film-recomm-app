import { useContext } from "react";

import { AppContext } from "../../context/AppContext";

import { onButtonClick } from "../../handlers/handleButtonClick";

import acceptSVG from "./accept.svg";
import rejectSVG from "./reject.svg";

type SubmitButtonProps = {
    type: "accept" | "reject",
    id: string
}

const SubmitButton = ( { type, id } : SubmitButtonProps ) => {
    // Need global setters
    const { fetchInfo, setFetchInfo } = useContext(AppContext);

    let icon = type === "accept" ? acceptSVG : rejectSVG;


    return (
        <button onClick={ () => onButtonClick( fetchInfo, setFetchInfo, type, id) } data-testid={`button-${type}`} className={`button-${type}`}>
            <div className="button-inside" >{<img src={icon} />}</div>
            </button>
    )
}

export default SubmitButton;