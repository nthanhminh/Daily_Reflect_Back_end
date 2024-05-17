import { Op } from 'sequelize';
import db from '../models/index';

const getPostFromFriends = (friendListId) => {
    return new Promise( async(resolve, reject) => {
        try {
            const posts = await db.Post.findAll(
                {
                    where: {
                        id: {
                            [Op.in]: friendListId
                        }
                    }
                }
            )

            console.log(posts)
            resolve('Checking')
        } catch (error) {
            reject(error);
        }
    })
}

const getMyPosts = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const posts = await db.Post.findAll({
                where: {
                    userId: userId
                }
            })
            console.log(posts)
            resolve('checking')
        } catch (error) {
            reject(error);
        }
    })
}

const uploadPost = (userId, content, data) => {
    return new Promise( async(resolve, reject) => {
        try {
            const newPost = await db.Post.create({
                userId: userId,
                content: content,
                date: new Date()
            })

            data.forEach( async (file) => {
                await db.DataOfPost.create({
                    postId: newPost.id,
                    data: file.data,
                    dataType: file.dataType,
                })
            });
            resolve('Successfully uploaded')
        } catch (error) {
            reject(error);
        }
    })
}


const getDataFromPostId = (postId) => {
    return new Promise( async(resovle,reject) => {
        try {
            const dataFromDb = await db.DataOfPost.findAll({
                where: {
                    postId: postId
                },
                attributes: ['id']
            })

            const data = dataFromDb.map((item) => item.id)
            console.log(data)

            resovle(data)
            
        } catch (error) {
            reject(error);
        }
    })
}

const getPost = (postId) => {
    return new Promise( async(resovle,reject) => {
        try {
            const post = await db.Post.findOne({
                where: {
                    id: postId
                }
            })

            // console.log(post)
            const dataOfPost = await getDataFromPostId(postId)

            const data = {
                ...post.dataValues,
                dataLink: dataOfPost.map((dataItem) => {
                    return `localhost:8080/getDataFromId/${dataItem}`
                })
            }

            resovle(data)
        } catch (error) {
            reject(error);
        }
    })
}

const getDataFromId = (id) => {
    return new Promise(async(resolve,reject) => {
        try {
            const dataFromDb = await db.DataOfPost.findOne({
                where: {
                    id: id
                },
                attributes: ['data', 'dataType']
            })
            const data = {
                data: dataFromDb.data,
                dataType: dataFromDb.dataType,
            }
            resolve(data)
        } catch (error) {
            reject(error);
        }
    })
}

const likePost = (userId, postId) => {
    return new Promise(async(resolve,reject) => {
        try {
            await db.UserLikePost.create({
                userId: userId,
                postId: postId
            })

            resolve('Successfully')
        } catch (error) {
            reject(error)
        }
    })
}

const unlikePost = (userId, postId) => {
    return new Promise(async(resolve,reject) => {
        try {
            await db.UserLikePost.destroy({
                where: {userId: userId,
                postId: postId}
            })
        
            resolve('Delete Successfully')
        } catch (error) {
            reject(error)
        }
    })
}

const getNumberOfUsersWhoLikePost  = (postId) => {
    return new Promise(async(resolve,reject) => {
        try {
            const cnt = await db.UserLikePost.count({
                where: {
                    postId: postId,
                }
            })
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