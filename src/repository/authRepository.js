import db from '../models/index';

const register = (name, password, backgroundId = 1, welcomeSongId = 1) => {
    return new Promise(async(resolve, reject) => {
        try {
            const newUser = await db.User.create({
                name: name,
                password: password,
                backgroundId: backgroundId,
                welcomeSongId: welcomeSongId
            })

            if(newUser){
                resolve('Create new user successfully');
            }
            else {
                resolve('Create new user failed');
            }
        } catch (error) {
            reject(error);
        }
    })
}

const checkName = (name) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {name: name}
            })

            if(user){
                resolve(user)
            }
            else{
                resolve(null)
            }
        } catch (error) {
            reject(error);
        }
    })
}




module.exports = {
    register,
    checkName
}