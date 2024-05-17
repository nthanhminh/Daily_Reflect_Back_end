var multer = require('multer');
const path =require('path')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, 'src/uploads/'); 
       
    },
    filename: (req, file, cb) => {
        cb(null , file.originalname); 
    }
})

var upload = multer({storage:storage}); 

module.exports = upload;