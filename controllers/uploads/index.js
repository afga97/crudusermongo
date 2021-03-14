const { request, response } = require('express')
const path = require('path')
const fs = require('fs')
const { usuarioModel, productModel } = require('../../models')

const cargaArchivo = async (req = request, res = response) => {

    if ( !req.file ) {
        return res.status(400).json({
            message: 'No se encontro el archivo para ser procesado'
        })
    }
    const { collection, id } = req.params
    let model;
    switch(collection){
        case 'usuarios':
            model = await usuarioModel.findById(id)
            if (!model) {
                return res.status(404).json({
                    message: `No se encontro un usuario para este id ${id}`
                })
            }
            break
        case 'products':
            model = await productModel.findById(id)
            if (!model) {
                return res.status(404).json({
                    message: `No se encontro un producto para este id ${id}`
                })
            }
            break
        default: 
            return res.status(500).json({
                message: 'No hay mas opciones disponibles para la imagen'
            })
    }

    if (model.img) {
        const pathImage = path.join(__dirname, '../../uploads', collection, model.img)
        if ( fs.existsSync(pathImage) ) {
            fs.unlinkSync(pathImage)
        }
    }

    try {
        model.img = req.file.filename;
        await model.save()
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrio un error al guardar el archivo' })
    }

    res.json({
        prueba: 'Archivo cargado correctamente'
    })
}

module.exports = {
    cargaArchivo
}