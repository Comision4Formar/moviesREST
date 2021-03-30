var express = require('express');
var router = express.Router();
const getUrl = (req) => req.protocol + '://' + req.get('host');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    title : 'apiMoviesREST',
    register : {
      endpoint : getUrl(req) + '/users/register',
      method : 'POST'
    },
    login : {
      endpoint : getUrl(req) + '/users/login',
      method : 'POST'
    },
    movies : {
      all : {
        endpoint : getUrl(req) + '/api/movies',
        method : 'GET'
      },
      one : {
        endpoint : getUrl(req) + '/api/movies/{id}',
        method : 'GET'
      },
      create : {
        endpoint : getUrl(req) + '/api/movies/create',
        method : 'POST',
        dataRequired : {
          title : 'string(500)',
          awards : 'integer UNSIGNED',
          rating : 'decimal(3,1) UNSIGNED',
          release_date : 'date'
        }
      },
      update : {
        endpoint : getUrl(req) + '/api/movies/update/{id}',
        method : 'PUT'
      }
    }
  })
});

module.exports = router;
