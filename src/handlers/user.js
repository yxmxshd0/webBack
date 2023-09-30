import { CreateUser, DeleteApiKey } from "../services/user.js"
import {session} from "../services/session.js"

export async function HandlerCreateUser(req, res, next)
{
    try
    {
        let obj = {}
        let data = req.body

        if (data.name !== undefined){
            let user = await CreateUser(session, data)
            obj.apikey = user
            return res.send(JSON.stringify(obj))
        }
        return res.status(400).send("Отправь имя")
    }
    catch(err)
    {
        err.status = 500
        next(err)
    }
}


export async function HandlerDeleteUser(req, res, next)
{
    try
    {
        let obj = {}
        obj.apikey = req.headers.apikey

        console.log(obj.apikey)


        let result = await DeleteApiKey(session, obj)
        if (result)
        {
            return res.send("Удалён")
        }else{
            return res.status(400).send("Не найден")
        }
    }
    catch(err)
    {
        err.status = 500
        next(err)
    }
}