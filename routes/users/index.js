const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validateRol, validateJwt } = require('../../middlewares');
const { roleValid, emailExiste, getUserForId } = require('../../helpers/db-validators')
const { userGet, userPost, userPut, userDelete } = require('../../controllers/users');


const router = Router();

router.get('/', [
    validateJwt,
    //validarRolAdmin,
    validateRol('ADMIN_ROLE', 'USER_ROLE')
],  userGet);
router.post('/',  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe ser mas de 6 letras').not().isEmpty().isLength({ min: 6}),
    // check('rol', 'No es un rol valido').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('rol').custom( roleValid ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    validarCampos
], userPost);
router.put('/:id',  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(getUserForId),
    check('rol').custom( roleValid ),
    validarCampos
],userPut);
router.delete('/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(getUserForId),
        validarCampos
    ],
userDelete);


module.exports = router;