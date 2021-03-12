const users = require('./users')
const auth = require('./auth')
const categories = require('./categories')
const products = require('./products')


const routes = function (server) {
    server.use('/api/auth', auth)
    server.use('/api/users', users)
    server.use('/api/categories', categories)
    server.use('/api/products', products)
}

module.exports = routes;