const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/userController');

router.post('/verify-token', authMiddleware, (req, res) => {
    console.log('verify-token route hit');
    res.status(200).json({ isValid: true, userData: req.user });
});
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getUser);
router.put('/me', authMiddleware, updateUser);
router.delete('/delete', authMiddleware, deleteUser);

module.exports = router;
