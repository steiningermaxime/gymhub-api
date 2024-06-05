const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController');
const UserService = require('../services/UsersService');

const userService = new UserService();
const userController = new UserController(userService);

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.post('/login', userController.login);

module.exports = router;
