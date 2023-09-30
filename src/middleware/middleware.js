import {GetApiKey} from "../services/user.js"
import {session} from "../services/session.js"

export default function IsEmptyComments(req, res, next)
{
    let data = req.body;

    if ( data.name===undefined || data.Age === undefined || data.comments === undefined) 
    {
        return res.status(400).send("Пустой комментарий")
    }

    next()
}


export function QueryParamView(req, res, next)
{
    let data = req.query.apikey;
    // console.log(data);
    if (data!=="1234"&&req.method!=="GET")
    {
        return res.status(403).send("Неверный API ключ");

    }

    next();
}


export function BadUrlReq(req, res, next)
{
    return res.status(404).send("Bad URL")
}

export function ErrorValid(err, req, res, next)
{
    err.status = 500
    return res.status(err.status).send(err.message)
}

export async function Authorisation(req, res, next)
{
    try
    {
        let obj = {}

        obj.apikey = req.headers.apikey

        let getKey = await GetApiKey(session, obj)

        if (getKey == null && req.method !== "GET" && req.url !== "/login") {
            return res.status(403).send('Нет доступа')
        }else{
            next()
        }
    }catch(err)
    {
        next(err)
    }


}