const http = require("http");
const { crearArchivo, readFile, addToFile, deleteFile } = require("./fs");
const url = require("url");
const { addToLog } = require("./crearLog");
const { json } = require("stream/consumers");
const { insertProducto, getProducts, getProductById, actualizarProducto, deleteProduct} = require("./productos");

const server = http.createServer(async (req, res) => {
  await addToLog(req);
  const parserurl = url.parse(req.url, true);
  const method = req.method;

  if (parserurl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Bienvenido al servidor");
  }

  if (parserurl.pathname === "/leer_log" && method === "GET") {
    try {
      const data = await readFile("./log.txt");
      let response = { message: data };
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    } catch (error) {
      console.error("Error al leer o convertir el archivo:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("Error al leer el archivo");
    }
  }

  if (parserurl.pathname === "/producto") {
    if (method === "GET") {
      const { id } = parserurl.query;
      if (id) {
        // ejemplo de uso: http://localhost:3000/producto?id=1
        const response = await getProductById(id);
        res.writeHead(response.status, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(response));
      } else {
        const response = await getProducts();
        res.writeHead(response.status, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(response));
      }
    }

    if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", async () => {
        try {
          const producto = JSON.parse(body);
          const response = await insertProducto(producto);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(response));
        } catch (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error al procesar la solicitud");
        }
      });
      return;
    }


  }
  

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Ruta no encontrada");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000/");
});
