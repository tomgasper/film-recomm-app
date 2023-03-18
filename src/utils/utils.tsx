type FilmInfoType = {
    id : string;
    imageURL : string;
    title : string;
    summary : string;
    rating : number;
}

export function getRandomInt(max : number) {
    return Math.floor(Math.random() * max);
}

export const delay = (time : number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

export const isCorrectFilmObject = (obj : FilmInfoType) : boolean  =>
{
    if (obj)
    {
        if (typeof obj.id == "string" &&
            typeof obj.imageURL == "string" &&
            typeof obj.title == "string" &&
            typeof obj.summary == "string" &&
            typeof obj.rating == "number") return true;
    }
    return false;
}
