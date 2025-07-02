const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.patch('/:id', userController.updateUsers);

module.exports = router;