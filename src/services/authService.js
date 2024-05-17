import authRepository from '../repository/authRepository'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

const refreshTokens = []

const generateAccessToken = (tokenData, JWT_SECRET, JWT_EXPIRE) => {
    return jwt.sign(tokenData, JWT_SECRET, { expiresIn: JWT_EXPIRE })
}

const register = (name, password, backgroundId, welcomeSongId) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await authRepository.checkName(name)
            if(user){
                resolve('Name already registered. Please try another name!')
                return;
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const mes = await authRepository.register(name, hashedPassword, backgroundId, welcomeSongId)
            resolve(mes)
            return;
        } catch (error) {
            reject(error)
        }
    })
}

const login = (name, password) => {
    return new Promise(async (resolve,reject) => {
        try {
            const user = await authRepository.checkName(name)
            if(user == null) {
                resolve('Username is not existed. Please try again')
            }
            const isPasswordCorrect = await bcrypt.compare(password,user.password)
            if(isPasswordCorrect === false){
                resolve('Password is not correct. Please try again')
            }
            const tokenData = {
                id: user.id,
                name: user.name,
            }
            const accessToken = generateAccessToken(tokenData,JWT_SECRET,"1s")
            const refreshToken = generateAccessToken(tokenData, REFRESH_TOKEN_SECRET,"24h");
            refreshTokens.push(refreshToken)
            const respone = {
                message: "User Logged in Successfully",
                accessToken,
                refreshToken
            }
            resolve(respone)
            // resolve('checking')
        } catch (error) {
            reject(error)
        }
    })
}

const getNewAccessToken = (refreshToken) => {
    return new Promise(async(resolve,reject) => {
        try {
            console.log(refreshTokens)
            if (refreshToken == null) {
                return resolve("No refresh token provided!");
              }
              if (!refreshTokens.includes(refreshToken)) {
                return resolve("Invalid Refresh Token");
              }
            
              jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return resolve("Could not Verify Refresh Token");
                console.log(user);
                const tokenData = {
                    id: user.id,
                    name: user.name
                }
                const newAccessToken = generateAccessToken(tokenData, JWT_SECRET, "1h")
                return resolve(newAccessToken)
              });
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    register,
    login,
    getNewAccessToken
}