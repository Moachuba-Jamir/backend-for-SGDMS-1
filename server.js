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
var drivers = [];
// Importing routes
const msgRouter1 = require("./routes/esp1");
const msgRouter2 = require("./routes/esp2");
const adminRouter = require("./routes/adminRoute");
const updateDriver = require("./routes/updateDriver");
const login = require("./routes/login");
const esp3 = require("./routes/esp3.js");
const esp4 = require("./routes/esp4.js");
const esp5 = require("./routes/esp5.js");
const driverAnalytics = require('./routes/driverAnalytics.js');

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
app.use("/esp3", esp3);
app.use("/esp4", esp4);
app.use("/esp5", esp5);
app.use("/adminRoute", adminRouter);
app.use("/updateDriver", updateDriver);
app.use("/login", login);
app.use("/driverAnalytics", driverAnalytics);
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

    db.collection("drivers")
      .find().sort({id: 1})
      .forEach((driver) => {
        drivers.push(driver);
      })
      .then(() => {
        console.log(drivers);
      });
  }
});

app.post("/", async (req, res) => {
  try {
    await connectToDb();
    const db = getDB();

    // Clear the current arrays
    drivers.length = 0;
    bins.length = 0;

    // Query the database to get the list of bins
    const binsResult = await db.collection("bins").find().toArray();
    bins.push(...binsResult);

    // Query the database to get the list of drivers
    const driversResult = await db.collection("drivers").find().toArray();
    drivers.push(...driversResult);

    console.log("Data fetched successfully");
    console.log("Drivers:", drivers);

    res.status(200).json({ bins, drivers });
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).json({ error: "Error updating data" });
  }

});
// send back the list of bins
app.get("/bins", (req, res) => {
  res.status(200).json({ bins, drivers });
});

app.get("/locations", (req, res) => {
  res.status(200).json(locations);
});
