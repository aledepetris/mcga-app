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
        const { nombre, stock, precio } = req.body;
      
      if (!nombre || !stock || !precio) {
        return res.status(400).json({ error: 'Error al crear un nuevo producto: campos incompletos' });
      }
      
      const nuevoProductoId = productos.length + 1;
      
      const nuevoProducto = {
        id: nuevoProductoId,
        nombre,
        stock,
        precio
      };
      
      productos.push(nuevoProducto);  
      return res.status(201).json(nuevoProducto); 
      },

      actualizarProducto: function (req, res) { 
        const { id, nombre, stock, precio } = req.body;
      
      if (!id || !nombre || !stock || !precio) {
        return res.status(400).json({ error: 'Error al modificar producto: campos incompletos' });
      }

      var modificado = false;
      for (let index = 0; index < productos.length; index++) {
        if(productos[index].id == id){              
          if(productos[index].nombre == nombre && productos[index].stock == stock && productos[index].precio == precio){
            return res.status(400).json({ error: 'Error al modificar producto: los valores son iguales' });
          }else{
            productos[index].nombre = nombre;
            productos[index].stock = stock;
            productos[index].precio = precio;
            modificado = true;
            return res.status(200).json({mensaje: 'Producto modificado con exito!'});
          }                                    
        }          
      }

      if(!modificado){
        return res.status(404).json({ error: 'Error al modificar producto: producto no encontrado' });
      }
      },

      eliminarProducto: function (req, res) { 
        const { id } = req.body;        

      if (!id) {
        return res.status(400).json({ error: 'Error al eliminar producto: no se encuentra el ID' });
      }                
              
      var productoAEliminarIndex = 0;  

      for (let index = 0; index < productos.length; index++) {
        if(productos[index].id == id){              
          productoAEliminarIndex = index;             
          break;                
        }          
      }
      
      if(productoAEliminarIndex == 0){
        return res.status(404).json({ error: 'Error al eliminar producto: producto no encontrado' });
      }else{
        productos.splice(productoAEliminarIndex, 1);
        return res.status(204).json();
      }  
      }

  };