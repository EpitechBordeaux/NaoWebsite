const express = require("express");
const router = express.Router();
const db = require("../dbConnection");

router.post("/userId", (req, res) => {
  const sqlSearch_organization =
    "SELECT * FROM `organizations` WHERE id = " + req.body.organizationId;
  console.log(sqlSearch_organization);
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

  db.query(sqlSearch_organization, async (err, result) => {
    if (err) throw err;
    console.log(result.length);
    if (result.length === 0) {
      console.log("------> Organization dosn't exists");
      res.status(409).json({ error: "Organization dosn't exists" });
    } else {
      db.query(search_query_id, async (err, result) => {
        console.log("------> Search Results");
        console.log(result.length);
        if (result.length != 0) {
          console.log("------> Group already exist");
          res.status(405).json({ error: "Group already exists" });
        } else {
          db.query(sqlInsert, (err, result) => {
            if (err) {
              console.log(err);
              console.log("Error creating Group");
              res.status(500).json({ error: "Error creating Group" });
            } else {
              console.log("--------> Created new Group");
              res.status(201).json({
                groupeName: users.name,
                organizationId: users.organizationId,
              });
            }
          });
        }
      });
    }
  });
});

router.get("/userId/:organization", (request, res) => {
  const organization = request.params.organization;
  const select =
    "SELECT * FROM `groups` WHERE OrganizationId = " + organization + "";
  const selectOrganization =
    "SELECT * FROM `organizations` WHERE id = " + organization + "";

  db.query(selectOrganization, (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      console.log("Organization dosn't exists");
      res.status(404).json({ error: "Organization dosn't exists" });
    } else {
      if (result.length === 0) {
        res.status(203).json({ error: "No groups found" });
      } else {
        res.status(201).json({ result: result });
      }
    }
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

  db.query(select, (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      console.log("Group dosn't exists");
      res.status(404).json({ error: "Group dosn't exists" });
    } else {
      console.log("Deleted group");
      res.status(201).json({ result: "Deleted group" });
    }
  });
});

module.exports = router;
