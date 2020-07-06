// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Requiring mysql package
const mysql = require("mysql");

// Setting up our connection information
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mysql.createConnection({
        source: "localhost",
        host: "localhost",
        port: 3306,
        user: "root",
        password: "calista21 ",
        database: "burgers_db"
    });
}


// Connecting to the database.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Exporting our connection
module.exports = connection;
