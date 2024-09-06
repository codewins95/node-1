const fetch = async (req, res, db) => {
  try {
    const course = db.collection("courses");
    const data = await course.find().toArray();
    const response = JSON.stringify(data);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(response);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    const response = JSON.stringify({
      success: false,
      message: error.message,
    });
    res.end(response);
  }
};

const store = async (req, res, db) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); 
    });
    req.on("end", async () => {
      const course = JSON.parse(body);
      const collection = db.collection("courses");

      const result = await collection.insertOne(course);
      res.writeHead(201, { "Content-Type": "application/json" });
      const response = JSON.stringify({
        success: true,
        message: "Course created successfully",
        data: result.ops[0],
      });
      res.end(response);
    });
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    const response = JSON.stringify({
      success: false,
      message: error.message,
    });
    res.end(response);
  }
};

const update = async (req, res, db) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); 
    });
    req.on("end", async () => {
      const { _id, ...updates } = JSON.parse(body);
      const collection = db.collection("courses");

      const result = await collection.updateOne(
        { _id: new require("mongodb").ObjectId(_id) },
        { $set: updates }
      );

      if (result.modifiedCount > 0) {
        res.writeHead(200, { "Content-Type": "application/json" });
        const response = JSON.stringify({
          success: true,
          message: "Course updated successfully",
        });
        res.end(response);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        const response = JSON.stringify({
          success: false,
          message: "Course not found",
        });
        res.end(response);
      }
    });
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    const response = JSON.stringify({
      success: false,
      message: error.message,
    });
    res.end(response);
  }
};

const remove = async (req, res, db) => {
  try {
    const urlParts = req.url.split("/");
    const id = urlParts[urlParts.length - 1]; 
    const collection = db.collection("courses");

    const result = await collection.deleteOne({
      _id: new require("mongodb").ObjectId(id),
    });

    if (result.deletedCount > 0) {
      res.writeHead(200, { "Content-Type": "application/json" });
      const response = JSON.stringify({
        success: true,
        message: "Course deleted successfully",
      });
      res.end(response);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      const response = JSON.stringify({
        success: false,
        message: "Course not found",
      });
      res.end(response);
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    const response = JSON.stringify({
      success: false,
      message: error.message,
    });
    res.end(response);
  }
};

module.exports = {
  fetch,
  store,
  update,
  remove,
};

// db.courses.insertOne({
//   title : "Reacj js",
//   price:4000,
//   discount:25,
//   faculty:"Saurav"
// })
