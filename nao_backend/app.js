const express = require("express");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
dotenv.config({ path: "./.env" });
const db = require("./dbConnection");

const app = express();
const userRoute = require("./routes/user");
const userCards = require("./routes/cards");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL connected !");
  }
});

app.get("/", (req, res) => {
  res.send("<h1>HomePage</h1>");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.use("/cards", userCards);

app.listen(5001, () => {
  console.log("Server started on port 5001");
});

module.exports = app;
