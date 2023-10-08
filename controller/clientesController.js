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
      const { nombre, apellido, email } = req.body;
      
      if (!nombre || !apellido || !email) {
        return res.status(400).json({ error: 'Error al crear cliente: campos incompletos' });
      }
      
      const nuevoClienteId = clientes.length + 1;
      
      const nuevoCliente = {
        id: nuevoClienteId,
        nombre,
        apellido,
        email
      };
      
      clientes.push(nuevoCliente);  
      return res.status(201).json(nuevoCliente);
    },

    actualizarCliente: function (req, res) { 
      const { nombre, apellido, email } = req.body;
      const { id } = req.params;
      
      if (!id || !nombre || !apellido || !email) {
        return res.status(400).json({ error: 'Error al modificar cliente: campos incompletos' });
      }

      var modificado = false;
      for (let index = 0; index < clientes.length; index++) {
        if(clientes[index].id == id){              
          if(clientes[index].nombre == nombre && clientes[index].apellido == apellido && clientes[index].email == email){
            return res.status(400).json({ error: 'Error al modificar cliente: los valores son iguales' });
          }else{
            clientes[index].nombre = nombre;
            clientes[index].apellido = apellido;
            clientes[index].email = email;
            modificado = true;
            return res.status(200).json({mensaje: 'Cliente modificado con exito!'});
          }                                    
        }          
      }

      if(!modificado){
        return res.status(404).json({ error: 'Error al modificar cliente: cliente no encontrado' });
      }
            
    },

    eliminarCliente: function (req, res) { 
      const { id } = req.params;    

      if (!id) {
        return res.status(400).json({ error: 'Error al eliminar cliente: no se encuentra el ID' });
      }                
              
      var clienteAEliminarIndex = 0;  

      for (let index = 0; index < clientes.length; index++) {
        if(clientes[index].id == id){              
          clienteAEliminarIndex = index;             
          break;                
        }          
      }
      
      if(clienteAEliminarIndex == 0){
        return res.status(404).json({ error: 'Error al eliminar cliente: cliente no encontrado' });
      }else{
        clientes.splice(clienteAEliminarIndex, 1);
        return res.status(204).json();
      }              
    }

  };