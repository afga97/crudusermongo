const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validateJwt } = require('../../middlewares')
const { 
    getProduct, getProducts, 
    createProduct, updateProduct, deleteProduct
} = require('../../controllers/products')


const router = Router();

/**
 * {{ url }}/api/products/
 */

// Obtener todos los productos
router.get('/', getProducts)

// Obtener un producto
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], getProduct)

// Crear un producto
router.post('/', [
    validateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty().isNumeric(),
    check('categorie', 'La categoria es obligatoria').isMongoId(),
    validarCampos
], createProduct)

// Actualizar un producto
router.put('/:id', [
    validateJwt,
    check('id', 'No es un ID válido').isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('categorie', 'La categoria es obligatoria').isMongoId(),
    validarCampos
], updateProduct)

// Eliminar un producto
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
], deleteProduct)

module.exports = router;