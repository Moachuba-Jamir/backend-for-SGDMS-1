//

const express = require("express");
const router = express.Router();
const { getDB, connectToDb } = require("../db.js");

let db;

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

  try {
    const driver = await db
      .collection("drivers")
      .findOne({ driverName: username, pwd: password });

    if (driver) {

      res.status(200).json({ authenticatedDriver: driver });
    } else {
      res.status(404).json({ message: "Error: Driver does not exist!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const drivers = await db.collection("drivers").find().toArray();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;