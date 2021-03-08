const users = require('./users')
const auth = require('./auth')

const routes = function (server) {
    server.use('/api/auth', auth)
    server.use('/api/users', users)
}

module.exports = routes;