const express = require("express");

//create router
const router = express.Router();
//import model (burger.js) to use its db functions
const burger = require("../models/burger.js.js");

//create all routes and sets up logic within routes
router.get("/", function (req, res) {
    burger.all(function (data) {
        //get burger data
        const burgerObj = {
            burgers: data
        };
        console.log(burgerObj);

        //render burger object to index file
        res.render("index", burgerObj);
    });
});
router.post("/api/burger", function (req, res) {
    burger.create([
        "burger_name", "devoured"], [
        req.body.burger_name, req.body.devoured
    ], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});
router.put("/api/burger/:id", function (req, res) {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        burger_name: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
router.delete("/api/burger/:id", function (req, res) {
    const condition = "id = " + req.params.id;

    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;