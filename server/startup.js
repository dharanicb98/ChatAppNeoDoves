const messageController = require('./modules/chat/controller')
const userController = require('./modules/login/controller')

const setUpRoutes = (app) => {
    app.use(`/api/v1/messenger`, messageController)
    app.use(`/api/v1/user`, userController)
}

module.exports.setUpRoutes = setUpRoutes;