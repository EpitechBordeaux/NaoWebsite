const express = require("express");
const bcryptjs = require("bcrypt");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
dotenv.config({ path: "./.env" });
const db = require("./dbConnection");

const app = express();
const userRoute = require("./routes/user");
const cors = require("cors");
app.use(cors());
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
app.use("/user", userRoute);

app.use(bodyParser.json());
app.post("/login", (req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  const sqlSearch = "Select * from users where username = ?";
  const search_query = db.format(sqlSearch, [user]);

  db.query(search_query, async (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      console.log("--------> User does not exist");
      res.sendStatus(404);
    } else {
      const hashedPassword = result[0].password;
      if (await bcryptjs.compare(password, hashedPassword)) {
        console.log("---------> Login Successful");
        res.send(`${user} is logged in!`);
      } else {
        console.log("---------> Password Incorrect");
        res.send("Password incorrect!");
      }
    }
  });
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});

module.exports = app;
