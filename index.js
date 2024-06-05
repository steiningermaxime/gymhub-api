const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UsersRoute');
const exerciseRoutes = require('./routes/ExercicesRoute');
const sqlite3 = require('sqlite3').verbose();
const dbPath = './database.db';

const app = express();
app.use(bodyParser.json());

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// Créer les tables si elles n'existent pas
const initDb = () => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT,
            password TEXT
          )`);

  db.run(`CREATE TABLE IF NOT EXISTS exercises (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            type TEXT,
            durationRecommended INTEGER
          )`);
};

initDb();
app.use('/users', userRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/users/login', userRoutes,);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
