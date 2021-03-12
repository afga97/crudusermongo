const { request, response } = require('express');
const { CategorieModel } = require('../../models')

const getCategories = async (req = request, res = response) => {
    const query = { estado: true };
    const { limit = 5, skip = 0 } = req.query;
    //prueba
    const [total, categories] = await Promise.all([
        CategorieModel.countDocuments(query),
        CategorieModel.find(query).populate('usuario', 'nombre')
            .limit(Number(limit))
            .skip(Number(skip))
    ]);
    res.status(200).json({
        ok: true,
        total,
        categories
    })
}

const getCategorie = async (req = request, res = response) => {
    const { id } = req.params;
    let categorie = {}
    try {
        categorie = await CategorieModel.findById(id).populate('usuario');
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error al consultar la categoria'
        })
    }
    res.json(categorie)
}

const createCategories = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    
    try {
        const categoriaBd = await CategorieModel.findOne({ name: nombre })
        if ( categoriaBd ) {
            return res.status(400).json({
                message: `La categoria ${categoriaBd.name }, ya existe`
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error al validar la categoria'
        })
    }

    try {
        // Guardar categoria
        const data = { 
            name: nombre,
            usuario: req.usuario._id
        }
        const categoria = new CategorieModel(data);
        await categoria.save();
        res.status(201).json(categoria);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error al guardar'
        })
    }
}

const updateCategorie = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, status: estado } = req.body;
    let categorie = {};
    try {
        categorie = await CategorieModel.findByIdAndUpdate({ _id: id }, { name, estado })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error al actualizar la categoria'
        })
    }

    res.status(201).json({
        message: 'Actualizado correctamente',
        categorie
    })
}

const deleteCategorie = async (req = request, res = response ) => {
    const { id: _id } = req.params;
    try {
        const categorie = await CategorieModel.findByIdAndUpdate(_id, { estado: false }, { new: true })
        res.status(200).json({
            message: 'Eliminada correctamente',
            categorie
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocurrio un error al eliminar la categoria'
        })
    }
}


module.exports = {
    createCategories,
    getCategories,
    getCategorie,
    updateCategorie,
    deleteCategorie
}