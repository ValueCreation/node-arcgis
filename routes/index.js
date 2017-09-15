var express = require('express');
var request = require('request');

var router = express.Router();

var arcgis = require('arcgis');
var ago = arcgis({token: 'mJtknwSbSAtfnnUNj8UNqhwMVFxrH5jH4zzX_jbCM2rDFfsEI0kVDpoLch_SU9KEGJJv1-qAmjcUprAVt2RJ7W_6YjwIxK6tLqye3BiP-EiqopWL8XgDL5qGdzhnIbc4NM-5RgM7_qA9igxkyQCumA..'});

request.get({
  url: 'https://connpass.com/api/v1/event/',
  json: true,  
  qs: {
    "keyword": "python"
  }
}, function(error, response, body) {
  console.log(response.statusCode);
  if (!error && response.statusCode == 200) {
    console.log(response.statusCode);
    console.log(body.results_returned);
    console.log(body.events);
    
  }

});


var requestData = {
  "geometry" : { "x" : 139.737964100000, "y" : 35.66420310000 },
  "attributes" : {
      "event_id" : 508389,
      "lat" : 35.664203100000,
      "lon" : 139.737964100000
  }
};

var connpass = [];

connpass.push(requestData);
console.log(connpass);
/*
request.post({
  url: 'https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/connpass/FeatureServer/0/applyEdits',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  form: {
    'f': 'json',
    'adds': JSON.stringify(connpass)
  }
}, function(error, response, body) {
  //console.log(response);
  console.log(body);
});
*/

/*
request.post({
  url: 'https://www.arcgis.com/sharing/rest/oauth2/token/',
  json: true,
  form: {
    'f': 'json',
    'client_id': 'HVyR4xl6NDD3skKk',
    'client_secret': 'e8be35bb435741379ed969703d514f0d',
    'grant_type': 'client_credentials',
    'expiration': '1440'
  }
}, function(error, response, body) {
  console.log(body.access_token);
});
*/

/* GET home page. */
router.get('/', function(req, res, next) {

  var options = {
    queryString: 'owner:esri AND (type:"Feature Service")',
    num: 10
  };
  
  ago.search(options)
    .then(function(result) {
      console.log(result.results)
      res.render('index', { title: 'Node ArcGIS', featureService: result.results});
  });

});

router.get('/item/:id', function(req, res, next) {
  
  var itemId = req.params.id;
  
  ago.item(itemId)
    .then(function(item) {
      console.log(item)
      res.render('item', { title: 'Node ArcGIS', item: item });
  });
    
});

module.exports = router;
