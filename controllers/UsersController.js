const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  constructor(userService) {
    this.userService = userService;
    this.createUser = this.createUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.login = this.login.bind(this);
  }

  async createUser(req, res) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', {
        expiresIn: '1h',
      });

      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
