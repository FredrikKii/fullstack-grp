import {
    MongoClient,
    Db,
    Collection,
    WithId,
    ObjectId,
    InsertOneResult,
    DeleteResult,
    UpdateResult,
} from "mongodb";
import { Hat } from "../models/hat-model.js";
// Vet inte varför, men var tvungen att ha detta för att det skulle fungera.
import dotenv from "dotenv";
dotenv.config();

const con: string | undefined = process.env.CONNECTION_STRING;
// const test: string | undefined = process.env.TEST;

async function connectToDatabaseFindHats(): Promise<Collection<Hat>> {
    if (!con) {
        console.log("No connection string, check your .env file!");
        throw new Error("No connection string");
    }

    const client: MongoClient = await MongoClient.connect(con);
    const db: Db = await client.db("webshop");
    return db.collection<Hat>("hats");
}

// Hitta alla hattar
async function getAllHats(): Promise<WithId<Hat>[]> {
    const col = await connectToDatabaseFindHats();
    const result: WithId<Hat>[] = await col.find({}).toArray();
    return result;
}

// Hitta en hatt
async function getOneHat(id: string): Promise<WithId<Hat> | null> {
    const col = await connectToDatabaseFindHats();
    const result: WithId<Hat> | null = await col.findOne({
        _id: new ObjectId(id),
    });
    return result;
}

// Lägg till hatt
async function insertOneHat(hat: Hat): Promise<ObjectId | null> {
    const col = await connectToDatabaseFindHats();
    const result: InsertOneResult<Hat> = await col.insertOne(hat);
    if (!result.acknowledged) {
        console.log("Could not insert hat!");
        return null;
    }
    return result.insertedId;
}

// Ta bort en hatt
async function deleteOneHat(hatId: ObjectId): Promise<ObjectId | null> {
    const col = await connectToDatabaseFindHats();
    const result: DeleteResult = await col.deleteOne({ _id: hatId });
    return hatId;
}

//  Uppdaterar en befintlig keps.. vrf har jag skrivit hatt överallt?
async function updateOneHat(id: string, updatedHat: Hat): Promise<any> {
    const col = await connectToDatabaseFindHats();
    const result: UpdateResult<Hat> = await col.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedHat }
    );

    return result;
}

export {
    connectToDatabaseFindHats,
    getAllHats,
    getOneHat,
    insertOneHat,
    deleteOneHat,
    updateOneHat,
};
