const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

const fetchGetApi  = async (url) => {
    try {
        const apiResponse = await axios.get(url);
        return apiResponse.data;
    }
    catch (error) {
        console.log(`API error: ${error.response?.data?.message || error.message}`);
        throw new Error(`API error: ${error.response?.data?.message || error.message}`);
    }
}
//Set template
app.set('view engine', 'ejs');
//Serve public folder for CSS
app.use(express.static("public"));
//Parse req body
app.use(bodyParser.urlencoded());


app.get("/", async (req,res,next) => {
    res.render("index",{weather:null, error:null})
})

 
app.get("/weather",async (req,res,next) => {
    const apiKey = `baf6389b06620e9626487c5dbc695395`;
    const city = req.query.location;
    const apiURLGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    let error = null;
    let lat, lon;
    let weather;

    try {
        const geoResponse = await fetchGetApi(apiURLGeo);
        const [location] = geoResponse;
        lat = location.lat;
        lon = location.lon;

    } catch (apiError) {
        error = apiError;
    }

    let apiURLWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const weatherResponse = await fetchGetApi(apiURLWeather);
        weather = weatherResponse.weather[0];

    } catch (apiError) {
        error = apiError;
    }
    
    res.render("index", {weather, error, city});
})


console.log("Server Listening to Port 3000");
app.listen(3000);

