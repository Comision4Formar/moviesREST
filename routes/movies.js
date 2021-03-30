var express = require('express');
var router = express.Router();

const verifyToken = require('../middleware/verifyToken')

const {getAll,getById, create, update, remove} = require('../controllers/apiMoviesController');

//api/movies
router.get('/', getAll);
router.get('/:id',getById);
router.post('/create',verifyToken,create);
router.put('/update/:id',verifyToken,update);
router.delete('/delete/:id',verifyToken,remove);

module.exports = router;
