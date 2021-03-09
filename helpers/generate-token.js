const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid };
        jwt.sign( payload, 'Est03sMyPub1ck3y23913', {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }
            resolve(token);
        })
    }) 
}

module.exports = {
    generateJWT
}