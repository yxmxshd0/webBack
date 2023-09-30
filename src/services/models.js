import { ObjectId } from "mongodb";


export async function CreateModel(session, model)
{
    await session.db("firstDB").collection("model").insertOne(model)
}


export async function FindAllModels(session)
{
    return await session.db("firstDB").collection("model").find().project({_id:1, Name:1}).toArray()
}

export async function FindModelById(session, id)
{
    return await session.db("firstDB").collection("model").findOne({_id: new ObjectId(id)})
}

export async function DeleteModel(session, id)

{
    let obj = await session.db("firstDB").collection("model").findOne({_id: new ObjectId(id)})
    
    
    if (obj)
    {
        return await session.db("firstDB").collection("model").deleteOne({_id: new ObjectId(id)})
    }
    else
    {
        return null;
    }
}

export async function PatchModel(session, id, model)
{
    let obj = await session.db("firstDB").collection("model").findOne({_id: new ObjectId(id)})

    if (obj)
    {
        return await session.db("firstDB").collection("model").updateOne({_id: new ObjectId(id)}, {$set: model})
    }
    else
    {
        return null;
    }
}
