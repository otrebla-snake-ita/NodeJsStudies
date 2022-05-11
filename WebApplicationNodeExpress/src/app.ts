//const express = require('express');
import express from 'express';
import chalk from 'chalk';
import Debug from 'debug';
import morgan from 'morgan';
import path, { dirname } from 'path'; // this is already part of node.js


const app: express.Express = express();
const debug: Debug.Debugger = Debug('app');
const PORT: string | number = process.env.PORT || 3000;

import {sessionsRouter} from './routers/sessionsRouter';
import {adminRouter} from './routers/adminRouter';

//const debug = require('debug')('app'); // For one line

// This gives a lot of vs few informations from 'morgan'
//app.use(morgan('combined'));
app.use(morgan('tiny'));

// middleware to handle static files (which have no calculations from express, just html). If we have something in "public" matching static files 
// we just go here and not further.
app.use(express.static(path.join(__dirname, '../public/'))); 


// We are setting the template engine. We are setting a variable with a specific name to store the path related to it. In this case the variable is named 'views'. 
// We have Express look for src/views to find templates associated with ejs.
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    //res.send('Hello from my app!');
    res.render('index', { title: "destruction course", data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
    debug('Listening on port ' + chalk.green(PORT));
});

