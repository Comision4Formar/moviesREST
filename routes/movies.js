var express = require('express');
var router = express.Router();

const {getAll,getById} = require('../controllers/apiMoviesController');

//api/movies
router.get('/', getAll);
router.get('/:id',getById);

module.exports = router;
