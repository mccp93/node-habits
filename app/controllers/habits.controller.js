const Habit = require('../models/habit');

module.exports = {
    showHabits: (req, res) => {
        res.render('pages/habits', { habits: habits });
    },

    showSingle: (req, res) => {
        const habit = { name: 'Meditation', slug: 'meditation', description: 'Sitting on a cushion and concentration on the breath' };
        res.render('pages/single', { habit: habit });
    },

    seedHabits: (req, res) => {
        const habits = [
            { name: 'Meditation', description: 'Sitting on a cushion and concentrating on the breath', habitChildren: []},
            { name: 'Running', description: 'One foot infront of the other, repeat.', habitChildren: []},
            { name: 'Journal', description: 'Writing stuff into a notebook.', habitChildren: []}
        ];

        Habit.remove({}, () => {
            for (habit of habits) {
                var newHabit = new Habit(habit);

                for(var x = 1;  x < 32; x++){
                    newHabit.habitChildren[x] = {
                        date: "" + x + "/01/2017",
                        completed: false
                    } 
                }

                newHabit.save();
            }
        });



        res.send("Database seeded.");
    }
}