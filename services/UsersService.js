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
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;

      const result = await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO users (email, password) VALUES (?, ?)',
          [user.email, user.password],
          function (err) {
            if (err) {
              return reject(err);
            }
            resolve(this.lastID);
          }
        );
      });

      return { id: result };
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

  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, row) => {
          if (err) {
            return reject(err);
          }
          resolve(row);
        }
      );
    });
  }
}

module.exports = UserService;
