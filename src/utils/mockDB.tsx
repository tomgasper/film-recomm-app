import { data } from  "./localData";

type FilmInfoType = {
    id : string;
    imageURL : string;
    title : string;
    summary : string;
    rating : number;
}

class MockDB
{
    data : FilmInfoType[];

    constructor(data : FilmInfoType[])
    {
        // Use local data and shuffle it
        // so the user doesnt get the same recommendations always in the same order
        this.data = data;
        this.shuffleArray(this.data);
    }

    shuffleArray(arr : FilmInfoType[])
    {
        // Randomize array in-place using Durstenfeld shuffle algorithm //
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    getRecommendation()
    {
        if (this.data.length > 0)
        {
            return this.data.pop();
        }
        else
        {
            // If there's no more film recommendations inform the client
            const noMoreRecommendationsIndicator : FilmInfoType = {
                id : "_RECERROR_01",
                imageURL : "",
                title : "",
                summary : "",
                rating : -1,
            }

            return noMoreRecommendationsIndicator;
        }
    }
}

export const mockDB = new MockDB(data);