const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
//const bookRouter = express.Router();
// We need a port to listen on
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api', bookRouter);
// Two params. Every time I have a get, I respond with a function which has two variables passed in.
// We can see what's going on on the request and do stuff to when we sendn back the response.
app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

// RESTful webservice with node js -> getting data - filtering with query string