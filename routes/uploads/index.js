const { Router } = require('express')
const multer = require('multer')
const { check } = require('express-validator')
const { uploadUser } = require('../../helpers/multer')

const { cargaArchivo } = require('../../controllers/uploads')

const { validarCampos } = require('../../middlewares/validar-campos')
const { validCollectionFilter } = require('../../helpers/db-validators')

const router = Router();

const uploadUserFunction = uploadUser.single('file')

router.post('/:collection/:id',  [
    check('id', 'No es un ID válido').isMongoId(),
    check('collection').custom( c => validCollectionFilter(c, ['usuarios', 'proucts']) ),
    validarCampos,
    function (req, res, next) {
        uploadUserFunction(req, res, next, function(error){
            if (error instanceof multer.MulterError) {
                return res.status(500).json({
                    message: 'Ocurrio un error al cargar la imagen'
                })
            } else if (error) {
                return res.status(400).json({
                    message: error
                })
            }
            next()
        }) 
    }
], cargaArchivo)


module.exports = router