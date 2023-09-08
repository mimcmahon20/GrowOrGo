const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getUser);
router.put('/me', authMiddleware, updateUser);
router.delete('/delete', authMiddleware, deleteUser);

module.exports = router;
