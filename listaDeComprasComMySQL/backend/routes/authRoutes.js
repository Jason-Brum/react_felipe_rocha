const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', authMiddleware, updateProfile); //Rota protegida 

module.exports = router;
