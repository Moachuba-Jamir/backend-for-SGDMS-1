const express = require("express");
const router = express.Router();
const { getDB, connectToDb } = require("../db.js");

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Update driver GET endpoint is working fine!" });
});

router.post("/", async (req, res) => {
  const { driverId, name, number } = req.body;

  // Validate the input
  if (!driverId || !name || !number) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Connect to the database
    const db = await new Promise((resolve, reject) => {
      connectToDb((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(getDB());
        }
      });
    });

    // Perform the update operation
    const result = await db.collection("drivers").updateOne(
      { _id: driverId }, // Assuming driverId is the _id here
      { $set: { driverName: name, Phone: number } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Driver not found or no changes made" });
    }

    console.log("1 document updated!");
    res.status(200).json({ message: "Driver updated successfully!" });
  } catch (err) {
    console.error("Error updating driver:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
