import { useContext } from "react";

import { AppContext } from "../../context/AppContext";

import { onButtonClick } from "../../handlers/handleButtonClick";

type SubmitButtonProps = {
    type: "accept" | "reject",
    id: string
}

const SubmitButton = ( { type, id } : SubmitButtonProps ) => {
    // Need global setters
    const { fetchInfo, setFetchInfo } = useContext(AppContext);

    return (
        <button onClick={ () => onButtonClick( fetchInfo, setFetchInfo, type, id) } data-testid={`button-${type}`} className={`button-${type}`}>{type}</button>
    )
}

export default SubmitButton;