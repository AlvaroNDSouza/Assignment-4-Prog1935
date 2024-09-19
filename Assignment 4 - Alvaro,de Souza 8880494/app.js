// Import packages
require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const appRouter = require("./routes/appRouter");

// Connect to the database
const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error.message);
  });

// Create an express web app
const app = express();
const port = 27015;


// Set up static folder, body parser,  view engine
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes

app.use("/", appRouter);

// Run the web app
app.listen(port, () => {
  console.log(`App http://localhost:${port}`);
});
