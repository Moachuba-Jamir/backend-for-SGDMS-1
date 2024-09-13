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
  const { totalBins } = req.body;
  var total = parseInt(totalBins);
  try {
    await db.collection("bins").findOneAndUpdate(
      {
        entity: "Dimapur Municipal Council",
      },
      {
        $set: { totalBinCleared: total },
      }
    );

    const bins = await db.collection("bins").find().toArray();

    res.status(200).json({ bins });
  } catch (err) {
    console.log("Could not update the overall bin clear value", err);
  }
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "This route is working fine" });
});

module.exports = router;
