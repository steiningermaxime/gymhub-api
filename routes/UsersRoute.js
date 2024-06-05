const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UsersController');
const UserService = require('../services/UsersService');

const userController = new UserController(UserService);

router.post('/', userController.createUser.bind(userController));
router.get('/', userController.getUsers.bind(userController));
router.post('/login', userController.login.bind(userController));


module.exports = router;
