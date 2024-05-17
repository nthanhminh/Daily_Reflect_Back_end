import express from 'express';
import friendController from '../controllers/friendController'

const router = express.Router();

router.get('/', (req,res) => {
    res.send("Welcome to daily reflect backend")
})

router.post('/createInviteCode', friendController.createInviteCode)

router.post('/postFriendRequest', friendController.postFriendRequest)

module.exports = router