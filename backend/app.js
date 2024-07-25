const express = require("express");
require("./conn/conn");
const auth = require("./routes/auth"); // Ensure correct relative path
const list = require("./routes/lists"); // Ensure correct relative path

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1", auth);
app.use("/api/v2", list); // Ensure correct use of the route

app.listen(1000, () => {
  console.log("Server started on port 1000");
});
