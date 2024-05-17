import authService from '../services/authService'

const login = async (req, res) => {
    try {
        const {userName, name, password} = req.body
        const data = await authService.login(userName, password, name)
        res.status(200).send(JSON.stringify(data))
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
}

const register = async (req, res) => {
    try {
        const {userName, name, password}  = req.body
        console.log(userName, password)
        const mes = await authService.register(userName, password, name)
        res.status(200).send(JSON.stringify(mes))
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
}

const getNewAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body
        const mes = await authService.getNewAccessToken(refreshToken)
        res.status(200).send(JSON.stringify(mes))
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
}

module.exports = {
    login,
    register,
    getNewAccessToken
}