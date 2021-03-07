const users = require('./users')

const routes = function (server) {
    server.use('/api/users', users)
}

module.exports = routes;