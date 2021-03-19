var express = require('express');
var router = express.Router();

const {getAll,getByPk} = require('../controllers/apiMoviesController');

//api/movies
router.get('/', getAll);
router.get('/:id',getByPk);

module.exports = router;
