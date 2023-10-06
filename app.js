var express = require('express')
const bodyParser = require('body-parser');
var app = express()
var port = 3000

app.use(bodyParser.json());

var productosController = require('./controller/productosController');
var clientesController = require('./controller/clientesController');
var ventasController = require('./controller/ventasController');

// PRODUCTOS
app.get('/productos', productosController.listarProductos);
app.post('/agregarProducto', productosController.crearProducto);
app.get('/productos/:id', productosController.obtenerProductoPorId);
app.put('/modificarProducto', productosController.actualizarProducto);
app.delete('/eliminarProducto', productosController.eliminarProducto);

// CLIENTES
app.get('/clientes', clientesController.listarClientes);
app.post('/agregarCliente', clientesController.crearCliente);
app.get('/clientes/:id', clientesController.obtenerClientePorId);
app.put('/modificarCliente', clientesController.actualizarCliente);
app.delete('/eliminarCliente', clientesController.eliminarCliente);

// VENTAS
app.get('/ventas', ventasController.listarVentas);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})