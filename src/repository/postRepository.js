import { Op } from 'sequelize';
import db from '../models/index';

const getPostFromFriends = (friendListId) => {
    return new Promise( async(resolve, reject) => {
        try {
            const posts = await db.Post.findAll(
                {
                    where: {
                        userId: {
                            [Op.in]: friendListId
                        }
                    }
                }
            )
            // console.log(posts)
            resolve(posts)
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
            resolve(posts)
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
    return new Promise( async(resolve,reject) => {
        try {
            const post = await db.Post.findOne({
                where: { id: postId },
                include: [{
                  model: db.User,
                }]
              });
        
              if (!post) {
                resolve('No post found');
                return;
              }
              
              const dataOfPost = await getDataFromPostId(postId);
        
              const data = {
                ...post.dataValues,
                userName: post.User.dataValues.name, // Ensure 'name' is a valid field in the User model
                dataLink: dataOfPost.map((dataItem) => {
                  return `https://daily-reflect-back-end.onrender.com/getDataFromId/${dataItem}`;
                })
              };

            //   console.log(data)
        
              resolve(data);
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