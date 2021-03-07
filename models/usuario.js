const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } =  this.toObject();
    return usuario;
}

// Se pueden pasar parametros
UsuarioSchema.methods.findUserActive = function(filter) {
    return model('Usuario').find({ estado: true, ...filter });
};

// Se pueden pasar parametros
UsuarioSchema.statics.findUsersActive = function(filter) {
    return this.find({ estado: true, ...filter });
  };

module.exports = new model('Usuario', UsuarioSchema);


