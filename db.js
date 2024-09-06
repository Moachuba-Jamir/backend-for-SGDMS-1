// require("dotenv").config();
// const { MongoClient } = require("mongodb");
// var dbConnection;

// module.exports = {
//   // connect to the mongodb database
//   connectToDb: (cb) => {
//     MongoClient.connect(process.env.URI)
//       .then((client) => {
//         dbConnection = client.db("sgdms");
//         console.log("Successfully connected to mongo db server");
//         // function to fire after database connection
//         return cb();
//       })
//       .catch((err) => {
//         console.warn(`Error connecting to the database: ${err}`);
//       });
//   },

//   // fetch and retrieve data from the mongo db
//   getDB: () => {
//     // return the database connection
//     return dbConnection;
//   },
// };


const { MongoClient } = require("mongodb");
require("dotenv").config();

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(process.env.MONGODB_URI)
      .then((client) => {
        dbConnection = client.db("sgdms");
        console.log("Successfully connected to mongo db server");
        if (typeof cb === "function") {
          cb();
        }
      })
      .catch((err) => {
        console.warn(`Error connecting to the database: ${err}`);
        if (typeof cb === "function") {
          cb(err);
        }
      });
  },

  getDB: () => dbConnection,
};
