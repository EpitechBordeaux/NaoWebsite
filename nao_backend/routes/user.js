const express = require("express");
const userController = require("../controllers/createUser");
const router = express.Router();
const db = require("../dbConnection");
const bcryptjs = require("bcrypt");

router.get("/signin", (req, res) => {
  db.query("SELECT * FROM users", (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      res.status(404).json({ result: "No user exists" });
    } else {
      res.status(201).json({ result });
    }
  });
});

router.get("/:name", (req, res) => {
  const name = req.params.name;
  const sqlSearch_userId = "Select * from users where username = ?";
  const search_query_id = db.format(sqlSearch_userId, [name]);

  db.query(search_query_id, (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      res.status(404).json({ result: "User does not exist" });
    } else {
      res.status(201).json({ result });
    }
  });
});

router.post("/signin", userController.signIn);

router.post("/login", async (req, res) => {
  const user = req.body.username;
  const password = req.body.password;
  const sqlSearch = "Select * from users where username = ?";
  const search_query = db.format(sqlSearch, [user]);

  db.query(search_query, async (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      console.log("--------> User does not exist");
      res.status(409).json({ error: "User does not exist" });
    } else {
      const hashedPassword = result[0].password;
      if (await bcryptjs.compare(password, hashedPassword)) {
        console.log("---------> Login Successful");
        res.status(201).json({ userName: user });
      } else {
        console.log("---------> Error");
        res.status(500).json({ error: "Error" });
      }
    }
  });
});

module.exports = router;
