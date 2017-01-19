const express = require('express');
const router = express.Router();
const mainController = require('./controllers/main.controller');
const habitsController = require('./controllers/habits.controller');

router.get('/', mainController.showHome);

router.get('/habits', habitsController.showHabits);

router.get('/habits/seed', habitsController.seedHabits);

router.get('/habits/create', habitsController.showCreate);
router.post('/habits/create', habitsController.processCreate);

router.get('/habits/:slug', habitsController.showSingle);

router.get('/habits/:slug/edit', habitsController.showEdit);
router.post('/habits/:slug/edit', habitsController.processEdit);

module.exports = router;