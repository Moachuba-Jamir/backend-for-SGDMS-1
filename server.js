const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000; // You can change this to any port you prefer

// Importing routes
const msgRouter = require('./routes/eps1');
const adminRouter = require('./routes/adminRoute');

//default end point
app.get("/", (req, res) => {
  res.json({ message: "Server is working fine! Hello from the server!" });
});

// Middleware to parse JSON body
app.use(express.json());
app.use(cors());

// routes 
app.use('/esp1', msgRouter);
app.use("/adminRoute", adminRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
