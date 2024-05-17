import friendRepository from '../repository/friendRepository'

const createInviteCode = async(userId) => {
    return new Promise( async (resolve,reject) => {
        try {
            const mes = await friendRepository.createInviteCode(userId)
            resolve(mes)
        } catch (error) {
            reject(error);
        }

    })
}

const postFriendRequest = async(inviteCode, myID) => {
    return new Promise( async (resolve,reject) => {
        try {
            const mes = await friendRepository.postFriendRequest(inviteCode, myID)
            resolve(mes)
        } catch (error) {
            reject(error);
        }
    })
}

const getFriendIdList = async(userId) => {
    return new Promise( async (resolve,reject) => {
        try {
            const friendIdList = await friendRepository.getFriendIdList(userId)
            resolve(friendIdList)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createInviteCode,
    postFriendRequest,
    getFriendIdList
}