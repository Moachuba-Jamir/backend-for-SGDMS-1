const express = require("express");
const router = express.Router();
const { getDB, connectToDb } = require("../db.js");

router.post("/", (req, res) => {
  const { userId, monthIndex } = req.body;
  console.log(`from the front end app: ${userId} and ${monthIndex}`);

  connectToDb((err) => {
    if (err) {
      console.error("Database connection error:", err);
      return res.status(500).json({ message: "Database connection error" });
    }

    const db = getDB();

    // Using async/await inside the callback
    (async () => {
      try {
        // Update the document
        await db
          .collection("drivers")
          .findOneAndUpdate(
            { id: userId },
            { $inc: { [`analytics.2024.${monthIndex}`]: 1 } }
          );
        // Update the document
        await db.collection("bins").findOneAndUpdate(
          {
            entity: "Dimapur Municipal Council",
            "myBins.id": binId,
          },
          {
            $inc: { "myBins.$.binCleared": 1 },
          }
        );

        // Fetch the updated document
        const updatedDriver = await db
          .collection("drivers")
          .findOne({ id: userId });

        if (updatedDriver) {
          res.status(200).json(updatedDriver);
        } else {
          res.status(404).json({ message: "Driver not found" });
        }
      } catch (error) {
        console.error("Error in driver analytics:", error);
        res
          .status(500)
          .json({ message: "An error occurred while processing your request" });
      }
    })();
  });
});

router.get("/", (req, res) => {
  const { userName } = req.query;
  connectToDb((err) => {
    if (err) {
      console.error("Database connection error:", err);
      return res.status(500).json({ message: "Database connection error" });
    }

    const db = getDB();

    // Using async/await inside the callback
    (async () => {
      try {
        // Fetch the updated document
        const updatedDriver = await db
          .collection("drivers")
          .findOne({ driverName: userName });

        if (updatedDriver) {
          res.status(200).json(updatedDriver);
        } else {
          res.status(404).json({ message: "Driver not found" });
        }
      } catch (error) {
        console.error("Error in driver analytics:", error);
        res
          .status(500)
          .json({ message: "An error occurred while processing your request" });
      }
    })();
  });
});

module.exports = router;
