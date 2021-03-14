const { request, response } = require('express')
const { productModel } = require('../../models')

const getProducts = async (req = request, res = response) => {
    const query = { estado: true }
    const { limit = 5, skip = 0 } = req.query;
    const [ total, products ] = await Promise.all([
        productModel.countDocuments(query),
        productModel.find(query)
            .populate('usuario', 'nombre')
            .populate('categorie', 'name')
            .limit(Number(limit))
            .skip(Number(skip))
    ])
    res.status(200).json({
        total,
        products
    })
}


const getProduct = async (req = request, res = response) => {
    const { id } = req.params;
    try{
        product = await productModel.findById(id).populate('usuario')
                            .populate('categorie')
        res.status(200).json({ product })
    } catch (error) {
        return res.status(400).json({
            message: 'Ocurrio un error al consultar el producto'
        })
    }
}

const createProduct = async (req = request, res = response) => {
    const { name, precio, categorie, description } = req.body
    const usuario = req.usuario.id;
    const data = {
        name, precio, usuario, categorie, description
    }
    try {
        const product = new productModel(data);
        await product.save()
        res.status(201).json(product)
    } catch (error) {
        return res.status(400).json({
            message: 'Ocurrio un error al guardar'
        })
    }
}

const updateProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, precio, categorie, description } = req.body
    const usuario = req.usuario.id;
    const data = {
        name, precio, usuario, categorie, description
    }
    try {
        const product = await productModel.findByIdAndUpdate({ _id: id }, data)
        res.status(200).json({ product })
    } catch (error) {
        return res.status(400).json({
            message: 'Ocurrio un error al actualizar el producto'
        })
    }
}

const deleteProduct = async (req = request, res = response) => {
    const { id: _id } = req.params
    try {
        const product = await productModel.findByIdAndUpdate(_id, { estado: false }, { new: true })
        res.status(200).json({
            message: 'Eliminado correctamente'
        })
    } catch (error) {
        return res.status.json({
            message: 'Ocurrio un error al eliminar el producto'
        })
    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}