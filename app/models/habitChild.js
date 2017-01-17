const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitChildSchema = new Schema({
    date: String,
    completed: Boolean,
});

module.exports =  habitChildSchema;