const express = require("express");
const router = express.Router();
const db = require("../dbConnection");

router.get("/", (req, res) => {
  db.query(`SELECT * FROM organizations`, (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      console.log("------> No organization exists");
      res.status(203).json({ result: "No organization exists" });
    } else {
      res.status(201).json({ result: result });
    }
  });
});

router.get("/:name", (req, res) => {
  const name = req.params.name;
  const sqlSearch_userId = `SELECT * FROM organizations WHERE organizationName = ?`;
  const search_query_id = db.format(sqlSearch_userId, [name]);

  db.query(search_query_id, (error, result) => {
    if (error) throw error;
    console.log(result.length);
    if (result.length == 0) {
      console.log("------> Orga dosn't exist");
      res.status(404).json({ error: "Orga dosn't exists" });
    } else {
      res.status(201).json({ result: result });
    }
  });
});

router.post("/addOrganization", (req, res) => {
  const sqlSearch_name =
    "SELECT * FROM `organizations` WHERE organizationName = ?";
  const search_query_name = db.format(sqlSearch_name, [
    req.body.organizationName,
  ]);
  const users = {
    organizationName: req.body.organizationName,
  };
  const sqlInsert =
    "INSERT INTO `organizations` (id, organizationName) VALUES (null, '" +
    users.organizationName +
    "')";

  db.query(search_query_name, async (err, result) => {
    if (err) throw err;
    if (result.length != 0) {
      console.log("------> Orga already exists");
      res.status(409).json({ error: "Orga already exists" });
    } else {
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log(err);
          console.log("Error creating Orga");
          res.status(500).json({ error: "Error creating Orga" });
        } else {
          console.log("--------> Created new Orga");
          return res
            .status(201)
            .json({ organizationName: users.organizationName });
        }
      });
    }
  });
});

router.post("/addUser", (req, res) => {
  const sqlSearch_userId = `SELECT * FROM usersOrganizations WHERE userId = ? AND organizationId = ?`;
  const search_query_id = db.format(sqlSearch_userId, [
    req.body.userId,
    req.body.organizationId,
  ]);
  const users = {
    userId: req.body.userId,
    organizationId: req.body.organizationId,
    organizationName: req.body.organizationName,
  };
  const sqlInsert =
    "INSERT INTO usersOrganizations (userId, organizationId, organizationName) VALUES (" +
    users.userId +
    ", " +
    users.organizationId +
    ", '" +
    users.organizationName +
    "')";

  db.query(search_query_id, async (err, result) => {
    if (err) throw err;
    if (result.length != 0) {
      console.log("------> User already exist");
      res.status(409).json({ error: "User already exists" });
    } else {
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log("Error creating User");
          res.status(500).json({});
        } else {
          console.log("--------> Created new User");
          res.status(201).json({ result: "Created new User" });
        }
      });
    }
  });
});

router.get("/userOrganisation/:id", (req, res) => {
  const id = req.params.id;
  const sqlSearch_id = `SELECT * FROM users WHERE id = ?`;
  const search_query_id = db.format(sqlSearch_id, [id]);
  const sqlSearch_userId = `SELECT * FROM usersOrganizations WHERE userId = ?`;
  const search_query_userId = db.format(sqlSearch_userId, [id]);

  db.query(search_query_id, (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      console.log("------> User dosn't exist");
      res.status(404).json({ error: "User dosn't exist" });
    } else {
      db.query(search_query_userId, (error, result) => {
        if (result.length === 0) {
          console.log("------> User dosn't have access to any organization");
          res
            .status(203)
            .json({ result: "User dosn't have access to any organization" });
        } else {
          res.status(201).json({ result: result });
        }
      });
    }
  });
});

router.get("/getUser/:id", (request, res) => {
  const id = request.params.id;
  const sqlSearch_userId = `SELECT * FROM usersOrganizations WHERE organizationId = ?`;
  const search_query_id = db.format(sqlSearch_userId, [id]);
  const sqlSearch_organizationId = `SELECT * FROM organizations WHERE id = ?`;
  const search_query_organizationId = db.format(sqlSearch_organizationId, [id]);

  db.query(search_query_organizationId, (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      console.log("------> Organization dosn't exist");
      res.status(404).json({ error: "Organization dosn't exist" });
    } else {
      db.query(search_query_id, (error, result) => {
        if (result.length === 0) {
          console.log("------> Organization dosn't contain any user");
          res
            .status(203)
            .json({ result: "Organization dosn't contain any user" });
        } else {
          res.status(201).json({ result: result });
        }
      });
    }
  });
});

router.delete("/delete/user/", (req, res) => {
  const sqlSearch_userId = `SELECT * FROM usersOrganizations WHERE userId = ? AND organizationId = ?`;
  const search_query_id = db.format(sqlSearch_userId, [
    req.body.userId,
    req.body.organizationId,
  ]);
  const users = {
    userId: req.body.userId,
    organizationId: req.body.organizationId,
  };
  const select =
    "DELETE FROM `usersOrganizations` WHERE userId = '" +
    users.userId +
    "' AND organizationId = '" +
    users.organizationId +
    "'";

  db.query(search_query_id, async (err, result) => {
    if (err) throw err;
    if (result.length != 0) {
      db.query(select, (err, result) => {
        if (err) {
          console.log("Error deleted User");
          res.status(500).json({ error: "Error deleted User" });
        } else {
          console.log("--------> Deleted User");
          res.status(201).json({ result: "Deleted User" });
        }
      });
    } else {
      console.log("------> User dosn't exists");
      res.status(404).json({ error: "User dosn't exists" });
    }
  });
});

router.delete("/delete/:name", (request, res) => {
  const name = request.params.name;
  const sqlSearch_organization =
    `SELECT * FROM organizations WHERE organizationName = '` + name + "'";
  const select =
    "DELETE FROM `organizations` WHERE organizationName = '" + name + "'";

  db.query(sqlSearch_organization, (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      console.log("Organization dosn't exists");
      res.status(404).json({ error: "Organization dosn't exists" });
    } else {
      db.query(select, (error, result) => {
        if (error) throw error;
        if (result.length === 0) {
          console.log("Error deleted Orga");
          res.status(500).json({ error: "Error deleted Orga" });
        } else {
          res.status(201).json({ result: "Deleted organization" });
        }
      });
    }
  });
});

module.exports = router;
