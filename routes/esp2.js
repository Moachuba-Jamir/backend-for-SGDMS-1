const express = require("express");
const router = express.Router();

// var esp1Readings = null;

router.get("/", (req, res) => {
  // Handle GET request to /messages
  if (esp1Readings) {
    res.json({
      Binid: "01",
      fillLevel: esp1Readings,
    });
  } else {
    res.json({
      message: "there are currently no data being sent from the Arduino",
    });
  }
});

// POST endpoint to send messages
router.post("/", (req, res) => {
  // Handle POST request to /messages
  const { id } = req.body;
  const { message } = req.body;
  console.log("From esp 2 :", message, id);
  res.json({ status: "From esp2 recieved!" });
});

module.exports = router;
