import { ObjectId } from "mongodb";


export async function CreateComment(session, comment)
{
    await session.db("firstDB").collection("comment").insertOne(comment)
}

export async function FindAllComments(session)
{
    return session.db("firstDB").collection("comment").find().toArray();
    
}

export async function FindOneComments(session, id)
{
    return session.db("firstDB").collection("comment").findOne({_id:new ObjectId(id)});
    
}