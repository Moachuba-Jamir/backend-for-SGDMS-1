const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000; // You can change this to any port you prefer

// Importing routes
const msgRouter1 = require('./routes/esp1');
const msgRouter2 = require('./routes/esp2');
const adminRouter = require('./routes/adminRoute');

//default end point
app.get("/", (req, res) => {
  res.json({ message: "Server is working fine! Hello from the server!" });
});

// Middleware to parse JSON body
app.use(express.json());
app.use(cors());

// routes 
app.use('/esp1', msgRouter1);
app.use('/esp2', msgRouter2);
app.use("/adminRoute", adminRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
