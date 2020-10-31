// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');
const port = 3000;


// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
// Callback to debug
app.listen(port, listening);
function listening() {
    console.log('running on localhost: ' + port);
}

// Callback function to complete GET '/all'
function getData(req, res) {
    console.log(projectData);
    res.send(projectData);
}

// Initialize all route with a callback function
app.get('/all', getData);

// Post Route
function postData(req, res) {
    projectData = req.body;
    console.log(projectData);
}

app.post('/addData', postData);