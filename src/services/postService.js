import postRepository from '../repository/postRepository'

const getPostFromFriends = (friendListId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!friendListId || friendListId.length === 0){
                reject('Invalid request')
            }
            const data = await postRepository.getPostFromFriends(friendListId)
            resolve(data)
        } catch (error) {
            reject(error);
        }
    })
}

const getMyPosts = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!userId || userId.length <=0){
                resolve('Invalid request')
            }
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
            resolve(data)
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


module.exports = {
    uploadPost,
    getDataFromPostId,
    getDataFromId,
    getPostFromFriends,
    getMyPosts,
    getPost,
    likePost,
    unlikePost,
    getNumberOfUsersWhoLikePost
}