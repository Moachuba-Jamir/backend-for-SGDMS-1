const express = require("express");
const router = express.Router();

var espData = {};
router.get("/", (req, res) => {
  // Check if espData is empty or not
  if (Object.keys(espData).length === 0) {
    // If espData is empty, send 20
    res.status(200).json({message: 99});
  } else {
    // If espData has readings, send the data
    res.status(200).json(espData);
  }
});
router.post("/", (req, res) => {
  const { id = "binId", message = "BinReadings" } = req.body;
  // check if the Id already exists

  if (espData[id]) {
    // Update the existing ID with new readings
    espData[id].push(message);
    console.log(`Readings updated for ${id}: ${message}`);
    if (espData[id].length > 1) {
      espData[id].shift(); // Remove the oldest reading
    }
  } else {
    // Add a new ID with the message-
    espData[id] = [message]; // Initialize with an array containing the first message
    console.log(`New ESP added: ${id}`);
  }
  // Handle POST request to /admin Route
  res.json({ status: "recieved by the esp1" });
});


module.exports = router;
