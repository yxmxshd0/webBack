import  {CreateComment, FindAllComments, FindOneComments} from "../services/comments.js"
import  {session} from "../services/session.js"
import { ObjectId } from "mongodb";


export async function HandlerCreateComment(req, res, next)
{
    try
    {
        let data = req.body
        await CreateComment(session, data)        
        return res.send("Комментарий создан")
    }
    catch(err)
    {
        next(err)
    }
}

export async function HandlerFindAllComments(req,res,next)
{
    console.log("lol")
    try
    {
        let data = await FindAllComments(session)
        return res.send(JSON.stringify(data))  
    }
    catch(err)
    {
        next(err)
    }
}

export async function HandlerFindOneComments(req,res,next)
{
    
    try
    {
        let id = req.params.id;
        if (ObjectId.isValid(id))
        {
            return res.send(await FindOneComments(session,id));
        }

    }
    catch
    {
        next(err)
    }
}

