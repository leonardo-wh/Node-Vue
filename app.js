const express = require('express');
const bodyParser = require('body-parser');
const autorRoutes = require('./src/routes/autor');

const app = express();
const sequelize = require('./src/database');
const Autor = require('./src/models/autor');
const Editor = require('./src/models/editor');
const Libro = require('./src/models/libro');

app.use(bodyParser.json());
function startApp() {
    return sequelize
        .authenticate()
        .then(() => {
            console.log('Conexión a la base de datos establecida correctamente.');
            return sequelize.sync();
        })
        .then(() => {
            console.log('Modelos sincronizados con la base de datos.');
            // Resto de la lógica de tu aplicación
        })
        .catch((error) => {
            console.error('Error al conectar y sincronizar con la base de datos:', error);
        });
}

app.use('/autor', autorRoutes);

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});


startApp()
    .then(() => {
        console.log('Aplicación iniciada correctamente.');
    })
    .catch((error) => {
        console.error('Error al iniciar la aplicación:', error);
    });



