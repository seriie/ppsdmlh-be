const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

router.get('/', getAllUsers);

module.exports = router;