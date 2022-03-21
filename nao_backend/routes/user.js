const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const db = require("../dbConnection");

router.get("/register", (request, response) => {
  db.query("SELECT * FROM users", (error, result) => {
    if (error) throw error;
    response.send(result);
  });
});
router.post("/register", userController.signUp);

module.exports = router;
