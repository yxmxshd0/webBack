import  {session} from "../services/session.js"
import { ObjectId } from "mongodb";
import { CreateModel, FindAllModels, FindModelById, DeleteModel, PatchModel } from "../services/models.js";

export async function HandlerCreateModel(req, res, next)
{
    try
    {
        let model = {
            Name:"",
            Author:"",
            Type:"",
            DataCreated: new Date(),
            DataUpdated: new Date(),
        };

        let data = req.body;

        if (data.Name && data.Author && data.Type)
        {
        model.Name = data.Name
        model.Author = data.Author
        model.Type = data.Type
        await CreateModel(session, model);
        res.send("Модель добавлена!")
        }
        else
        {
            res.status(400).send("Неверные данные для модели")
        }


    }
    catch(err)
    {
        next(err)
    }
}


export async function HandlerFindAllModels (req, res, next)
{
    try
    {
        let data = await FindAllModels(session);
        res.json(data)
    }
    catch(err)
    {
        next(err)
    }
}

export async function HandlerFindModelByID (req, res, next)
{
    try
    {
        let id = req.params.id
        if (ObjectId.isValid(id))
        {
        res.json(await FindModelById(session, id))
        }
        else
        res.status(400).send("Нет такого ID");
    }
    catch(err)
    {
        next(err)
    }
}

export async function HandlerDeleteModel(req, res, next)
{
    try
    {
        let id = req.params.id;
        if (ObjectId.isValid(id))
        {
            let Operation = await DeleteModel(session, id);
            if (Operation!=null)
            {
                // res.json(Operation);
                res.status(200).send("Модель удалена")
            }
            else
            {
                res.status(400).send("Нет такого ID");
            }
        }
        else
            res.status(400).send("Нет такого ID");
    }
    catch(err)
    {
        next(err)
    }
}

export async function HandlerPatchModel(req, res, next)
{
    try
    {
        let id  = req.params.id

        if (ObjectId.isValid(id))
        {

            let model = 
            {
                DataUpdated: new Date()
            };

            let data = req.body;

            if (data.Name!=undefined)
            {
                model.Name = data.Name
            }

            if (data.Author!=undefined)
            {
                model.Author = data.Author
            }

            if (data.Type!=undefined)
            {
                model.Type = data.Type
            }

            console.log(data.Type)

            let opperation = await PatchModel(session, id, model);
            if (opperation!=null)
            {
                res.json(opperation);
            }
            else
            {
                res.send("Нет модели(")
            }
        }
        else
        {
            res.status(400).send("Не найден ID")
        }
    }
    catch(err)
    {
        next(err)
    }
}
