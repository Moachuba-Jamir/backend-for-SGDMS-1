const express = require("express");
const router = express.Router();
const { getDB, connectToDb } = require("../db.js");
const { get } = require("http");

var db;
var drivers = [];

router.post("/", (req, res) => {
  const { driverId, name, number } = req.body;
  // after getting the values connect to the mongoDB
  console.log(`${driverId},  ${name} ,  ${number}}`);

  connectToDb((err) => {
    if (!err) {
      console.log("Connected to db from the updateDriver endpoint");
      db = getDB();
      db.collection("drivers")
        .find()
        .forEach((driver) => {
          // check if the driverId matches the id in the driver
          drivers.push(driver);
          if (driverId == driver._id) {
            var nameAndNum = { $set: { driverName: name, Phone: number } };
            db.collection('drivers').updateOne({}, nameAndNum, function (err, res) {
              if (err) {
                throw err; 
                
              } else {
                console.log("1 document updated!");
                db.close();
              }
            })
            // update the driver name and phone no here. 
          }
        })
        .then(() => {
          // for (let i = 0; i < bins[0].bins.length; i++) {
          //   if (bins[0].bins[i].driver[0] == driverId) {
          //     // let myDriverId = bins[0].bins[i].driver[0];
          //     // let id = myDriverId.toString();
          //     const filter = {};

          //     // Define the data to update
          //     const data = {
          //       $set: {
          //         "bins.$[bin].driver.$[driver].name": name,
          //         "bins.$[bin].driver.$[driver].phone": number,
          //       },
          //     };

          //     db.collection("bins").updateOne(
          //       filter,
          //       data,
          //       (err, collection) => {
          //         if (err) throw err;
          //         console.log("Record updated successfully");
          //         console.log(collection);
          //       }
          //     );
          //   }
          // }
          
          console.log(drivers);
        });
    }
  });
  res
    .status(200)
    .json({
      messge: "Sent name and phone number to the /updateDriver endpoint",
    });
});

module.exports = router;
