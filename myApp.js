require('dotenv').config()

let express = require('express');
let app = express();

console.log("Hello World");

// Logger route
app.use((req, res, next) => {
    console.log(req.method + " " +  req.path + " - " + req.ip);
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

// GET Time
app.get("/now", (req, res, next) => {
    req.time = newDate().toString();
    next();
}, (req, res) => {
    res.json(req.time);
});

 module.exports = app;
