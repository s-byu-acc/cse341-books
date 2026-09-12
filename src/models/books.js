import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  const db = getDb();
  const collection = db.collection('books');
  const books = await collection.find({}).toArray();

  return books;
};

const getBookById = async (id) => {
  const db = getDb();
  const collection = db.collection('books');
  const book = await collection.findOne({ id });

  return book;
};

const createBook = async (book) => {
  const db = getDb();
  const collection = db.collection('books');

  const bookDocument = {
    id: book.id,
    authorId: book.authorId,
    title: book.title,
    publicationDate: book.publicationDate,
  };

  await collection.insertOne(bookDocument);

  return bookDocument;
};

const updateBook = async (id, book) => {
  const db = getDb();
  const collection = db.collection('books');

  const updatedBook = {
    id,
    authorId: book.authorId,
    title: book.title,
    publicationDate: book.publicationDate,
  };

  const result = await collection.updateOne(
    { id },
    {
      $set: {
        authorId: updatedBook.authorId,
        title: updatedBook.title,
        publicationDate: updatedBook.publicationDate,
      },
    },
  );

  if (result.matchedCount === 0) {
    return null;
  }

  return updatedBook;
};

const deleteBook = async (id) => {
  const db = getDb();
  const collection = db.collection('books');

  const result = await collection.deleteOne({ id });

  return result.deletedCount > 0;
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};