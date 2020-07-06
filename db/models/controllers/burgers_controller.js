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
//post data to api

router.post("/api/burgers", function (req, res) {
    // create the new object
    burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function (result) {
        console.log(`result: ${result}`);
        res.json({ id: result.insertId });
    });
});
//upate is good

router.put("/api/burger/:id", function (req, res) {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: true
    },
        condition, function (result) {
            if (result.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();
        });
});

// Export routes for server.js to use.
module.exports = router;