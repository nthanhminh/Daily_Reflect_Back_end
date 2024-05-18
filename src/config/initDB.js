import db from '../models/index'

module.exports = () => {
    db.sequelize.sync({alter: true}).then(
        (req) => {
            console.log("Connected to daily_reflect_database")
        }
    )
}