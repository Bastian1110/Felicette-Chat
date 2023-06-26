import { MongoClient } from "mongodb";
import argon2 from "argon2";
import { MONGO_URI } from "$env/static/private";

const client = new MongoClient(MONGO_URI);
try{
    await client.connect()
    console.log("Ok : DB Conenction success")
}catch(err){
    console.log("Panic : DB Conenction failed")
}
const collection = client.db('felicette-chat').collection('users')


export async function getUser(username : string) {
    try{
        const result = await collection.findOne({username});
        return result ? result : null
    }catch(error){
        return null
    }
}
