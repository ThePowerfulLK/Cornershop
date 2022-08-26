const express = require('express');
const morgan = require('morgan');
const http = require('http');

const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.all('*', function (req, res, next) {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
});

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
     res.send('Tudo certo!');
});

const getRoutes = require('./routes/get');
app.use('/api/get', getRoutes);

const postRoutes = require('./routes/post');
app.use('/api/post', postRoutes);

const putRoutes = require('./routes/put');
app.use('/api/put', putRoutes);

const deleteRoutes = require('./routes/delete');
app.use('/api/delete', deleteRoutes);

const server = http.createServer(app);

server.listen(port, () => {
     console.log(`Aplicativo rodando em: http://localhost:${port}`)
});