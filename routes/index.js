var express = require('express');

var router = express.Router();

var arcgis = require('arcgis');
var ago = arcgis({token: 'mJtknwSbSAtfnnUNj8UNqhwMVFxrH5jH4zzX_jbCM2rDFfsEI0kVDpoLch_SU9KEGJJv1-qAmjcUprAVt2RJ7W_6YjwIxK6tLqye3BiP-EiqopWL8XgDL5qGdzhnIbc4NM-5RgM7_qA9igxkyQCumA..'});

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
