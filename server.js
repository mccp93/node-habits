require('dotenv').config();

const express       = require('express');
const app           = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const expressValidator = require("express-validator");


app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUnitialized: false
}));

app.use(flash());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(expressLayouts);

mongoose.connect(process.env.DB_URI);

app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

app.use(require('./app/routes'));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});

