export async function CreateUser(session, user)
{  
    let data = Date.now()
    user.apikey = data
    await session.db("firstDB").collection("api").insertOne(user)

    
    let seva = await session.db("firstDB").collection("api").findOne({"apikey": user.apikey})  
    return seva.apikey
}

export async function GetApiKey(session, user)
{   
    let obj = await session.db("firstDB").collection("api").findOne({apikey: Number(user.apikey)})

    
    if (obj){
        return obj
    }else{
        return null
    }
}

export async function DeleteApiKey(session, user)
{   
    let obj = await session.db("firstDB").collection("api").findOne({apikey: Number(user.apikey)})
    if (obj){
        return await session.db("firstDB").collection("api").deleteOne({apikey: Number(user.apikey)})
    }else{
        return null
    }
}