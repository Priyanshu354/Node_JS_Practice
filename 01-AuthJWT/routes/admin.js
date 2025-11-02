const express = require("express");
const { isLoggedIn, authorizationRole } = require("../MiddleWear/auth");
const { model } = require("mongoose");

const router = express.Router();


// @route api/admin
// @Desc Verify That I am admin
// @Access private
router.get("/", isLoggedIn, authorizationRole("admin"), (req, res) => {
    res.send("You are admin");
});

module.exports = router;