const Habit = require('../models/habit');
const seedData = require('../../utils/seed');

module.exports = {
    showHabits: showHabits,
    showSingle: showSingle,
    seedHabits: seedHabits,
    showCreate: showCreate,
    processCreate: processCreate,
    showEdit: showEdit,
    processEdit: processEdit
}

function showHabits(req, res) {
    Habit.find({}, (err, habits) => {
        if (err) {
            res.status(404);
            res.send('Habits not found.')
        }

        res.render('pages/habits', { habits: habits });
    })
}

function showSingle(req, res) {
    Habit.findOne({ slug: req.params.slug }, (err, habit) => {
        if (err) {
            res.status(404);
            res.send('Habits not found.')
        }

        res.render('pages/single', 
            { 
                habit: habit,
                success: req.flash('success')
            });
    });

}

function seedHabits(req, res) {
    Habit.remove({}, () => {
        for (seed of seedData) {
            var newHabit = new Habit(seed);
            
            seedDates(newHabit);

            newHabit.save();
        }
    });

    res.send("Database seeded.");
}

function seedDates(newHabit){
     for (var x = 0; x < 31; x++) {
        if(x % 3 == 0){
            newHabit.habitChildren[x] = {
                date: "" + x + "/01/2017",
                completed: false
            }
        }else{
            newHabit.habitChildren[x] = {
                date: "" + x + "/01/2017",
                completed: true
            }
        }
    }
}

function showCreate(req, res){
    res.render('pages/create', { errors: req.flash('errors')});
}

function processCreate(req, res){
    req.checkBody('name', 'Name is required.').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    const errors = req.validationErrors();
    
    if(errors){
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect('/habits/create');
    }

    const habit = new Habit({
        name: req.body.name,
        description: req.body.description
    });

    seedDates(habit);

    habit.save((err) => {
        if(err){
            throw err;
        }

        req.flash('success', 'Habit has been created successfully.');
        
        res.redirect("/habits/" + habit.slug);
    });
}

function showEdit(req, res){
    Habit.findOne({ slug: req.params.slug }, (err, habit) => {
        if(err){
            res.status(404);
            res.redirect('/habits');
        }

        res.render('pages/edit', { habit: habit });
    });
}

function processEdit(req, res){
    req.checkBody('name', 'Name is required.').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    const errors = req.validationErrors();
    
    if(errors){
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect(`/habits/${req.params.slug}/edit`);
    }

    Habit.find({ slug: req.params.slug }, (err, habit) => {
        console.log("got here :D");
        habit.name = req.body.name;
        habit.description = req.body.description;
        
        habit.save((err) => {
            if(err){
                throw err;
            }

            req.flash('success', 'Habit has been updated.')
            res.redirect('/habits');
        })
    });

    res.render('pages/edit');
}