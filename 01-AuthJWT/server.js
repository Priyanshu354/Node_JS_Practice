const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const { isLoggedIn } = require("./MiddleWear/auth");
const adminRoutes = require("./routes/admin");
const developerRoutes = require('./routes/developer');
const User = require("./models/User")

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connection to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB connected Successfully");
    } catch (error) {
        console.error("DB connection failed:", error);
    }
};
connectDB();

const port = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/developer", developerRoutes);

//_____________________________________________________________________________

// @route /api/check
// des check user is loggedIn or not
// @access public
app.get("/api/check", isLoggedIn, (req, res) => {
    res.send("You are verifed");
})

// @route /api/role-change
// des change role
// @access public
app.put("/api/role-change/:id", async (req, res) => {
    const { id } = req.params;

    if(!id){
        res.status(403).json("id is incorrect");
    }

    try {
        await User.findByIdAndUpdate(id, {role : "admin"});
        res.status(200).json({message: "Update Done"});
    } catch (error) {
        res.status(400).json({message : "updation failed"});   
    }
});


app.get("/", (req, res) => {
    res.send(`I am your server, Hii. Listening on PORT ${port}`);
});

app.listen(port, () => console.log(`Server is listening on PORT ${port}`));
