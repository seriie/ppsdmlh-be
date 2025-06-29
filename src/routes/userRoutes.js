const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

router.get('/', userController.getAllUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;