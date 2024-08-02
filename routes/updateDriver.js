const express = require("express");
const router = express.Router();
const { getDB, connectToDb } = require("../db.js");
const { get } = require("http");

var db;
var bins = [];
router.get("/", (req, res) => {
  const { id, name, number } = req.body;
  // after getting the values connect to the mongoDB
  db = getDB();

  connectToDb((err) => {
    
  })
    
})

module.exports = router;
