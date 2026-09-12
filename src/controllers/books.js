import {
  getAllBooks as getAllBooksFromDb,
  getBookById as getBookByIdFromDb,
  createBook as createBookInDb,
  updateBook as updateBookInDb,
  deleteBook as deleteBookFromDb,
} from '../models/books.js';

import { getAuthorById } from '../models/authors.js';

const getAllBooks = async (req, res) => {
  try {
    const books = await getAllBooksFromDb();

    return res.status(200).json(books);
  } catch (error) {
    console.error('Unable to retrieve books:', error);

    return res.status(500).json({
      message: 'Unable to retrieve books.',
    });
  }
};

const getBookById = async (req, res) => {
  const { id: requestedId } = req.params;

  try {
    const book = await getBookByIdFromDb(requestedId);

    if (!book) {
      return res.status(404).json({
        message: 'Book not found.',
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Unable to retrieve book:', error);

    return res.status(500).json({
      message: 'Unable to retrieve book.',
    });
  }
};

const createBook = async (req, res) => {
  const {
    id,
    authorId,
    title,
    publicationDate,
  } = req.body;

  if (!id || !authorId || !title || !publicationDate) {
    return res.status(400).json({
      message: 'The id, authorId, title, and publicationDate fields are required.',
    });
  }

  try {
    const existingBook = await getBookByIdFromDb(id);

    if (existingBook) {
      return res.status(400).json({
        message: 'A book with this id already exists.',
      });
    }

    const existingAuthor = await getAuthorById(authorId);

    if (!existingAuthor) {
      return res.status(400).json({
        message: 'The specified authorId does not match an existing author.',
      });
    }

    const book = await createBookInDb({
      id,
      authorId,
      title,
      publicationDate,
    });

    return res.status(201).json(book);
  } catch (error) {
    console.error('Unable to create book:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'A book with this id already exists.',
      });
    }

    return res.status(500).json({
      message: 'Unable to create book.',
    });
  }
};

const updateBook = async (req, res) => {
  const { id: requestedId } = req.params;
  const {
    authorId,
    title,
    publicationDate,
  } = req.body;

  if (!authorId || !title || !publicationDate) {
    return res.status(400).json({
      message: 'The authorId, title, and publicationDate fields are required.',
    });
  }

  try {
    const existingBook = await getBookByIdFromDb(requestedId);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found.',
      });
    }

    const existingAuthor = await getAuthorById(authorId);

    if (!existingAuthor) {
      return res.status(400).json({
        message: 'The specified authorId does not match an existing author.',
      });
    }

    const updatedBook = await updateBookInDb(requestedId, {
      authorId,
      title,
      publicationDate,
    });

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Unable to update book:', error);

    return res.status(500).json({
      message: 'Unable to update book.',
    });
  }
};

const deleteBook = async (req, res) => {
  const { id: requestedId } = req.params;

  try {
    const existingBook = await getBookByIdFromDb(requestedId);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found.',
      });
    }

    await deleteBookFromDb(requestedId);

    return res.status(204).send();
  } catch (error) {
    console.error('Unable to delete book:', error);

    return res.status(500).json({
      message: 'Unable to delete book.',
    });
  }
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};