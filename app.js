const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose.connect(db)
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

app.get('/',(req,res) => res.send('Hello'));
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`));