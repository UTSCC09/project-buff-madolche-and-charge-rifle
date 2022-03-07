const { MongoClient } = require('mongodb');
//const mongoose = require('mongoose');
// or as an es module:
//import { MongoClient } from 'mongodb'


export async function db() {
    // Connection URL
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    // Database Name
    const dbName = 'user';
  // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('user');
    const collection = db.collection('documents');
    const insert = await collection.insertOne({admin: "admin"})
    console.log("inserted:",insert);
    return "done"
//   const findResult = await collection.find({}).toArray();
//   console.log('Found documents =>', findResult);  
}


