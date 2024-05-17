import db from '../models/index'
import crypto from 'crypto'
import moment from 'moment'

const createInviteCode = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const inviteCode = generateRandomCode(32);
            const expiration = 600
            await db.InviteCode.create({
                userId: userId,
                inviteCode: inviteCode,
                expiration: expiration,
                createdAt: new Date(),
            })

            const test = await db.Entry.create({
                date: new Date(),
                content: "Test",
                moodId: 1
            })
            console.log(test)
            resolve("Create Invite Code successfully")
        } catch (error) {
            reject(error)
        }
    })
}

const postFriendRequest = async(inviteCode, myID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const inviteCodeInDB = await db.InviteCode.findOne({
                where: {
                    inviteCode: inviteCode
                }
            })
            const {userId, expiration, createdAt} = inviteCodeInDB
            const now = moment()
            const prevDate = moment(createdAt)
            const diff = now.diff(prevDate) / 1000
            if(diff > expiration) {
                resolve('Invitation code has expired')
            }

            if(checkFriendRelationshipIsExist(myID, userId)) {
                resolve('Friend Relationship is existed')
            }

            await Friend.create({
                userId: myID,
                anotherUserId: userId
            })

            console.log(diff)
            console.log(userId)
            console.log(expiration)
            console.log(createdAt)
            resolve("Successfully")
        } catch (error) {
            reject(error)
        }
    })
}

const checkFriendRelationshipIsExist = async(userId, anotherUserId) => {
    try {
        const friendIsExist = await db.Friend.findOne({
            $or: [
                { userId: myID, anotherUserId: userId },
                { userId: userId, anotherUserId: myID }
            ]
        })

        if(friendIsExist){
            return true
        }

        return false
    } catch (error) {
        console.log(error)
    }
}

const generateRandomCode = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

const getFriendIdList = async(userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const friendListObj = await db.Friend.findAll({
                $or: [
                    { userId: userId},
                    { anotherUserId: userId}
                ]
            })
                
            const friendIdList = friendListObj.map((friendItem) => friendItem.userId)

            resolve(friendIdList)
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    createInviteCode,
    postFriendRequest,
    checkFriendRelationshipIsExist,
    getFriendIdList,
}