const express = require("express");
const router = express.Router();
const { getDB, connectToDb } = require("../db.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();

router.use(cookieParser());


router.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true, //ensures the cookie cannot be accessed via Javascript
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    },
    proxy: true,
  })
);

let db;
var isLoggedOut = true;
// Middleware to ensure database connection
router.use((req, res, next) => {
  if (!db) {
    connectToDb((err) => {
      if (err) {
        return res.status(500).json({ message: "Database connection error" });
      }
      db = getDB();
      next();
    });
  } else {
    next();
  }
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  // console.log(`from ad
  try {
    //   since there is only one document in the collection
    const admin = await db.collection("admin").findOne({});

    if (admin) {
      if (admin.user == username && admin.password == password) {
        req.session.isAdmin = true;
        isLoggedOut = false;
        console.log("Admin logged in successfully");
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    console.log("admin logged out");
    isLoggedOut = true;
    res.json({ logout: true });
  });
});

// Check if logged out route
router.get("/checkLogout", (req, res) => {
  if (!req.session.isAdmin) {
    // If the session doesn't exist or is not an admin
    res.json({ logout: true, isLoggedOut });
  } else {
    res.json({ logout : false});
  }
});

module.exports = router;
