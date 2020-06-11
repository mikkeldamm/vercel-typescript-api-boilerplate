/*

///
/// MYSQL EXAMPLE
///

import mysql from 'serverless-mysql';
import { escape as dbEscape } from 'mysql';

export const escape = dbEscape;

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE_NAME
    }
});

export const query = async <T>(query): Promise<T> => {
    try {
        const results = await db.query(query);
        await db.end();
        return results as T;
    } catch (error) {
        console.log('db error', error);
        return null;
    }
};
*/

/*

///
/// MONGODB EXAMPLE
///

import { MongoClient, Db } from 'mongodb';

let cachedMongoClient: MongoClient | null = null;
let cachedMongoDb: Db;

export const connectDb = async () => {

    if (cachedMongoDb && cachedMongoClient && cachedMongoClient.isConnected()) {
        return cachedMongoDb;
    }

    cachedMongoClient = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING as string, { useUnifiedTopology: true });
    cachedMongoDb = cachedMongoClient.db();
    return cachedMongoDb as Db;
}
*/