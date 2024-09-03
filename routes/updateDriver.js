const express = require("express");
const router = express.Router();
const { getDB, connectToDb } = require("../db.js");
const { get } = require("http");

var db;
var drivers = [];
var updatedDriver = [];
var bins = [];

router.post("/", (req, res) => {
  const { driverId, name, number } = req.body;

  connectToDb((err) => {
    if (err) {
      console.error("Database connection error:", err);
      return res.status(500).json({ message: "Database connection error" });
    }

    const db = getDB();
    (async () => {
      try {
        await db
          .collection("drivers")
          .find()
          .forEach((driver) => {
            // check if the driverId matches the id in the driver
            drivers.push(driver);
            if (driverId == driver._id) {
              var nameAndNum = { $set: { driverName: name, Phone: number } };
              db.collection("drivers").updateOne(
                { id: driverId },
                nameAndNum,
                {
                  returnDocument: "after",
                }
                // function (err, res) {
                //   if (err) {
                //     throw err;
                //   } else {
                //     console.log("1 document updated!");
                //     db.close();
                //   }
                // }
              );
              // update the driver name and phone no here.
            }
          })
          .then(() => {
            console.log(drivers);
          });
        
        updatedDriver = await db.collection("drivers").find().toArray();

        res.status(200).json({
        updatedDriver,
        });
      } catch (err) {
        console.log("Error ", err);
      }
    })();
  });
});

router.get('/', (req, res) => {
   connectToDb((err) => {
     if (err) {
       console.error("Database connection error:", err);
       return res.status(500).json({ message: "Database connection error" });
     }

     const db = getDB();
     (async () => {
       try {
         updatedDriver = await db.collection("drivers").find().toArray();
         bins = await db.collection('bins').find().toArray();
         res.status(200).json({
           bins,  updatedDriver
         });
       } catch (err) {
         console.log("Error ", err);
       }
     })();
   });
})


module.exports = router;
