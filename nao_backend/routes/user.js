const express = require("express");
const userController = require("../controllers/createUser");
const router = express.Router();
const db = require("../dbConnection");
const bcryptjs = require("bcrypt");

router.post("/signin", userController.signIn);

router.get("/signin", (request, response) => {
  db.query("SELECT * FROM users", (error, result) => {
    if (error) throw error;
    response.send(result);
  });
});

router.post("/login", async (req, res) => {
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

module.exports = router;
