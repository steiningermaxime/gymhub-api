const sqlite3 = require('sqlite3').verbose();
const dbPath = './database.db';
const bcrypt = require('bcrypt');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
});

class UserService {
  constructor() {}

  async createUser(user) {
    try {
      // Hacher le mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Remplacer le mot de passe en texte clair par le mot de passe haché
      user.password = hashedPassword;

      // Insérer l'utilisateur dans la base de données
      const result = await db.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [user.username, user.email, user.password]
      );

      // Renvoie l'ID de l'utilisateur inséré
      return { id: result.lastID };
    } catch (error) {
      throw error;
    }
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

}

module.exports = new UserService();