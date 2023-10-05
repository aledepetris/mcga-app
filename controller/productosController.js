// Importar datos.
var productos = require('../data/productos.json');

module.exports = {

    listarProductos: function (req, res) {
        return res.json(productos);
    },

    obtenerProductoPorId: function (req, res) {
        var id = req.params.id; 
        var producto = productos.find((p) => p.id == id);
    
        if (!producto) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
    
        return res.json(producto);
      },

      crearProducto: function (req, res) { 
        // TODO 
      },

      actualizarProducto: function (req, res) { 
        // TODO 
      },

      eliminarProducto: function (req, res) { 
        // TODO 
      }

  };