const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUsers);
router.patch('/:id', userController.updateUsers);

module.exports = router;