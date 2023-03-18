import { useState, useContext } from "react";

import { FilmContext } from "../../context/FilmContext";

import { onButtonClick } from "../../handlers/handleButtonClick";

type SubmitButtonProps = {
    type: "accept" | "reject",
    id: string
}

const SubmitButton = ( { type, id } : SubmitButtonProps ) => {
    // Need global setters
    const { isFetching, setIsFetching, setShouldGetNewFilm , setFilmContext } = useContext(FilmContext);

    return (
        <button onClick={ () => onButtonClick( setShouldGetNewFilm, setFilmContext, isFetching, setIsFetching, type, id) } className={`button-${type}`}>{type}</button>
    )
}

export default SubmitButton;