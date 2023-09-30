import ConnectionToMongoDB from "../../config/config.js"

let URL = "mongodb://127.0.0.1:27017"

let DB = await ConnectionToMongoDB(URL);

export let session = await DB;
