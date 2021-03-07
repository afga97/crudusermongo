const db = require('mongoose');

// Conexion
//mongodb+srv://agiraagu:andres2021*@cluster0.lgstm.mongodb.net/telegrom?retryWrites=true&w=majority
db.Promise = global.Promise
async function connect() {
    db.connect(
        'mongodb+srv://agiraagu:43278810giraldo@cluster0.lgstm.mongodb.net/telegrom?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true ,
        useCreateIndex: true,
        useFindAndModify: false
    }).then( () => {
        console.log('Connection succesfull database');
    }).catch( e => {
        console.log('Error al conectar la bd', e);
    });
}

module.exports = connect;