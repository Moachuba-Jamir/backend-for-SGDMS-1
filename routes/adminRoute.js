const express = require("express");
const router = express.Router();

var espData = {};
// var esp1Readings = null;

router.get("/", (req, res) => {
  // Handle GET request to /messages
    res.json(espData);
});

// POST endpoint to send messages
router.post("/", (req, res) => {
    const { id, message } = req.body;
    // check if the Id already exists 
    if (espData[id]) {
        espData[id].message = message;
        console.log(`readings updated : ${espData[id]}`);
    } else {
        // add the new Id with the message
        espData[id] = message;
        console.log(`New esp added : ${id}`);
    }
  // Handle POST request to /admin Route
  res.json({ status: "recieved by the admin route" });
});

module.exports = router;
