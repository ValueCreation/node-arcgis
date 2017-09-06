var express = require('express');

var router = express.Router();

var arcgis = require('arcgis')
var ago = arcgis({token: 'DNmU7F14x-L1dBRn98z_e-lObJ2jpELB_7kGm5tPK7gGFizwIfd1ppLa9MQ7V_XZdexDh1X0SER8UmuvMDmvGLg2uwYvlxefoR3Xnd2Uua_bk7EZMHZuf60qOh7OmbCa'});

/* GET home page. */
router.get('/', function(req, res, next) {

  var options = {
    queryString: 'owner:kamiya AND (type:"Feature Service")',
    num: 10
  };
  
  ago.search(options)
    .then(function(result) {
      console.log(result.results)
      res.render('index', { title: 'ArcGIS', featureService: result.results});
  });

});

router.get('/item/:id', function(req, res, next) {
  
  var itemId = req.params.id;
  
  ago.item(itemId)
    .then(function(result) {
      console.log(result)
      res.render('item', { title: 'ArcGIS', item: result });
  });
    
});

module.exports = router;
