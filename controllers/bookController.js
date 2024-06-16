const Book = require('../models/Book');
const { deleteFile } = require('../utils/fileHelper');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json({
            success: true,
            data: books,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        res.status(200).json({
            success: true,
            data: book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

exports.addBook = async (req, res) => {
    const { title, author, description, published_date } = req.body;

    try {
        const book = await Book.create({ title, author, description, published_date, image: req.file ? req.file.path : null });
        res.status(201).json({
            success: true,
            data: book,
        });
    } catch(error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        const { title, author, description, published_date } = req.body;
        const oldImage = book.image;
        if (oldImage) {
            deleteFile(oldImage);
        }
        const newImage = req.file ? req.file.path : null;
        await book.update({ title, author, description, published_date, image: newImage });
    
        
        
        res.status(200).json({
            success: true,
            data: book,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        if (book.image) {
            deleteFile(book.image);
        }

        await book.destroy();
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}