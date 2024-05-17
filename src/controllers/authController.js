import authService from '../services/authService'

const login = async (req, res) => {
    try {
        const {name, password} = req.body
        const data = await authService.login(name, password)
        res.status(200).send(JSON.stringify(data))
    } catch (error) {
        res.status(500).send('Internal Server Error')
        console.error(error)
    }
}

const register = async (req, res) => {
    try {
        const {name, password}  = req.body
        console.log(name, password)
        const mes = await authService.register(name, password)
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