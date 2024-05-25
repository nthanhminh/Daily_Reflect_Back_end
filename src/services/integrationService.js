import authService from './authService'
import postService from './postService'
import friendService from './friendService'

const { getFriendIdList } = friendService

module.exports = {
    getFriendIdList,
}