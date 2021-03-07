const { request, response } = require('express')
const bcrypt = require('bcrypt');


const Usuario = require('../../models/usuario')

const userGet = async (req = request, res = response) => {
    const query = { estado: true };
    const { limit = 5, skip = 0 } = req.query;

    /*const usuarios = await Usuario.find(query)
        .limit(Number(limit))
        .skip(Number(skip))
    const total = await Usuario.countDocuments(query);*/
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.findUsersActive()
            .limit(Number(limit))
            .skip(Number(skip))
    ]);
    res.status(201).json({
        ok: true,
        message: 'Get Api - controller',
        total,
        usuarios
    })
}

const userPost = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    
    let usuarioResponse = {};
    try {
        usuarioResponse = await usuario.save()
    } catch(error) {
        if (error.name == 'MongoError' && error.code === 11000) {
            let fieldError = error.message.split('index:')[1]
            field = fieldError.split('dup key:')[0]
            field = field.substring(0, field.lastIndexOf("_"));
            return res.status(422).json({ error: true, message: `El campo ${field} esta duplicado` })
        }
        return res.status(400).json({ message: 'Ocurrio un error al crear el usuario' })
    }
    res.status(201).json({
        ok: true,
        message: 'Metodo post, Usuario creado correctamente',
        user: usuarioResponse
    })
}

const userPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }
    let usuarioBd = {}
    try {
        usuarioBd = await Usuario.findByIdAndUpdate(id, rest);
    } catch (error) {
        return res.status(400).json({ message: 'Ocurrio un error al actualizar el usuario' });
    }

    res.status(201).json({
        ok: true,
        message: 'Metodo put',
        id: req.params.id,
        usuarioBd
    })
}

const userDelete = async (req = request, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( { _id: id }, { estado: false });

    res.status(201).json({
        ok: true,
        message: 'Metodo delete',
        usuario
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}