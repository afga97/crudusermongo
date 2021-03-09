const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('516500451146-108isnckpd3gd1sjg53gdb6pbsnrjvfl.apps.googleusercontent.com');


const googleVerify = async (idToken= '') => {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: '516500451146-108isnckpd3gd1sjg53gdb6pbsnrjvfl.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const { 
        name: nombre, 
        picture: img, 
        email: correo } = ticket.getPayload();
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    return { nombre, img, correo };
}

module.exports = {
    googleVerify
}