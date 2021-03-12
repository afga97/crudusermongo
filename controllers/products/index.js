const { request, response } = require('express')

const getProducts = async (req = request, res = response) => {
    res.json({
        message: 'Hola'
    })
}

module.exports = {
    getProducts
}