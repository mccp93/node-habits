const express = require('express');
const router = express.Router();
const mainController = require('./controllers/main.controller');
const habitsController = require('./controllers/habits.controller');

router.get('/', mainController.showHome);

router.get('/habits', habitsController.showHabits);
router.get('/habits/seed', habitsController.seedHabits);
router.get('/habits/:slug', habitsController.showSingle);

module.exports = router;