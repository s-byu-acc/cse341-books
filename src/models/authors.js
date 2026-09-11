import { getDb } from '../db/connect.js';

const getAllAuthors = async () => {
  const db = getDb();
  const collection = db.collection('authors');
  const authors = await collection.find({}).toArray();

  return authors;
};

const getAuthorById = async (id) => {
  const db = getDb();
  const collection = db.collection('authors');
  const author = await collection.findOne({ id });

  return author;
};

const createAuthor = async (author) => {
  const db = getDb();
  const collection = db.collection('authors');

  const authorDocument = {
    id: author.id,
    name: author.name,
    birthYear: author.birthYear,
  };

  await collection.insertOne(authorDocument);

  return authorDocument;
};

const updateAuthor = async (id, author) => {
  const db = getDb();
  const collection = db.collection('authors');

  const updatedAuthor = {
    id,
    name: author.name,
    birthYear: author.birthYear,
  };

  const result = await collection.updateOne(
    { id },
    {
      $set: {
        name: updatedAuthor.name,
        birthYear: updatedAuthor.birthYear,
      },
    },
  );

  if (result.matchedCount === 0) {
    return null;
  }

  return updatedAuthor;
};

const deleteAuthor = async (id) => {
  const db = getDb();
  const collection = db.collection('authors');

  const result = await collection.deleteOne({ id });

  return result.deletedCount > 0;
};

const authorHasBooks = async (id) => {
  const db = getDb();
  const collection = db.collection('books');
  const booksCount = await collection.countDocuments({ authorId: id });

  return booksCount > 0;
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks,
};