const validarCampos = require('./validar-campos');
const validarRoles = require('./validate-jwt');

module.exports = {
    ...validarCampos,
    ...validarRoles
}