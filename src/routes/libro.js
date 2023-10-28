const express = require('express');
const libroController = require('../controllers/libroController');

const router = express.Router();

router.get('/', libroController.getLibros);
router.post('/', libroController.createLibro);
router.put('/:id', libroController.updateLibro);
router.delete('/:id', libroController.deleteLibro);

module.exports = router;