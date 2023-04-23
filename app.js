const express = require("express");
const app = express();
const https = require ("https");
const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));
app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/", function(req,res){
    const apiKey= "a1a0b155334a45d9500a89c7d1bd0780";
const query= req.body.cityName;
const units= "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&apikey="+apiKey+"&&units="+units;
https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        const weatherData= JSON.parse(data);
        console.log(weatherData.main.temp);
        const temp= weatherData.main.temp;
        const weatherDescription= weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        res.write("<h1>The temperature in "+query+" is "+temp+"degrees celcius.</h1>");
        res.write("<p>The weather is currently"+weatherDescription+".</p>");
        const imageUrl= "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
        res.write("<img src="+imageUrl+">");
        res.send();
    })

})
    
});




app.listen(3000,console.log("server started"));