const { Router } = require('express');
const { check } = require('express-validator');

const { 
    createCategories, getCategories, 
    getCategorie, updateCategorie, deleteCategorie 
} = require('../../controllers/categories')
const { validarCampos, validateJwt, validateRol } = require('../../middlewares');
const { validateCategorie } = require('../../helpers/db-validators')

const router = Router();

/** 
 *  {{url}}/api/categories/
 */

// Obtener todas las categorias
router.get('/', getCategories)

// Obtener solo una categoria
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( validateCategorie ),
    validarCampos
], 
getCategorie)

// Crear categoria con un token valido
router.post('/', [
    validateJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createCategories)

// Actualizar categoria con un token valido y id mongo
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], 
updateCategorie)

// Borrar logico de categoria - ADMiN
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validateRol('ADMIN_ROL'),
    validarCampos
], deleteCategorie)

module.exports = router