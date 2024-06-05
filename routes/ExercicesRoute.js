const express = require('express');
const router = express.Router();
const ExerciseController = require('../controllers/ExercicesController');

const exerciseController = new ExerciseController();

router.post('/', exerciseController.createExercise.bind(exerciseController));
router.get('/', exerciseController.getExercises.bind(exerciseController));

module.exports = router;
