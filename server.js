require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getDB, connectToDb } = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;
// for db connection
var db;

// for storing bins data from mongo db
var bins = [];


// Importing routes
const msgRouter1 = require("./routes/esp1");
const msgRouter2 = require("./routes/esp2");
const adminRouter = require("./routes/adminRoute");

//default end point
app.get("/", (req, res) => {
  res.json({ message: "Server is working fine! Hello from the server!" });
});

// Middleware to parse JSON body
app.use(express.json());
app.use(cors());

// routes
app.use("/esp1", msgRouter1);
app.use("/esp2", msgRouter2);
app.use("/adminRoute", adminRouter);
// the bins endpoint for the dash board

connectToDb((err) => {
  if (!err) {
    // Start Listening if there's no db connection error
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
    // the db instance for CRUD actions
    db = getDB();
    db.collection('bins').find().forEach(bin => {
      bins.push(bin);
    }).then(() => {
       console.log(bins);
    }); 
 
  }
});

// creating an endpoint
app.get("/bins", (req, res) => {
  res.status(200).json(bins);

});
