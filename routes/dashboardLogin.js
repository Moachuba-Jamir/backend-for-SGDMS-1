const express = require("express");
const router = express.Router();
const { getDB, connectToDb } = require("../db.js");

let db;
var isLoggedIn = false;
// Middleware to ensure database connection
router.use((req, res, next) => {
  if (!db) {
    connectToDb((err) => {
      if (err) {
        return res.status(500).json({ message: "Database connection error" });
      }
      db = getDB();
      next();
    });
  } else {
    next();
  }
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log(`from admin login : ${username} and ${password}`);

    try {
    //   since there is only one document in the collection 
      const admin = await db.collection("admin").findOne({});
     
    if (admin) {
      if (admin.user == username && admin.password == password) {
          console.log("Admin logged in successfully");
          isLoggedIn = true;
          res.status(200).json({ isLoggedIn });
      } else {
        isLoggedIn = false;
        res.status(404).json({ isLoggedIn });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
    const logout = req.query.logout;
    try {
        if (logout == true) {
            isLoggedIn = false;
             res.status(200).json({ isLoggedIn });
        } else {
            res.status(200).json({ isLoggedIn });
      }
  } catch (error) {
    res.status(500).json({ message: "Server error : Admin not found " });
  }
});

module.exports = router;
