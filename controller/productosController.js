// Importar datos.
const { MongoClient } = require("mongodb");

const connectionString = 'mongodb+srv://facukopech:ZVrT3V2DawWoQd7F@cluster0.1zdzqhg.mongodb.net/';
const client = new MongoClient(connectionString, { useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
  }
}

module.exports = {

    listarProductos: async function (req, res) {
      try {
        const db = client.db("Cluster0");
        const productosCollection = db.collection("NodeAppMCGA.Productos");
        const productos = await productosCollection.find().toArray();
        return res.json(productos);
      } catch (error) {
        return res.status(500).json({ error: 'Error al obtener los Productos' });
      }        
    },

    obtenerProductoPorId: async function (req, res) {
      try {
        const db = client.db("Cluster0");
        const productosCollection = db.collection("NodeAppMCGA.Productos");
        const id = req.params.id;
        const producto = await productosCollection.findOne({ id: id});
    
        if (!producto) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
    
        return res.json(producto);
      } catch (error) {
        return res.status(500).json({ error: 'Error al obtener Producto de la BD' });
      }
      },

      crearProducto: async function (req, res) { 
        try {
          const { nombre, stock, precio } = req.body;
      
          if (!nombre || !stock || !precio) {
            return res.status(400).json({ error: 'Error al crear un nuevo producto: campos incompletos' });
          }
      
          const db = client.db("Cluster0");
          const productosCollection = db.collection("NodeAppMCGA.Productos");
              
          const nuevoProducto = {
            _id: (await productosCollection.estimatedDocumentCount()) + 2, 
            id: (await productosCollection.estimatedDocumentCount()) + 1,
            nombre,
            stock,
            precio,
          };
                
          const result = await productosCollection.insertOne(nuevoProducto);
          return res.status(201).json(nuevoProducto);          
        } catch (error) {
          return res.status(500).json({ error: 'Error al crear un nuevo producto' });
        }
      },

      actualizarProducto: async function (req, res) { 
        try {
          const { nombre, stock, precio } = req.body;
          const id = req.params.id;
      
          if (!id || !nombre || !stock || !precio) {
            return res.status(400).json({ error: 'Error al modificar producto: campos incompletos' });
          }
      
          const db = client.db("Cluster0");
          const productosCollection = db.collection("NodeAppMCGA.Productos");
                
          const existingProduct = await productosCollection.findOne({ id: id });
      
          if (!existingProduct) {
            return res.status(404).json({ error: 'Error al modificar producto: producto no encontrado' });
          }
      
          if (
            existingProduct.nombre === nombre &&
            existingProduct.stock === stock &&
            existingProduct.precio === precio
          ) {
            return res.status(400).json({ error: 'Error al modificar producto: los valores son iguales' });
          }
              
          const result = await productosCollection.updateOne(
            { id: id },
            { $set: { nombre, stock, precio } }
          );
      
          if (result.modifiedCount === 1) {
            return res.status(200).json({ mensaje: 'Producto modificado con éxito' });
          } else {
            return res.status(500).json({ error: 'Error al modificar producto' });
          }
        } catch (error) {
          return res.status(500).json({ error: 'Error al modificar producto' });
        }
      },

      eliminarProducto: async function (req, res) { 
        try {
          const id = req.params.id;
      
          if (!id) {
            return res.status(400).json({ error: 'Error al eliminar producto: no se encuentra el ID' });
          }
      
          const db = client.db("Cluster0");
          const productosCollection = db.collection("NodeAppMCGA.Productos");
      
          const result = await productosCollection.deleteOne({id: id });
      
          if (result.deletedCount === 1) {
            return res.status(204).json();
          } else {
            return res.status(404).json({ error: 'Error al eliminar producto: producto no encontrado' });
          }
        } catch (error) {
          return res.status(500).json({ error: 'Error al eliminar producto' });
        }
      }
  };