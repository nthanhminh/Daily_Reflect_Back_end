import postRepository from '../repository/postRepository'
import integrationService from './integrationService'
import moment from 'moment'

const getPostFromFriends = (friendListId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!friendListId || friendListId.length === 0){
                reject('Invalid request')
            }
            const data = await postRepository.getPostFromFriends(friendListId)
            const postIdList = data.map((post) => post.dataValues.id)
            resolve(postIdList)
        } catch (error) {
            reject(error);
        }
    })
}

const getMyPosts = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await postRepository.getMyPosts(userId)
            resolve(data)
        } catch (error) {
            reject(error);
        }
    })
}

const uploadPost = (userId, content, data) => {
    return new Promise( async(resolve, reject) => {
        try {
           if(!content && !data){
                reject('You must post anything!')
           }
           const mes = postRepository.uploadPost(userId, content, data)
           resolve(mes)
        } catch (error) {
            reject(error);
        }
    })
}

const getPost = (postId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!postId && postId <=0){
                resolve('Invalid request')
            }
            const data = await postRepository.getPost(postId)
            const { id, userId, date, content, userName, dataLink } = data
            const now = moment(new Date());
            const dateDifferent = handleDate(now,date)
            const newData = {
                id,
                userId,
                dateDifferent,
                content, 
                userName, 
                dataLink
            }
            resolve(newData)
        } catch (error) {
            reject(error);
        }
    })
}

const getDataFromPostId = (postId) => {
    return new Promise( async(resolve, reject) => {
        try {
            if(postId < 0){
                reject('PostId is not exsist')
            }
            const mes = await postRepository.getDataFromPostId(postId)
            resolve(mes)
        } catch (error) {
            reject(error);
        }
    })
}

const getDataFromId = (id) => {
    return new Promise( async(resolve, reject)=>{
        try {
            const data = await postRepository.getDataFromId(id)
            resolve(data)
        } catch (error) {
            reject(error);
        }
    })
}

const likePost = (userId, postId) => {
    return new Promise( async(resolve,reject) => {
        try {
            const mes = await postRepository.likePost(userId,postId)
            resolve(mes)
        } catch (error) {
            reject(error)
        }
    })
}

const unlikePost = (userId, postId) => {
    return new Promise( async(resolve,reject) => {
        try {
            const mes = await postRepository.unlikePost(userId,postId)
            resolve(mes)
        } catch (error) {
            reject(error)
        }
    })
}

const getNumberOfUsersWhoLikePost = (postId) => {
    return new Promise( async(resolve,reject) =>{
        try {
            const cnt = await postRepository.getNumberOfUsersWhoLikePost(postId)
            resolve(cnt)
        } catch (error) {
            reject(error)
        }
    })
}

const handleDate = (now, date) => {
    const diffInMs = now.diff(date);

    let diff;
    let unit;

    if (diffInMs < 60000) { // less than 1 minute
        diff = moment.duration(diffInMs).seconds();
        unit = 'seconds';
    } else if (diffInMs < 3600000) { // less than 1 hour
        diff = moment.duration(diffInMs).minutes();
        unit = 'minutes';
    } else if (diffInMs < 86400000) { // less than 1 day
        diff = moment.duration(diffInMs).hours();
        unit = 'hours';
    } else if (diffInMs < 604800000) { // less than 1 week
        diff = moment.duration(diffInMs).days();
        unit = 'days';
    } else if (diffInMs < 2592000000) { // less than 1 month (approximately 30 days)
        diff = moment.duration(diffInMs).weeks();
        unit = 'weeks';
    } else if (diffInMs < 31536000000) { // less than 1 year (approximately 365 days)
        diff = moment.duration(diffInMs).months();
        unit = 'months';
    } else { // 1 year or more
        diff = moment.duration(diffInMs).years();
        unit = 'years';
    }
    return `${diff} ${unit} ago` ;
}

const getPostForUserId = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            const friendIdList = await integrationService.getFriendIdList(userId);
            const postIdList = await getPostFromFriends(friendIdList)
            const posts = postIdList.map(async(postId) => await getPost(postId))
            const data = await Promise.all(posts);
            resolve(data);
        } catch (error) {
            reject(error)
        }
    })
}

const getMyPostForUserId = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            const data = await getMyPosts(userId);
            console.log('Data received from getMyPosts:', data); // Log the data to inspect it
            let postIdList = [];

            if (Array.isArray(data)) {
                postIdList = data.map((item) => item.dataValues.id);
            } else {
                console.error('Data is not an array:', data); // Log an error if data is not an array
                return reject(new TypeError('Data is not an array'));
            }

            let posts = postIdList.map(async (postId) => await getPost(postId));
            posts = await Promise.all(posts);
            resolve(posts);
        } catch (error) {
            console.error('Error in getMyPostForUserId:', error); // Log the error
            reject(error);
        }
    })
}

module.exports = {
    uploadPost,
    getDataFromPostId,
    getDataFromId,
    getPostFromFriends,
    getMyPosts,
    getPost,
    likePost,
    unlikePost,
    getNumberOfUsersWhoLikePost,
    getPostForUserId,
    getMyPostForUserId
}