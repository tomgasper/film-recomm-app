import { mockDB } from "./mockDB";

export function mockAPICall(path : string, requestInfo : any )
{
    return new Promise((resolve, reject) => {
        setTimeout(() => localFetch(path,requestInfo), 250);

        function localFetch(path: string, requestInfo : any )
        {
            // Get the last 6 characters from path argument
            // So we can check what kind of respond to generate
            const numOfLastChars = 6;
            const lastPathChars = path.slice(path.length-numOfLastChars, path.length);
            

            // Handle GET requests
            if (requestInfo.method == "GET")
            {
                if (path == "/recommendation")
                {
                    // Simulate using recommendation system
                    //let randomIndx : number = getRandomInt(data.length);
                    // Use response similar to using window.fetch
                    // const dataJSON = JSON.stringify(getData(randomIndx));

                    const recommendation = mockDB.getRecommendation();
                    const dataJSON = JSON.stringify(recommendation);
                    const res = new Response(dataJSON);
                    return resolve(res);
                }
                else
                {
                    // Incorrect request
                    reject(new Error("Incorrect request path: " + lastPathChars));
                }
            }
            // Handle PUT requests
            else if ( requestInfo.method == "PUT")
            {
                if (lastPathChars == "accept" || lastPathChars == "reject" )
                {
                    console.log("[BACKEND]: " + "User reaction: " + lastPathChars );

                    const resObj = {
                        status: "OK"
                    }

                    const dataJSON = JSON.stringify(resObj);
                    const res = new Response(dataJSON);

                    return resolve(res);
                }
                else
                {
                    // Incorrect request
                    return reject(new Error("Incorrect request path: " + lastPathChars));
                }
            }
            // If the request method is neither GET or PUT
            // then it must be an incorrect request as we only allow GET and PUT requests in this app
            else
            {
                 // Incorrect request
                 return reject(new Error("Incorrect method request: " + requestInfo.method));
            }
        }
    })
}