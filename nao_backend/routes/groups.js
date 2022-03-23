const express = require("express");
const router = express.Router();
const db = require("../dbConnection");
const bcryptjs = require("bcrypt");

router.post("/userId", (req, res) => {
  const sqlSearch_id =
    "SELECT * FROM `groups` WHERE name = ? AND organizationId = ?";
  const search_query_id = db.format(sqlSearch_id, [
    req.body.name,
    req.body.organizationId,
  ]);
  const users = {
    name: req.body.name,
    organizationId: req.body.organizationId,
  };
  const sqlInsert =
    "INSERT INTO `groups` (id, name, organizationId) VALUES (null, '" +
    users.name +
    "', " +
    users.organizationId +
    ")";
  console.log(search_query_id);
  db.query(search_query_id, async (err, result) => {
    if (err) throw err;
    console.log("------> Search Results");
    console.log(result.length);
    if (result.length != 0) {
      console.log("------> Group already exist");
      res.status(409).json({ error: "Group already exists" });
    } else {
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log(err);
          console.log("Error creating Group");
          res.status(500).json({ error: "Error creating Group" });
        } else {
          console.log("--------> Created new Group");
          res.status(201).json({});
        }
      });
    }
  });
});

router.get("/userId/:organization", (request, res) => {
  const organization = request.params.organization;
  const select =
    "SELECT * FROM `groups` WHERE OrganizationId = " + organization + "";

  db.query(select, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.get("/userId", (request, res) => {
  const id = request.params.id;
  db.query("SELECT * FROM `groups`", (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.delete("/delete/:name", (request, res) => {
  const name = request.params.name;
  const select = "DELETE FROM `groups` WHERE name = '" + name + "'";
  //SELECT u_name AS user_name FROM users WHERE u_name = 'john';

  db.query(select, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

module.exports = router;
