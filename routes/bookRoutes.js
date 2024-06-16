const express = require('express');
const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', protect, getAllBooks);
router.get('/:id', protect, getBookById);
router.post('/', protect, upload, addBook);
router.put('/:id', protect, upload, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
