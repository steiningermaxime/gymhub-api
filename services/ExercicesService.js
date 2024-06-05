const sqlite3 = require('sqlite3').verbose();
const dbPath = './database.db';

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
});

class ExerciseService {
  constructor() {}

  createExercise(exercise) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO exercises (name, description, type, durationRecommended) VALUES (?, ?, ?, ?)',
        [
          exercise.name,
          exercise.description,
          exercise.type,
          exercise.durationRecommended,
        ],
        (err) => {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, ...exercise });
        }
      );
    });
  }
  

  getExercises() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM exercises', [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  // Ajoutez d'autres méthodes de service si nécessaire
}

module.exports = new ExerciseService();
