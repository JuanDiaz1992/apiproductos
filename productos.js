const { addToFile, readFile } = require("./fs");
async function getProducts() {
  try {
    const texto = await readFile();

    const textoLimpio = texto.trim().replace(/,$/, "");

    const jsonArray = `[${textoLimpio}]`;

    const productos = JSON.parse(jsonArray);

    if (!productos || productos.length === 0) {
      return {
        status: 404,
        message: "No se encontraron productos",
        productos: [],
      };
    }

    return {
      status: 200,
      message: "Productos obtenidos correctamente",
      productos: productos,
    };
  } catch (error) {
    console.error("Error en getProducts:", error);
    return {
      status: 500,
      message: "Error al obtener los productos",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    };
  }
}

async function insertProducto(producto) {
  try {
    if (!producto || !producto.nombre) {
      return {
        status: 400,
        message: "Datos del producto incompletos",
      };
    }
    const nuevoId =
      producto.length > 0 ? Math.max(...producto.map((p) => p.id)) + 1 : 1;

    const cleanData = {
      id: nuevoId,
      nombre: producto.nombre,
    };

    const result = await addToFile(JSON.stringify(cleanData));

    if (result) {
      return {
        status: 201,
        message: "Producto agregado correctamente",
        id: result.insertId,
      };
    } else {
      return {
        status: 400,
        message: "No se pudo crear el producto",
      };
    }
  } catch (error) {
    console.error("Error al insertar producto:", error);
    return {
      status: 500,
      message: "Error interno del servidor",
    };
  }
}

async function getProductById(id) {
  try {
    const texto = await readFile();

    const textoLimpio = texto.trim().replace(/,$/, "");

    const jsonArray = `[${textoLimpio}]`;

    const productos = JSON.parse(jsonArray);
    if (!productos || productos.length === 0) {
      return {
        status: 404,
        message: "No se encontraron productos",
        productos: [],
      };
    }
        console.log(productos);
    const producto = productos.find(producto => producto.id === Number(id));
    console.log(producto);
    return {
      status: 200,
      message: "Productos obtenidos correctamente",
      productos: producto,
    };
  } catch (error) {
    console.error("Error en getProducts:", error);
    return {
      status: 500,
      message: "Error al obtener los productos",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    };
  }
}

module.exports = {
  getProducts,
  insertProducto,
  getProductById,
};
