let express = require('express');
let bodyParser = require('body-parser');
let app = express();
require('dotenv').config()

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
app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({ time: req.time });
});

// GET echo server
app.get("/:word/echo", (req, res) => {
    let param = req.params;
    res.json({ echo: param });
});

// GET name
app.get("/name", (req, res) => {
    let first = req.query.first;
    let last = req.query.last;
    res.json({ name: `${first} ${last}` });
});

// POST with body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/name", bodyParser.json());
app.post("name", (req, res) => {
    let name = req.body.first + " " + req.body.last;
    res.json({ name: `${first} ${last}` });
});

 module.exports = app;
