import friendService from '../services/friendService'

const createInviteCode = async (req,res) => {
    try {
        const {userId} = req.body
        const mes = await friendService.createInviteCode(userId)
        console.log(mes)
        res.send(mes)
    } catch (error) {
        res.status(505).send('Error when creating invite code')
        console.log(error)
    }
}

const postFriendRequest = async (req, res) => {
    try {
        const {inviteCode, userId} = req.body
        console.log(inviteCode)
        const mes = await friendService.postFriendRequest(inviteCode, userId)
        res.send(mes)
    } catch (error) {
        res.status(500).send('Error when posting invite code')
        console.log(error)
    }
}

const getFriendIdList = async (req, res) => {
    try {
        const {userId} = req.body
        const friendIdList = await friendService.getFriendIdList(userId)
        res.send(JSON.stringify(friendIdList))
    } catch (error) {
        res.status(500).send('Error when getting friend list id')
        console.log(error)
    }
}

const getFriendListInfo = async (req, res) => {
    try {
        const {userId} = req.body
        const data = await friendService.getFriendListInfo(userId)
        res.send(JSON.stringify(data))
    } catch (error){
        res.status(500).send('Error when getting friend list id')
        console.log(error)
    }
}

module.exports = {
    createInviteCode,
    postFriendRequest,
    getFriendIdList,
    getFriendListInfo
}