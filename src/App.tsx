import { useEffect, useState } from "react";
import { FilmContext, FilmContextType } from "./context/FilmContext";
import { handleQueryNewFilm } from "./handlers/handleQuery";

import InfoBanner from "./components/InfoBanner";
import Card from "./components/Card";
import Loader from "./components/Loader"

export default function App() {
  // Here we hold the global state that is detached from the presentation layer
  // It's then passed down to the Card component and used as props for child components
  // This way we are more flexible with presentation of the fetched data but still have the ground truth
  // to make sure everything is displayed according to it
  const [ filmContext, setFilmContext ] = useState({
    id : "",
    imageURL : "",
    title : "",
    summary : "",
    rating : 0
  });
  const [ isFetching, setIsFetching ] = useState(false);
  const [ shownAllRecommendations, setShownAllRecommendations ] = useState(false);
  const [ shouldGetNewFilm, setShouldGetNewFilm ] = useState(true);

  const globalFilmContextObj = {
    isFetching, shownAllRecommendations, shouldGetNewFilm, filmContext,
    setIsFetching, setShownAllRecommendations, setShouldGetNewFilm, setFilmContext
  };

  // Test Comment 252

  // Fetch data on mount and when informed to do so
  useEffect( () => {
    if (shouldGetNewFilm)
    {
      setShouldGetNewFilm(false);
      handleQueryNewFilm(setShownAllRecommendations, isFetching, setIsFetching, setShouldGetNewFilm, setFilmContext);
    }
  }, [ shouldGetNewFilm ]);

  return (
    <div className="container">
      <FilmContext.Provider value={ globalFilmContextObj }>
        {isFetching ? <Loader /> : null }
        <Card />
      </FilmContext.Provider>
    </div>
  );
}