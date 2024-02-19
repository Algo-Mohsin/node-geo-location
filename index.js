var express = require('express')
const { lookup } = require('geoip-lite');
const router = express.Router();
var geoip = require('geoip-lite');

var app = express()
app.set('trust proxy', true);

app.set('port', (process.env.PORT || 2000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})
app.get('/get_country', function(req, res) {
  console.log('Headers: ' + JSON.stringify(req.headers));
  console.log('IP: ' + JSON.stringify(req.ip));

  var geo = geoip.lookup(req.ip);

  console.log("Browser: " + req.headers["user-agent"]);
  console.log("Language: " + req.headers["accept-language"]);
  console.log("Country: " + (geo ? geo.country: "Unknown"));
  console.log("Region: " + (geo ? geo.region: "Unknown"));

  console.log(geo);
  let objResponse={};
  objResponse.Status = "OK";
  objResponse.Browser = req.headers["user-agent"];
  objResponse.Language = req.headers["accept-language"];
  objResponse.Country = (geo ? geo.country: "Unknown");
  objResponse.Region = (geo ? geo.region: "Unknown");
  objResponse.Geo = geo;

  res.status(200);
  res.header("Content-Type",'application/json');
  res.end(JSON.stringify(objResponse));
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
