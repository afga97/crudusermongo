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
app.use('/', express.static(__dirname + '/public'));
app.use('/up', express.static(__dirname + '/uploads'));

routes(app);


app.listen(PORT, () => {
    console.log(`Aplication runserver in http://localhost:${PORT}`);
});
