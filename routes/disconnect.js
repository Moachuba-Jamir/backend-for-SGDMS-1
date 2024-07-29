const express = require("express");
const router = express.Router();

var disCon = ""; 
router.get('/', (req, res) => {
    res.status(200).json(disCon);
});

router.post('/', (req, res) => {
    const { disconnect } = req.body;
    disCon = disconnect;
    console.log(`The client has disconnected: ${disCon}`);
    res.json({ message: "Client disconnect recieved!" });

})



module.exports = router;