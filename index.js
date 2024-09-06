const http = require("http");
const Course = require("./packages/course");
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "codewins";
let db = null;

MongoClient.connect(url)
  .then((client) => {
    // console.log("Database connected");
    db = client.db(dbName);
  })
  .catch((error) => {
    console.error(
      "Unable to establish connection with database:",
      error.message
    );
  });

const server = http.createServer((req, res) => {
  const endpoint = req.url;
  const method = req.method;

  if (!db) {
    res.writeHead(500, { "Content-Type": "application/json" });
    let responce = JSON.stringify({
      success: false,
      message: "Error - Unable to connect database",
    });
    return res.end(responce);
  }

  // if (endpoint === "/course" && method === "GET")
  //   return Course.fetch(req, res, db);
  // if (endpoint === "/course" && method === "POST")
  //   return Course.store(req, res, db);
  // if (endpoint === "/course" && method === "PUT")
  //   return Course.update(req, res, db);
  // if (endpoint === "/course" && method === "DELETE") 
  //   return Course.remove(req, res, db);

  if (endpoint === "/course") {
    switch (method) {
      case "GET":
        Course.fetch(req, res, db);
        return;
      case "POST":
        Course.store(req, res, db);
        return;
      case "PUT":
        Course.update(req, res, db);
        return;
      case "DELETE":
        Course.remove(req, res, db);
        return;
      default:
        res.writeHead(405, { "Content-Type": "application/json" });
        const methodNotAllowedResponse = JSON.stringify({
          success: false,
          message: "Method not allowed",
        });
        res.end(methodNotAllowedResponse);
        return;
    }
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  let responce = JSON.stringify({
    success: true,
    message: "End-Point does not exit",
  });
  res.end(responce);
});

server.listen(8081);
