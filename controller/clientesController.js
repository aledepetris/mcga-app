// Importar datos.
var clientes = require('../data/clientes.json');

module.exports = {

    listarClientes: function (req, res) {
        return res.json(clientes);
    },

    obtenerClientePorId: function (req, res) {
        var id = req.params.id; 
        var cliente = clientes.find((c) => c.id == id);
    
        if (!cliente) {
          return res.status(404).json({ error: 'Cliente no encontrado' });
        }
    
        return res.json(cliente);
      },

      crearCliente: function (req, res) { 
        // TODO 
      },

      actualizarCliente: function (req, res) { 
        // TODO 
      },

      eliminarCliente: function (req, res) { 
        // TODO 
      }

  };