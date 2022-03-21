const models = require("../models/user");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../dbConnection");

async function signUp(req, res) {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, 10);
  const sqlSearch = "SELECT * FROM users WHERE username = ?";
  const search_query = db.format(sqlSearch, [req.body.username]);
  const users = {
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  };
  const sqlInsert = `INSERT INTO users (id, username, email, password) VALUES (null, '${users.username}', '${users.email}', '${users.password}')`;

  console.log(users);
  console.log(sqlInsert);
  db.query(search_query, async (err, result) => {
    if (err) throw err;
    console.log("------> Search Results");
    console.log(result.length);
    if (result.length != 0) {
      console.log("------> User already exists");
      res.sendStatus(409);
    } else {
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log("Error creating user");
          res.sendStatus(500);
        } else {
          console.log("--------> Created new User");
          res.sendStatus(201);
        }
      });
    }
  });
}

module.exports = {
  signUp: signUp,
};
