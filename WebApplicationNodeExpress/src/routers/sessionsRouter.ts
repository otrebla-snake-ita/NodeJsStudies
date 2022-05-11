import express from 'express';
import Debug from 'debug';
import { speakerService } from '../services/speakerService';

const { MongoClient, ObjectID } = require('mongodb');
const debug: Debug.Debugger = Debug('app:sessionRouter');
const sessions = require('../data/sessions.json');

const sessionsRouter: express.Router = express.Router();



sessionsRouter.route('/').get((req, res) => {
    const url = 'mongodb+srv://dbUser:uaEFAlXaV8n2Bs1t@globalmantics.dqiix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            debug('Connected to mongo');

            const db = client.db(dbName); // Created here if it does not exist.

            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions', { sessions });
        } catch (error: any) {
            debug(error.stack);
        }
    } ());

        // res.render('sessions', { sessions });
        // res.render('sessions', {sessions: [
        //     { title: 'Session 1', description: 'This is session 1'},
        //     { title: 'Session 2', description: 'This is session 2'},
        //     { title: 'Session 3', description: 'This is session 3'},
        //     { title: 'Session 4', description: 'This is session 4'}
        // ]})
    });

sessionsRouter.route('/:id').get((req, res) => {
        const id = req.params.id

        const url = 'mongodb+srv://dbUser:uaEFAlXaV8n2Bs1t@globalmantics.dqiix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            debug('Connected to mongo');

            const db = client.db(dbName); // Created here if it does not exist.

            const session = await db
                .collection('sessions')
                .findOne({_id: new ObjectID(id)});
            
            const speaker : any = await speakerService().getSpeakerById(session.speakers[0].id);
            session.speaker = speaker.data;

            res.render('session', { 
                session//: sessions[id]
            });
            //res.render('sessions', { sessions });
        } catch (error: any) {
            debug(error.stack);
        }
    } ());

        
    });

export {sessionsRouter};