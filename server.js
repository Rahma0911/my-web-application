//require express
const express = require("express");

//require connecting to Database
const connectDB = require("./config/connectDB");

//instance app of all express method
const app = express();
require("dotenv").config();

//connect with Database
connectDB();

//middleware to read json type
app.use(express.json());

//middleware for the user routes
app.use("/api/user", require("./router/User"));

//middleware for the annonce routes
app.use("/api/annonce", require("./router/Annonce"));

//middleware for the comment routes
app.use("/api/comment", require("./router/Comment"));

//PORT
const PORT = process.env.PORT;

//Starting the server
app.listen(PORT, () => console.log("server is running on", PORT));