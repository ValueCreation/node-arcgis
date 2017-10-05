var express = require('express');
var request = require('request');
var connpass = require("connpass");

var router = express.Router();

var arcgis = require('arcgis');
var ago = arcgis({token: 'mJtknwSbSAtfnnUNj8UNqhwMVFxrH5jH4zzX_jbCM2rDFfsEI0kVDpoLch_SU9KEGJJv1-qAmjcUprAVt2RJ7W_6YjwIxK6tLqye3BiP-EiqopWL8XgDL5qGdzhnIbc4NM-5RgM7_qA9igxkyQCumA..'});

var keywords = ['Ruby', 'PHP', 'Java', 'C#', 'Python', 'JavaScript'];

// Ruby
// PHP
// Java
// C#
// Python
// JavaScript
// 

delArcGISOnline(keywords);

function delArcGISOnline(keywords) {

  keywords.forEach(function(val, index, ar) {
    
    console.log(val);
    var where = "keyword='" + val + "'";
    console.log(where);
    request.post({
      url: 'https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/connpass/FeatureServer/0/deleteFeatures',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      form: {
        'f': 'json',
        'where': "keyword='" + val + "'" 
      }
    }, function(error, response, body) {
      console.log(body);
    });
    
  });

};


var keywordCnt = 0;

var _featureServiceUrl = 'https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/connpass/FeatureServer/0';

var keywords = ['Ruby', 'PHP', 'Java', 'C#', 'Python', 'JavaScript'];

// Ruby
// PHP
// Java
// C#
// Python
// JavaScript
// 

var keywordCnt = 0;
var ary_connpass;  

console.log(keywords.length);
getConnpassData(keywords[0]);

function getConnpassData(keyword) {
  
  ary_connpass = [];

  var options = {
    "keyword" : keyword,
    "keyword" : "東京",
    "count": "100"
  };

  connpass.get(options).then((events) => {
    events.events.forEach(function(val, index, ar) {
      if (val.lon != null && val.lat != null) {
        var requestData = {
          "geometry" : { "x" : val.lon, "y" : val.lat, "spatialReference" : {"wkid" : 4326} },
          "attributes" : {
            "event_id" : val.event_id,
            "title" : val.title,
            "catch" : val.catch,
            "event_url" : val.event_url,
            //"description" : val.description,
            "hash_tag" : val.hash_tag,
            "started_at" : val.started_at,
            "ended_at" : val.ended_at,
            "limit" : val.limit,
            "address" : val.address,
            "place" : val.place,
            "accepted": val.accepted,
            "waiting": val.waiting,
            "keyword" : keyword,
            "lat" :  val.lat,
            "lon" :  val.lon
          }
        };
        
        if (keywordCnt > 0) {
          getFeatureService(requestData);
        } else { 
          ary_connpass.push(requestData);
        }
      }
    });
    
    console.log(ary_connpass);
    addArcGISOnline(ary_connpass);

  }).catch((error)=>{
    console.log(error);
  });  
};


function addArcGISOnline(ary_connpass) {
  
  //console.log(ary_connpass);

  request.post({
    url: 'https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/connpass/FeatureServer/0/applyEdits',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    form: {
      'f': 'json',
      'adds': JSON.stringify(ary_connpass)
    }
  }, function(error, response, body) {
    //console.log(response);
    //console.log(body);
    keywordCnt++;   
    if (keywordCnt < keywords.length) {
      console.log(keywords[keywordCnt]);
      getConnpassData(keywords[keywordCnt]);
    };

  });


}


//getFeatureService();

function getFeatureService(requestData) {

  console.log(requestData.attributes.event_id);
  request.get({
    url: _featureServiceUrl + "/query",
    json: true,  
    qs: {
      "f": "json",
      "outFields" : "*",
      "where": "event_id = " + requestData.attributes.event_id
    }
  }, function(error, response, body) {
    console.log("end ++++++++++++++");

    if (body) {
      if (body.features) {
        if (body.features.length > 0) {
          //console.log(body.features);      
          for (var i = 0; i < body.features.length; i++) {
            //ary_connpass.push(requestData);
            updateArcGISOnline(requestData);
          }
        } else {
          console.log("aaaaaaaaaaaaaaaa");
          ary_connpass.push(requestData);
          console.log(ary_connpass);
        }
      }
    }
  });
}

function updateArcGISOnline(features) {
  
  request.post({
    url: 'https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/connpass/FeatureServer/0/applyEdits',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    form: {
      'f': 'json',
      'updates': JSON.stringify(features)
    }
  }, function(error, response, body) {
    //console.log(response);
    //console.log(body);

  });

}






/*
var keywords = ['Ruby', 'PHP', 'Java', 'C#', 'Python', 'JavaScript'];

// Ruby
// PHP
// Java
// C#
// Python
// JavaScript
// 

delArcGISOnline(keywords);

function delArcGISOnline(keywords) {

  keywords.forEach(function(val, index, ar) {
    
    console.log(val);
    var where = "keyword='" + val + "'";
    console.log(where);
    request.post({
      url: 'https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/connpass/FeatureServer/0/deleteFeatures',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      form: {
        'f': 'json',
        'where': "keyword='" + val + "'" 
      }
    }, function(error, response, body) {
      console.log(body);
    });
    
  });

};

var keywordCnt = 0;

console.log(keywords.length);
getConnpassData(keywords[0]);

function getConnpassData(keyword) {
  
  var ary_connpass = [];  

  var options = {
    "keyword" : keyword,
    "keyword" : "東京",
    "count": "100"
  };

  connpass.get(options).then((events) => {
    console.log(events.results_returned);
    console.log(events.events); 
    events.events.forEach(function(val, index, ar) {
      if (val.lon != null && val.lat != null) {
        var requestData = {
          "geometry" : { "x" : val.lon, "y" : val.lat, "spatialReference" : {"wkid" : 4326} },
          "attributes" : {
            "event_id" : val.event_id,
            "title" : val.title,
            "catch" : val.catch,
            "event_url" : val.event_url,
            //"description" : val.description,
            "hash_tag" : val.hash_tag,
            "started_at" : val.started_at,
            "ended_at" : val.ended_at,
            "limit" : val.limit,
            "address" : val.address,
            "place" : val.place,
            "accepted": val.accepted,
            "waiting": val.waiting,
            "keyword" : keyword,
            "lat" :  val.lat,
            "lon" :  val.lon
          }
        };
        ary_connpass.push(requestData);
      }
    });
    
    //console.log(ary_connpass);
    addArcGISOnline(ary_connpass);

  }).catch((error)=>{
    console.log(error);
  });  
};

function addArcGISOnline(ary_connpass) {
    
  request.post({
    url: 'https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/connpass/FeatureServer/0/applyEdits',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    form: {
      'f': 'json',
      'adds': JSON.stringify(ary_connpass)
    }
  }, function(error, response, body) {
    //console.log(response);
    console.log(body);
    keywordCnt++;   
    if (keywordCnt < keywords.length) {
      getConnpassData(keywords[keywordCnt]);
    };

  });

}

/*

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
/*
router.get('/connpass', function(req, res, next) {

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

    res.send('respond with a resource');
});
*/
module.exports = router;
