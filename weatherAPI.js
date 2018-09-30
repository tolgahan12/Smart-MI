const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const apiKey = '2172aa60d30211ffecc970dbae0beca0';



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
  })

app.use(express.static(`${__dirname}/public`));
app.post('/',function (req,res) {
const city = 'melbourne';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);
  }
});
})

app.listen(3000,function (){
    console.log('listening on port 3000!')

})