const express = require('express');

const app = express();

// We need a port to listen on
const port = process.env.PORT || 3000;

// Two params. Every time I have a get, I respond with a function which has two variables passed in.
// We can see what's going on on the request and do stuff to when we sendn back the response.
app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
