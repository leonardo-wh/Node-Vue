const express = require('express');
const autorController = require('../controllers/autorController');

const router = express.Router();

router.get('/', autorController.getAutores);
router.post('/', autorController.createAutor);
router.put('/:id', autorController.updateAutor);
router.delete('/:id', autorController.deleteAutor);

module.exports = router;