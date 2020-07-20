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
        source: "heroku",
        host: "k2fqe1if4c7uowsh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: 3306,
        user: "r28zs8s2zq5kjdws",
        password: "tz2mopvfi1k5069z",
        database: "ullv9aurpv16vhsw"
    });
};


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
