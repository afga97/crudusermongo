const { request, response } = require('express');
const userModel = require('../models/usuario');
const jwt = require('jsonwebtoken')

const validateJwt = async (req = request, res= response, next) => {

    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            message: 'El token no es valido'
        })
    }

    try {
        const { uid } = jwt.verify(token, 'Est03sMyPub1ck3y23913');
        const usuario = await userModel.findById({ _id: uid })

        if (!usuario) {
            return res.status(401).json({
                message: 'El usuario no existe'
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                message: 'El token no es valido'
            })
        }
        req.usuario = usuario;
        next();
    } catch (error) { 
        console.log(error);
        return res.status(401).json({
            message: 'El token no es valido'
        })
    }

}

const validarRolAdmin = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            message: 'No se encontro el usuario al validar el token'
        })
    }

    const { rol } = req.usuario;

    if ( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            message: 'No cuenta con el permiso necesario para realizar esta acción'
        })
    }
    next();
}

const validateRol = ( ...roles ) => {
    return (req = request, res = response, next) => {
        
        if (!req.usuario) {
            return res.status(500).json({
                message: 'No se encontro el usuario al validar el token'
            })
        }

        if (!roles.includes( req.usuario.rol )) {
            return res.status(500).json({
                message: 'No cuenta con el permiso para esta acción'
            })
        }
        
        next();
    }
}

module.exports = {
    validateJwt,
    validarRolAdmin,
    validateRol
}