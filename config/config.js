import {MongoClient} from "mongodb"


export default async function ConnectionToMongoDB(URL)
{
    try
    {
        const client = new MongoClient(URL)
        await client.connect();
        console.log("Stable conection")

        return client;
    }
    catch(err)
    {
        console.log("looool")
        process.exit(1);
    }
}


