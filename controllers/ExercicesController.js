const bcrypt = require('bcrypt');
const ExerciseService = require('../services/ExercicesService');

class ExerciseController {
  constructor() {
    this.exerciseService = new ExerciseService();
  }

  async createExercise(req, res) {
    try {
      const exercise = await this.exerciseService.createExercise(req.body);
      res.status(201).json(exercise);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getExercises(req, res) {
    try {
      const exercises = await this.exerciseService.getExercises();
      res.status(200).json(exercises);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ExerciseController;
