const express = require("express");
const router = express.Router();
const db = require("../dbConnection");

router.get("/", (req, res) => {
  db.query(`SELECT * FROM organizations`, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.get("/:name", (req, res) => {
  const name = req.params.name;
  const sqlSearch_userId = `SELECT * FROM organizations WHERE organizationName = ?`;
  const search_query_id = db.format(sqlSearch_userId, [name]);

  db.query(search_query_id, (error, result) => {
    if (error) throw error;
    res.send(result);
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
    tableName: req.body.tableName,
  };
  const sqlInsert =
    "INSERT INTO `organizations` (id, organizationName) VALUES (null, '" +
    users.organizationName +
    "')";

  console.log(sqlInsert);
  db.query(search_query_name, async (err, result) => {
    if (err) throw err;
    if (result.length != 0) {
      console.log("------> Orga already exist");
      res.status(409).json({ error: "Orga already exists" });
    } else {
      db.query(sqlInsert, (err, result) => {
        if (err) {
          console.log(err);
          console.log("Error creating Orga");
          res.status(500).json({ error: "Error creating Orga" });
        } else {
          console.log("--------> Created new Orga");
          return res.send({ organizationName: users.organizationName });
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
  console.log(sqlInsert);
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
          res.status(201).json({});
        }
      });
    }
  });
});

router.get("/userOrganisation/:id", (req, res) => {
  const id = req.params.id;
  const sqlSearch_userId = `SELECT * FROM usersOrganizations WHERE userId = ?`;
  const search_query_id = db.format(sqlSearch_userId, [id]);

  db.query(search_query_id, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.get("/getUser/:id", (request, res) => {
  const id = request.params.id;
  const sqlSearch_userId = `SELECT * FROM usersOrganizations WHERE organizationId = ?`;
  const search_query_id = db.format(sqlSearch_userId, [id]);

  db.query(search_query_id, (error, result) => {
    if (error) throw error;
    res.send(result);
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
          res.status(500).json({});
        } else {
          console.log("--------> Deleted User");
          res.status(201).json({});
        }
      });
    } else {
      console.log("------> User dosn't exists");
      res.status(409).json({ error: "User dosn't exists" });
    }
  });
});

// router.delete("/delete/:name", (request, res) => {
//   const name = request.params.name;
//   const select =
//     "DELETE FROM `organizations` WHERE organizationName = '" + name + "'";
//   //SELECT u_name AS user_name FROM users WHERE u_name = 'john';

//   db.query(select, (error, result) => {
//     if (error) throw error;
//     res.send(result);
//   });
// });

module.exports = router;
