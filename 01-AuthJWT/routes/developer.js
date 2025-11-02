const express = require("express");
const { isLoggedIn, authorizationRole } = require("../MiddleWear/auth");


const router = express.Router();


// @route api/developer
// @Desc Verify That I am developer
// @Access private
router.get("/", isLoggedIn, authorizationRole("developer"), (req, res) => {
    res.send("You are developer");
});


module.exports = router;