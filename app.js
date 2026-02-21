const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

//Set template
app.set('view engine', ejs);
//Serve public folder for CSS
app.use(express.static("public"));
//Parse req body
app.use(bodyParser.urlencoded());


console.log("Server Listening to Port 3000");
app.listen(3000);