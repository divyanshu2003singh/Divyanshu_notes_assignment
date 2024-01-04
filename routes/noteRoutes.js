// routes/noteRoutes.js
const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply the authentication middleware to all routes in this router
router.use(authMiddleware.authenticate);

router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.post('/:id/share', noteController.shareNote);
router.get('/search', noteController.searchNotes);

module.exports = router;
