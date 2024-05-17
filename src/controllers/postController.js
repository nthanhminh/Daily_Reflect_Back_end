import postService from '../services/postService.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import mimeTypes from 'mime-types';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
    cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const getPostFromFriends =  async (req,res) => {
    try {
        const {listFriendIds} = req.body
        const response = await postService.getPostFromFriends(listFriendIds)
        res.status(200).send(JSON.stringify(response))
    } catch (error) {
        res.send(500).send('Internal Server Error')
        console.error(error)
    }
}

const getMyPosts = async (req, res) => {
    try {
        const {userId} = req.body
        const respone = await postService.getMyPosts(userId)
        res.send(JSON.stringify(respone))
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
}

const uploadPost = async (req, res) => {
    try {
        const {userId, content} = req.body;
        const dataFromClient = req.files;
        const data = dataFromClient.map(file => {
            const filename = file.filename
            console.log(filename)
            const fileData = fs.readFileSync(path.join(__dirname, '../uploads', filename))
            const dataType = mimeTypes.lookup(filename)
            return {
                data: fileData,
                dataType: dataType
            }
        });
        console.log(data);
        const mes = await postService.uploadPost(userId, content, data)
        res.status(200).send(mes);
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
}

const getDataFromPostId = async (req, res) => {
    try {
        const {postId} = req.body
        const mes = await postService.getDataFromPostId(postId)
        res.status(200).send(mes)
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
}

const getPost = async (req, res) => {
    try {
        const {postId1} = req.body
        const data = await postService.getPost(postId)
        res.send(JSON.stringify(data))
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
}

const getDataFromId = async (req, res) => {
    try {
        const id = req.params.id
        const data = await postService.getDataFromId(id)
        res.set('Content-Type', data.dataType)
        res.send(data.data)
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
}

const likePost = async (req, res) => {
    try {
        const {userId, postId} = req.body
        const mes = await postService.likePost(userId,postId)
        res.send(mes)
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
}

const unlikePost = async (req, res) => {
    try {
        const {userId, postId} = req.body
        const mes = await postService.unlikePost(userId,postId)
        res.send(mes)
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
}

const getNumberOfUsersWhoLikePost = async (req, res) => {
    try {
        const {postId} = req.body
        const cnt = await postService.getNumberOfUsersWhoLikePost(postId)
        res.send(JSON.stringify(cnt))
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
}

const setCookies = async (req, res) => {
    try {
        res.cookie('sessionId', '1234', {
            httpOnly: true,  // helps mitigate the risk of client side script accessing the protected cookie
            secure: true,    // ensures the browser only sends the cookie over HTTPS
            maxAge: 1000 * 60 * 60 * 24 // cookie expiry set to one day
          });

        res.send('You just set cookies')
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
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
    setCookies
}



