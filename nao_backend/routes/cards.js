const express = require("express");
const router = express.Router();
const db = require("../dbConnection");
const bcryptjs = require("bcrypt");

router.post("/userId", (req, res) => {
  const sqlSearch = "SELECT * FROM cards WHERE name = ?";
  const search_query = db.format(sqlSearch, [req.body.name]);
  const users = {
    name: req.body.name,
    userId: req.body.userId,
  };
  const sqlInsert = `INSERT INTO cards (id, name, userId) VALUES (null, '${users.name}', '${users.userId}')`;

  db.query(search_query, async (err, result) => {
    if (err) throw err;
    console.log("------> Search Results");
    console.log(result.length);
    if (result.length != 0) {
      console.log("------> Card already exist");
      res.status(409).json({ error: "Card already exists" });
    } else {
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log("Error creating card");
          res.status(500).json({});
        } else {
          console.log("--------> Created new Card");
          res.status(201).json({});
        }
      });
    }
  });
});

router.get("/userId/:id", (request, res) => {
  const id = request.params.id;

  db.query(`SELECT * FROM cards WHERE userId = ${id}`, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.get("/userId", (request, res) => {
    const id = request.params.id;
  
    db.query(`SELECT * FROM cards`, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  });

module.exports = router;
