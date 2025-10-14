require('dotenv').config()

let express = require('express');
let app = express();

console.log("Hello World");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });

// Normal usage
//app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

// GET JSON
app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase"){
        res.send({message: "HELLO JSON"});
    }
    else {
        res.send({message: "Hello json"});
    }
});


 module.exports = app;
