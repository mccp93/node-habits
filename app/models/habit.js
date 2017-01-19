const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const habitChild = require('./habitChild');

var habitSchema = new Schema({
    name: String,
    description: String,
    slug: {
        type: String,
        unqiue: true
    },
    habitChildren: [habitChild]
});

habitSchema.pre('save', function(next){
    this.slug = slugify(this.name);
    next();
});

const habitModel = mongoose.model('Habit', habitSchema);

module.exports = habitModel;

function slugify(text){
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}