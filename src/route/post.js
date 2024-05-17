import express from 'express';
import postController from '../controllers/postController'
import uploadMulter from '../multer/multerStore';

const router = express.Router();

router.get('/', (req,res) => {
    res.send("Welcome to daily reflect backend")
})

router.post('/uploadPost',uploadMulter.array('data', 10),postController.uploadPost)

router.post('/likePost', postController.likePost)

router.get('/getDataFromPostId',postController.getDataFromPostId)

router.get('/getDataFromId/:id', postController.getDataFromId)

router.get('/getPostFromFriends', postController.getPostFromFriends)

router.get('/getMyPosts', postController.getMyPosts)

router.get('/getPost', postController.getPost)

router.get('/getNumberOfUsersWhoLikePosts', postController.getNumberOfUsersWhoLikePost)

router.get('/setCookie', postController.setCookies)

router.delete('/unlikePost', postController.unlikePost)

module.exports = router