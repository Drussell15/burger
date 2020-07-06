const connection = require("../config/connection.js");

function createQmarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob) {
    let arr = [];
    //loop through keys and push key/vaules as string into array
    for (let key in ob) {
        const value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
};
//object for all sql statemetn functions:
const orm = {
    selectAll: function (tableInput, cb) {
        const queryString = "SELECT * FROM ??";

        connection.query(queryString, [tableInput], function (err, res) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";


        console.log(queryString);
        //insert into (a,b,c)values (?,?,?);
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    //update a value
    updateOne: function (table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;

        queryString += "SET";
        queryString += objToSql(objColVals);
        queryString += condition;


        console.log(queryString);
        connection.query(queryString, function (err, res) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
    );

//export object for model (burger.js)
module.exports = orm;