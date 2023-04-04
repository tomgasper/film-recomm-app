import { mockDB } from "./mockDB";

export function mockAPICall(path : string, requestInfo : any ) : Promise<any>
{
    // delay in ms
    const delay = 300;

    return new Promise((resolve, reject) => {
        setTimeout( () => localFetch(path,requestInfo), delay);

        function localFetch(path: string, requestInfo : any )
        {
            // Get the last 6 characters from path argument
            // So we can check what kind of respond to generate
            // Hacky approach just for mocking purposes

            const numOfLastChars = 6;
            const lastPathChars = path.slice(path.length-numOfLastChars, path.length);

            // Handle GET requests
            if (requestInfo.method == "GET")
            {
                if (path == "/recommendation")
                {
                    // When asking mock DB for a recommendation it's taken from its local array,
                    // returned and removed from local array

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