const bcrypt = require('bcrypt');

class UserController {
  constructor(userService) {
    this.userService = userService;
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
        const { username, password } = req.body;
  
        // Trouvez l'utilisateur dans la base de données en utilisant le nom d'utilisateur
        const user = await this.userService.getUserByUsername(username);
  
        // Si aucun utilisateur n'est trouvé, renvoyez une erreur
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        // Vérifiez le mot de passe en utilisant bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
  
        // Si le mot de passe ne correspond pas, renvoyez une erreur
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        // Si la connexion réussit, renvoyez l'utilisateur
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
module.exports = UserController;
