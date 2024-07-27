require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { getDB, connectToDb } = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;

// Importing routes
const msgRouter1 = require('./routes/esp1');
const msgRouter2 = require('./routes/esp2');
const adminRouter = require('./routes/adminRoute');

//default end point
app.get("/", (req, res) => {
  res.json({ message: "Server is working fine! Hello from the server!" });
});

app.get("/bins", async (req, res) => {
  // forEach cursor method
//   let bins = [];
//  db.collection('bins').find().forEach(element => {
//  });
  
  // toArray method 
  let bins = await db.collection('bins').find().toArray();
  res.status(200).json(bins);
});

// Middleware to parse JSON body
app.use(express.json());
app.use(cors());

// routes 
app.use('/esp1', msgRouter1);
app.use('/esp2', msgRouter2);
app.use("/adminRoute", adminRouter);


// for db connection 
var db;
connectToDb((err) => {
  if (!err) {
    // Start Listening if there's no db connection error
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
    // the db instance for CRUD actions 
    db = getDB();
  }
});


