// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 3000;
//http://localhost:3000

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

// Initialize the main project folder
app.use(express.static("website"));

// Cors for cross origin allowance
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup Server
const server = app.listen(port, () =>
  console.log("Server is running on port", port)
);

app.post("/postData", (req, res) => {
  projectData = {
    temp: req.body.temperature,
    date: req.body.newDate,
    feel: req.body.feelings,
  };
  console.log(projectData);
  res.send(projectData);
});

app.get("/setData", (req, res) => {
  res.send(projectData);
});

//Notes
// projectData = {...req.body}

//Notes
//if key name and value name are same you can abbreviate them in on word
// {
// date : newDate,
// temp : temp,
// content : content,
// }
// magic!
// {
// date : newDate,
// temp,
// content
// }
