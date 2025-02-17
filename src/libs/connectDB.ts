// lib/connectDB.ts (server-side only)
import { MongoClient, Db } from "mongodb";

const uri = process.env.DB_URI || "";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

if (!process.env.DB_URI) {
    throw new Error("Please add your MongoDB URI to .env");
}

export async function connectDB() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();
    cachedClient = client;
    cachedDb = db;

    console.log("Connected to MongoDB");
    return { client, db };
}
