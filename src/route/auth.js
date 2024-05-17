import express from 'express';
import authController from '../controllers/authController'
import authMiddleware from '../middleware/authMiddleware'

const router = express.Router();

router.get('/', (req,res) => {
    res.send("Welcome to daily reflect backend")
})

router.post('/register', authController.register)

router.post('/login', authController.login)

router.get('/test', authMiddleware.authenticateToken, async (req, res) => {
    res.send("Token Verified, Authorizing User...");
})

router.get('/getNewAccessToken', authController.getNewAccessToken)

module.exports = router