// Importar datos.
var ventas = require('../data/ventas.json');

module.exports = {

    listarVentas: function (req, res) {
        return res.json(ventas);
    },

  };