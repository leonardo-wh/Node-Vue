const express = require('express');
const editorController = require('../controllers/editorController');

const router = express.Router();

router.get('/', editorController.getEditores);
router.post('/', editorController.createEditor);
router.put('/:id', editorController.updateEditor);
router.delete('/:id', editorController.deleteEditor);

module.exports = router;