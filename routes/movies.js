var express = require('express');
const { route } = require('.');
var router = express.Router();

const {getAll,getById, create, update, remove} = require('../controllers/apiMoviesController');

//api/movies
router.get('/', getAll);
router.get('/:id',getById);
router.post('/create',create);
router.put('/update/:id',update);
router.delete('/delete/:id',remove);

module.exports = router;
