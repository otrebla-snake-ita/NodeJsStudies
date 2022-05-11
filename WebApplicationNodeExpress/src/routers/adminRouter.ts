import express from 'express';
import Debug from 'debug';
//import mongodb from 'mongodb';
//import { MongoClient } from 'mongodb'; // Destructuring

const { MongoClient } = require('mongodb');
const sessions = require('../data/sessions.json');
const debug: Debug.Debugger = Debug('app:adminRouter');
const adminRouter: express.Router = express.Router();

adminRouter.route('/').get((req, res) => {
    const url = 'mongodb+srv://dbUser:uaEFAlXaV8n2Bs1t@globalmantics.dqiix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            debug('Connected to mongo');

            const db = client.db(dbName); // Created here if it does not exist.

            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response);
        } catch (error: any) {
            debug(error.stack);
        }
    }())
});

export {adminRouter};