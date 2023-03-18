import { createContext } from "react";

import { AppContextType } from "../global/types";

// Global objecet / Source of truth
// Components renders will be based on this object
// Any change to this object will trigger rerender of the dependent components

export const AppContext = createContext<AppContextType>({
    fetchInfo: {
        isFetching: false,
        shouldGetNewFilm: true,
        serverMsg : "",
        fetchedObj: {},
    },
    setFetchInfo: () => {}
});