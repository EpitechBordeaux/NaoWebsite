const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../dbConnection");

async function signIn(req, res) {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);
  const sqlSearch = "SELECT * FROM users WHERE username = ?";
  const search_query = db.format(sqlSearch, [req.body.username]);
  const users = {
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  };
  const sqlInsert = `INSERT INTO users (id, username, email, password) VALUES (null, '${users.username}', '${users.email}', '${users.password}')`;

  db.query(search_query, async (err, result) => {
    if (err) throw err;
    console.log("------> Search Results");
    console.log(result.length);
    if (result.length != 0) {
      console.log("------> User already exists");
      res.status(409).json({ error: "User already exists" });
    } else {
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log("Error creating user");
          res.status(500).json({});
        } else {
          console.log("--------> Created new User");
          res.status(201).json({});
        }
      });
    }
  });
}

module.exports = {
  signIn: signIn,
};
