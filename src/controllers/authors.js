import {
  getAllAuthors as getAllAuthorsFromDb,
  getAuthorById as getAuthorByIdFromDb,
  createAuthor as createAuthorInDb,
  updateAuthor as updateAuthorInDb,
  deleteAuthor as deleteAuthorFromDb,
  authorHasBooks,
} from '../models/authors.js';

const getAllAuthors = async (req, res) => {
  try {
    const authors = await getAllAuthorsFromDb();
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve authors.' });
  }
};

const getAuthorById = async (req, res) => {
  const { id: requestedId } = req.params;

  try {
    const author = await getAuthorByIdFromDb(requestedId);

    if (!author) {
      return res.status(404).json({
        message: 'Author not found.',
      });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('Unable to retrieve author:', error);

    return res.status(500).json({
      message: 'Unable to retrieve author.',
    });
  }
};

const createAuthor = async (req, res) => {
  const { id, name, birthYear } = req.body;

  if (!id || !name || birthYear === undefined || birthYear === null) {
    return res.status(400).json({
      message: 'The id, name, and birthYear fields are required.',
    });
  }

  try {
    const existingAuthor = await getAuthorByIdFromDb(id);

    if (existingAuthor) {
      return res.status(400).json({
        message: 'An author with this id already exists.',
      });
    }

    const author = await createAuthorInDb({
      id,
      name,
      birthYear,
    });

    return res.status(201).json(author);
  } catch (error) {
    console.error('Unable to create author:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'An author with this id already exists.',
      });
    }

    return res.status(500).json({
      message: 'Unable to create author.',
    });
  }
};

const updateAuthor = async (req, res) => {
  const { id: requestedId } = req.params;
  const { name, birthYear } = req.body;

  if (!name || birthYear === undefined || birthYear === null) {
    return res.status(400).json({
      message: 'The name and birthYear fields are required.',
    });
  }

  try {
    const existingAuthor = await getAuthorByIdFromDb(requestedId);

    if (!existingAuthor) {
      return res.status(404).json({
        message: 'Author not found.',
      });
    }

    const updatedAuthor = await updateAuthorInDb(requestedId, {
      name,
      birthYear,
    });

    return res.status(200).json(updatedAuthor);
  } catch (error) {
    console.error('Unable to update author:', error);

    return res.status(500).json({
      message: 'Unable to update author.',
    });
  }
};

const deleteAuthor = async (req, res) => {
  const { id: requestedId } = req.params;

  try {
    const existingAuthor = await getAuthorByIdFromDb(requestedId);

    if (!existingAuthor) {
      return res.status(404).json({
        message: 'Author not found.',
      });
    }

    const hasBooks = await authorHasBooks(requestedId);

    if (hasBooks) {
      return res.status(409).json({
        message: 'Author cannot be deleted while books still reference the author.',
      });
    }

    await deleteAuthorFromDb(requestedId);

    return res.status(204).send();
  } catch (error) {
    console.error('Unable to delete author:', error);

    return res.status(500).json({
      message: 'Unable to delete author.',
    });
  }
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};