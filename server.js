require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getDB, connectToDb } = require("./db.js");
const app = express();
const PORT = process.env.PORT || 3000;
// for db connection
var db;

// for storing bins data from mongo db
var bins = [];
var locations = [];
var drivers = [];
// Importing routes
const msgRouter1 = require("./routes/esp1");
const msgRouter2 = require("./routes/esp2");
const adminRouter = require("./routes/adminRoute");
const disConRouter = require("./routes/disconnect.js");
const updateDriver = require("./routes/updateDriver");
// const drivers = require("./routes/drivers.js");

//default end point
app.get("/", (req, res) => {
  res.json({ message: "Backend server's default route is working fine " });
});

// Middleware to parse JSON body
app.use(express.json());
app.use(cors());

// routes
app.use("/esp1", msgRouter1);
app.use("/esp2", msgRouter2);
app.use("/adminRoute", adminRouter);
app.use('/disconnect', disConRouter);
app.use('/updateDriver', updateDriver);
// app.use('/drivers', drivers);
// the bins endpoint for the dash board

connectToDb((err) => {
  if (!err) {
    // Start Listening if there's no db connection error
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
    // the db instance for CRUD actions
    db = getDB();
    // querying the database to get the list of bins
    db.collection("bins")
      .find()
      .forEach((bin) => {
        bins.push(bin);
      })
      .then(() => {
        console.log(bins);
      });
    
    db.collection('drivers').find().forEach((driver) => {
      drivers.push(driver)
    }).then(() => {
      console.log(drivers);
    })
  }
});

// send back the list of bins 
app.get("/bins", (req, res) => {
  res.status(200).json(bins);
});

app.get("/locations", (req, res) => {
  res.status(200).json(locations);
});

app.get('/drivers', (req, res) => {
  res.status(200).json(drivers);
})