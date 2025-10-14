require('dotenv').config()

let express = require('express');
let app = express();

console.log("Hello World");

// GET - LOGGER
app.get((req, res, next) => {
    let string = req.method + " " + req.path + " " + req.ip;
    console.log(string);
    next();
});

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

// Main route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });

// GET JSON
app.get("/json", (req, res) => {
    const message =
        process.env.MESSAGE_STYLE === "uppercase"
        ? "HELLO JSON"
        : "Hello json";
    
    res.json({message});
});

 module.exports = app;
