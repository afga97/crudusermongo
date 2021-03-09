const { requset, response } = require('express')
const bcrypt = require('bcrypt')
const UsuarioModel = require('../../models/usuario');
const { generateJWT } = require('../../helpers/generate-token');
const { googleVerify } = require('../../helpers/google-verify')

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
    try {
        const token = await generateJWT(usuario.id);
        res.status(200).json({ 
            usuario,
            token,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Ocurrio un error al iniciar sesion'
        })
    }

}

const loginWithGoogle = async (req = request, res = response) => {

    const { id_token } = req.body;
    try {
        const { correo, nombre, img } = await googleVerify(id_token)

        let usuario = await UsuarioModel.findOne({ correo })
        if (!usuario) {
            const data = { 
                nombre, 
                correo, 
                password: ':P',
                img,
                google: true
            }
            usuario = new UsuarioModel(data)
            await usuario.save()
        }

        if ( !usuario.estado ) {
            return res.status(401).json({
                message: 'No se encuentra autorizado'
            })
        }

        const token = await generateJWT(usuario.id);
        res.status(200).json({ 
            usuario,
            token,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Token no es valido'
        })
    }
}

module.exports = {
    login,
    loginWithGoogle
}