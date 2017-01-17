require('dotenv').config();

const express       = require('express');
const app           = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(expressLayouts);

mongoose.connect(process.env.DB_URI);

app.use(require('./app/routes'));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});

