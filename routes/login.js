const express = require("express");
const router = express.Router();
const { getDB, connectToDb } = require("../db.js");
const { connect } = require("./adminRoute");

var drivers = [];
var uniqueDrivers = [];

var myDrivers = [];
var myUniqueDrivers = [];
router.post("/", (req, res) => {
  const { username, password } = req.body;

  connectToDb((err) => {
    if (!err) {
      db = getDB();
      db.collection("drivers")
        .find()
        .toArray()
        .then((driverList) => {
          drivers.push(...driverList);
        });
      uniqueDrivers = drivers.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.id === value.id)
      );

      console.log(`log in drivers ${uniqueDrivers.length}`);
    }
  });
  // Check if the driver exists in the array
  const authenticatedDriver = uniqueDrivers.find(
    (driver) => username === driver.driverName && password === driver.pwd
  );

  if (authenticatedDriver) {
    res.status(200).json({ authenticatedDriver });
  } else {
    res.status(404).json({ message: "Error: Driver does not exist!" });
  }  
});

router.get("/", (req, res) => {
  // Check if the driver exists in the array
    connectToDb((err) => {
      if (!err) {
        db = getDB();
        db.collection("drivers")
          .find()
          .toArray()
          .then((driverList) => {
                myDrivers.push(...driverList);
       
          });
           myUniqueDrivers = myDrivers.filter(
             (value, index, self) =>
               index === self.findIndex((t) => t.id === value.id)
           );
      }
    });

    // send response back to the client 
    res.status(200).json(myUniqueDrivers)
});

module.exports = router;
