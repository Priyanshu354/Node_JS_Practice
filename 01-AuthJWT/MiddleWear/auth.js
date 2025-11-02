const jwt = require("jsonwebtoken");
const User = require("../models/User")

const isLoggedIn = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = await User.findById(verified._id).select("-password");

        if(!req.user){
            return res.status(401).json({ message: "user Not found" });
        }
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid Token" });
    }
};


// const isAdmin = async (req, res, next) => {
//     const authHeader = req.header("Authorization");
//     const token = authHeader.split(" ")[1];

//     try {
//         const verified = jwt.verify(token, process.env.SECRET_TOKEN);
//         const role = await User.findById(verified._id).select("role");

//         if(role !== "admin"){
//             return res.status(401).json({ message: "Access Denied" });
//         }
//         next();
//     } catch (error) {
//         return res.status(400).json({ message: "Invalid Token" });
//     }
// };


// const isDeveloper = async (req, res, next) => {
//     const authHeader = req.header('Authorization');
//     const token = authHeader.split(" ")[1];

//     try {
//         const verified = jwt.verify(token, process.env.SECRET_TOKEN);
//         const role = await User.findById(verified_id).select("role");

//         if(role !== "developer"){
//             return res.status(401).json({message : "Access Denied"});
//         }
//     } catch (error) {
//         return res.status(400).json({ message: "Invalid Token" });
//     }
// };

// Best way of doing this 
const authorizationRole = (role) => (req, res, next) => {
    if(!req.user){
        return res.status(401).json({message : "User not found"});
    }

    console.log(req.user);
    if(req.user.role !== role){
        return res.status(403).json({message : "Access Denied"});
    }

    next();
};

module.exports = {isLoggedIn, authorizationRole};