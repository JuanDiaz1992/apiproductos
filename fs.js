const fs = require("fs").promises;
const archivo = "./productos.txt";
//Write to a file
async function crearArchivo(name) {
  try {
    await fs.writeFile(archivo, "Iniciando archivo con Node");
    return true;
  } catch (error) {
    throw error;
  }
}

//Read from a file
async function readFile() {
  try {
    const data = await fs.readFile(archivo, "utf8");
    return data;
  } catch (error) {
    throw error;
  }
}

// Append to a file
async function addToFile(text) {
  console.log(text);
  try {
    await fs.appendFile(archivo, text + ",", "utf8");
    return true;
  } catch (error) {
    throw error;
  }
}


//Delete a file
async function deleteFile() {
  try {
    await fs.unlink(archivo);
    return true;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  crearArchivo,
  readFile,
  addToFile,
  deleteFile,
};

