const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

app.get('/',(req,res) => res.send('Hello'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`));