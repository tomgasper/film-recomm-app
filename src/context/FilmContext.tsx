import { createContext } from "react";

// Global objecet / Source of truth
// Components renders will be based on this object
// Any change to this object will trigger rerender of the dependent components

export type FilmContextType = {
    isFetching: boolean,
    shownAllRecommendations: boolean,
    shouldGetNewFilm: boolean,
    filmContext: {
        id: string;
        imageURL: string;
        title: string;
        summary: string;
        rating: number;
    },
    setIsFetching : Function;
    setShownAllRecommendations : Function;
    setShouldGetNewFilm : Function;
    setFilmContext : Function;
}

export const FilmContext = createContext<FilmContextType>({
    isFetching: false,
    shownAllRecommendations : false,
    shouldGetNewFilm : true,
    filmContext: {
        id : "",
        imageURL : "",
        title : "",
        summary : "",
        rating : 0
    },
    setIsFetching : () => {},
    setShownAllRecommendations : () => {},
    setShouldGetNewFilm : () => {},
    setFilmContext : () => {}
});