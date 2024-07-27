require('dotenv').config();
const { MongoClient } = require('mongodb')

var dbConnection; 

module.exports = {
    // connect to the mongodb database
    connectToDb: (cb) => {
        MongoClient.connect(process.env.URI)
            .then((client) => {
                dbConnection = client.db();
                console.log("Successfully connected to mongo db server" + client);
                // function to fire after database connection
                return cb();
            }).catch((err) => {
                console.warn(`Error connecting to the database: ${err}`)
                return cb(err);
            });
    },

    // fetch and retrieve data from the mongo db 
    getDB: () => {
        // return the database connection 
        return dbConnection;
    }

}
