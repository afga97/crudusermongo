const Role = require('../models/role');
const Usuario = require('../models/usuario');
const { CategorieModel } = require('../models')

const roleValid = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la bd`);
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe`);
    }
}

const getUserForId = async (id) => {
    const userExist = await Usuario.findById(id);
    if (!userExist) {
        throw new Error(`El usuario con id ${id} no existe`);
    }
}

const validateCategorie = async ( id ) => {
    try {
        const existCategorie = await CategorieModel.findById({ _id: id});
        if (!existCategorie) {
            throw new Error(`El id no existe ${ id }`)
        }
    } catch (error) {
        throw new Error(`El id no existe ${ id }`)
    }
}


module.exports = {
    roleValid,
    emailExiste,
    getUserForId,
    validateCategorie
}