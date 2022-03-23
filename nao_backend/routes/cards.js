const express = require("express");
const router = express.Router();
const db = require("../dbConnection");

router.post("/userId", (req, res) => {
  const sqlSearch_groupsId =
    "SELECT * FROM cards WHERE name = ? AND groupsId = ?";
  const search_query_id = db.format(sqlSearch_groupsId, [
    req.body.name,
    req.body.groupsId,
  ]);
  const users = {
    name: req.body.name,
    groupsId: req.body.groupsId,
  };
  const sqlInsert =
    "INSERT INTO cards (id, name, groupsId) VALUES (null, '" +
    users.name +
    "', " +
    users.groupsId +
    ")";

  db.query(search_query_id, async (err, result) => {
    if (err) throw err;
    if (result.length != 0) {
      console.log("------> Card already exist");
      res.status(409).json({ error: "Card already exists" });
    } else {
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log(err);
          console.log("Error creating card");
          res.status(500).json({ error: "Error creating card" });
        } else {
          console.log("--------> Created new Card");
          res.status(201).json({ result: "Created new Card" });
        }
      });
    }
  });
});

router.get("/groupsId/:id", (request, res) => {
  const id = request.params.id;

  db.query(`SELECT * FROM cards WHERE groupsId = ${id}`, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.delete("/delete/:name", (request, res) => {
  const name = request.params.name;
  const select = "DELETE FROM cards WHERE name = '" + name + "'";

  db.query(select, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

module.exports = router;
