import { useEffect, useState } from "react";

import { handleQueryNewFilm } from "./handlers/handleQuery";

import { AppContext} from "./context/AppContext";

import InfoBanner from "./components/InfoBanner";
import Card from "./components/Card";
import Loader from "./components/Loader"

import { isCorrectFilmObject } from "./utils/utils";

export default function App() {
  // Display info that is local state passed down to other components to draw our scene
  const [ displayInfo, setDisplayInfo ] = useState({
    filmInfo : {
      id : "",
      imageURL : "",
      title : "",
      summary : "",
      rating : 0
    },
    shownAllRecommendations: false
  });

  // GLOBAL OBJECT/CONTEXT that components from the bottom use to send server requests and check current server <=> client communication status
  const [ fetchInfo, setFetchInfo ] = useState({
    isFetching: false,
    shouldGetNewFilm: true,
    serverMsg: "",
    fetchedObj: {}
  })

  const globalAppContextObj = { fetchInfo, setFetchInfo };

  // Fetch data on mount and when informed to do so
  useEffect( () => {
    if (fetchInfo.shouldGetNewFilm == true)
    { 
      setFetchInfo( (fetchInfo) => ({...fetchInfo, shouldGetNewFilm: false}));
      handleQueryNewFilm(fetchInfo, setFetchInfo);
    }
  }, [ fetchInfo.shouldGetNewFilm ]);

  // Simple logic to handle server response, more of a placeholder that should be replaced with a serious check
  // Just checking if object sent from the server is in the right format
  useEffect( () => {
    const receivedObj : any = fetchInfo.fetchedObj;

    if ( isCorrectFilmObject(receivedObj) )
    {
        // No more recommendations to show
        if (receivedObj.id == "_RECERROR_01")
        {
            console.log("Shown all recommendations!");
            setDisplayInfo((displayInfo) => ({...displayInfo, shownAllRecommendations: true}));
        }
        else
         {
            // Object is correct and we havent ran out of recommendations
            // Can set new display info
            setDisplayInfo((displayInfo) => ({...displayInfo, filmInfo : receivedObj}));
        }
    }
    else
    {
      // Final front end check showed that we received data in a wrong format
      // We can inform the user about wrong server response here
    }
  }, [fetchInfo.fetchedObj] ) 

  return (
    <div className="container">
      <AppContext.Provider value={ globalAppContextObj  }>
        { fetchInfo.serverMsg ? <InfoBanner msg={ fetchInfo.serverMsg } /> : null } 
        {fetchInfo.isFetching ? <Loader /> : null }
        <Card filmInfo={ displayInfo.filmInfo } shownAllRecommendations={ displayInfo.shownAllRecommendations } />
      </AppContext.Provider>
    </div>
  );
}