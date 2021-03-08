const { requset, response } = require('express')
const bcrypt = require('bcrypt')
const UsuarioModel = require('../../models/usuario');
const { generateJWT } = require('../../helpers/generate-token');

const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    // Verificar si el email existe 
    const usuario = await UsuarioModel.findOne({ correo });
    if (!usuario) {
        return res.status(400).json({ 
            message: 'Usuario o contraseña incorrectos'
        })
    }

    // Si el usuario esta activo
    if (!usuario.estado) {
        return res.status(400).json({
            message: 'Usuario o contraseña incorrectos'
        })
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password)
    if (!validPassword) {
        return res.status(400).json({
            message: 'Usuario o contraseña incorrectos - pwd'
        })
    }

    // Generar JWT
    const token = await generateJWT(usuario.id);
    /*try {
        asdasdasd
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Ocurrio un error al iniciar sesion'
        })
    }*/

    return res.status(200).json({ 
        usuario,
        token
    })
}

module.exports = {
    login
}