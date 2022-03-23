const express = require("express");
const router = express.Router();
const db = require("../dbConnection");

router.get("/", (request, res) => {
  db.query(`SELECT * FROM organizations`, (error, result) => {
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
    "INSERT INTO `organizations` (id, organizationName, tableName) VALUES (null, '" +
    users.organizationName +
    "', " +
    "'" +
    users.tableName +
    "'" +
    ")";

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

          let tableName = users.tableName;
          let query = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, userId INT, OrganizationId INT, CONSTRAINT ForeignKeyOrganizations FOREIGN KEY (OrganizationId) REFERENCES organizations (id), CONSTRAINT ForeignKeyOrganizationsUser FOREIGN KEY (userId) REFERENCES users (id))`;

          db.query(query, (err, rows) => {
            if (err) {
              console.log("Table Creation Failed");
              console.log(err);
              return res.status(500).send("Table Creation Failed");
            } else {
              console.log(`Successfully Created Table - ${tableName}`);
              return res.send(`Successfully Created Table - ${tableName}`);
            }
          });
        }
      });
    }
  });
});

router.post("/addUser/:name", (req, res) => {
  const name = req.params.name;

  const sqlSearch_userId = `SELECT * FROM ${name} WHERE userId = ?`;
  const search_query_id = db.format(sqlSearch_userId, [req.body.userId]);
  const users = {
    userId: req.body.userId,
    OrganizationId: req.body.OrganizationId,
  };
  const sqlInsert =
    "INSERT INTO " +
    name +
    " (id, userId, OrganizationId) VALUES (null, " +
    users.userId +
    ", " +
    users.OrganizationId +
    ")";

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

router.get("/getUser/:name", (request, res) => {
  const name = request.params.name;

  db.query(`SELECT * FROM ${name}`, (error, result) => {
    if (error) throw error;
    res.send(result);
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
