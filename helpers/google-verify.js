const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('516500451146-108isnckpd3gd1sjg53gdb6pbsnrjvfl.apps.googleusercontent.com');


const googleVerify = async (idToken= '') => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: '516500451146-108isnckpd3gd1sjg53gdb6pbsnrjvfl.apps.googleusercontent.com', 
    });
    const { 
        name: nombre, 
        picture: img, 
        email: correo } = ticket.getPayload();
    return { nombre, img, correo };
}

module.exports = {
    googleVerify
}