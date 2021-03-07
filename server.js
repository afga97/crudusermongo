const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./db')
const PORT = process.env.PORT || 8001;

// Conexion a base de datos
db();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

routes(app);

app.listen(PORT, () => {
    console.log(`Aplication runserver in http://localhost:${PORT}`);
});
