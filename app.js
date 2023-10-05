var express = require('express')
var app = express()
var port = 3000

var productos = require('./data/productos.json');
var clientes = require('./data/clientes.json');
var ventas = require('./data/ventas.json');


// PRODUCTOS
app.get('/productos', (req, res) => {
  res.json(productos);
});

app.post('/productos', (req, res) => {
});

app.get('/productos/:id', (req, res) => {
});

app.put('/productos/:id', (req, res) => {
});

app.delete('/productos/:id', (req, res) => {
});


// Clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

app.post('/clientes', (req, res) => {
});

app.get('/clientes/:id', (req, res) => {
});

app.put('/clientes/:id', (req, res) => {
});

app.delete('/clientes/:id', (req, res) => {
});

// VENTAS
app.get('/ventas', (req, res) => {
  res.json(ventas);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})