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

const getFriendListInfo = async(userId) => {
    return new Promise(async (resolve,reject) => {
        try {
            const friendListId = await getFriendIdList(userId)
            const users = friendListId.map( async (userId) => {
                const user = await friendRepository.getUserInfo(userId)
                const { id , backgroundId, name, welcomeSongId} = user
                return {
                    id, 
                    backgroundId, 
                    name, 
                    welcomeSongId
                }
            })
            const data = Promise.all(users)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createInviteCode,
    postFriendRequest,
    getFriendIdList,
    getFriendListInfo
}