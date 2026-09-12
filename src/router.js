import express from "express";

import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from './controllers/authors.js';

import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from './controllers/books.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Returns all books.
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A list of book objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: b1
 *                   authorId:
 *                     type: string
 *                     example: a1
 *                   title:
 *                     type: string
 *                     example: Pride and Prejudice
 *                   publicationDate:
 *                     type: string
 *                     example: 1813-01-28
 *       500:
 *         description: An unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unable to retrieve books.
 */
router.get('/books', getAllBooks);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book by id
 *     description: Returns one book by its custom id.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom id of the book.
 *         schema:
 *           type: string
 *         example: b1
 *     responses:
 *       200:
 *         description: The matching book object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: b1
 *                 authorId:
 *                   type: string
 *                   example: a1
 *                 title:
 *                   type: string
 *                   example: Pride and Prejudice
 *                 publicationDate:
 *                   type: string
 *                   example: 1813-01-28
 *       404:
 *         description: No book exists with the specified id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book not found.
 *       500:
 *         description: An unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unable to retrieve book.
 */
router.get('/books/:id', getBookById);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a book
 *     description: Creates a new book associated with an existing author.
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       description: The book to create.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *                 example: b4
 *               authorId:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: Example Book Title
 *               publicationDate:
 *                 type: string
 *                 example: 2026-01-15
 *           example:
 *             id: b4
 *             authorId: a1
 *             title: Example Book Title
 *             publicationDate: 2026-01-15
 *     responses:
 *       201:
 *         description: The newly created book object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: b4
 *                 authorId:
 *                   type: string
 *                   example: a1
 *                 title:
 *                   type: string
 *                   example: Example Book Title
 *                 publicationDate:
 *                   type: string
 *                   example: 2026-01-15
 *       400:
 *         description: A required field is missing, the id already exists, or the authorId is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The specified authorId does not match an existing author.
 *       500:
 *         description: An unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unable to create book.
 */
router.post('/books', createBook);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     description: Updates an existing book and associates it with an existing author.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom id of the book to update.
 *         schema:
 *           type: string
 *         example: b1
 *     requestBody:
 *       required: true
 *       description: The book fields to update.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *                 example: a2
 *               title:
 *                 type: string
 *                 example: Updated Book Title
 *               publicationDate:
 *                 type: string
 *                 example: 2026-02-20
 *           example:
 *             authorId: a2
 *             title: Updated Book Title
 *             publicationDate: 2026-02-20
 *     responses:
 *       200:
 *         description: The updated book object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: b1
 *                 authorId:
 *                   type: string
 *                   example: a2
 *                 title:
 *                   type: string
 *                   example: Updated Book Title
 *                 publicationDate:
 *                   type: string
 *                   example: 2026-02-20
 *       400:
 *         description: A required field is missing or the authorId is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The specified authorId does not match an existing author.
 *       404:
 *         description: No book exists with the specified id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book not found.
 *       500:
 *         description: An unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unable to update book.
 */
router.put('/books/:id', updateBook);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Deletes an existing book by its custom id.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom id of the book to delete.
 *         schema:
 *           type: string
 *         example: b1
 *     responses:
 *       204:
 *         description: Book deleted successfully. The response has no body.
 *       404:
 *         description: No book exists with the specified id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book not found.
 *       500:
 *         description: An unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unable to delete book.
 */
router.delete('/books/:id', deleteBook);

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     description: Returns all authors.
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of author objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: a1
 *                   name:
 *                     type: string
 *                     example: Jane Austen
 *                   birthYear:
 *                     type: integer
 *                     example: 1775
 *       500:
 *         description: An unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unable to retrieve authors.
 */
router.get('/authors', getAllAuthors);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by id
 *     description: Returns one author by custom id.
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom id of the author.
 *         schema:
 *           type: string
 *         example: a1
 *     responses:
 *       200:
 *         description: The matching author object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: a1
 *                 name:
 *                   type: string
 *                   example: Jane Austen
 *                 birthYear:
 *                   type: integer
 *                   example: 1775
 *       404:
 *         description: No author exists with the specified id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Author not found.
 *       500:
 *         description: An unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unable to retrieve author.
 */
router.get('/authors/:id', getAuthorById);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create an author
 *     description: Creates a new author using a custom id.
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       description: The author to create.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: a4
 *               name:
 *                 type: string
 *                 example: Example Author
 *               birthYear:
 *                 type: integer
 *                 example: 1980
 *           example:
 *             id: a4
 *             name: Example Author
 *             birthYear: 1980
 *     responses:
 *       201:
 *         description: The newly created author object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: a4
 *                 name:
 *                   type: string
 *                   example: Example Author
 *                 birthYear:
 *                   type: integer
 *                   example: 1980
 *       400:
 *         description: A required field is missing or the id already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An author with this id already exists.
 *       500:
 *         description: An unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unable to create author.
 */
router.post('/authors', createAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     description: Updates an existing author by custom id.
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom id of the author to update.
 *         schema:
 *           type: string
 *         example: a1
 *     requestBody:
 *       required: true
 *       description: The author fields to update.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Author
 *               birthYear:
 *                 type: integer
 *                 example: 1981
 *           example:
 *             name: Updated Author
 *             birthYear: 1981
 *     responses:
 *       200:
 *         description: The updated author object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: a1
 *                 name:
 *                   type: string
 *                   example: Updated Author
 *                 birthYear:
 *                   type: integer
 *                   example: 1981
 *       400:
 *         description: A required field is missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The name and birthYear fields are required.
 *       404:
 *         description: No author exists with the specified id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Author not found.
 *       500:
 *         description: An unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unable to update author.
 */
router.put('/authors/:id', updateAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     description: Deletes an author if no books reference the author.
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom id of the author to delete.
 *         schema:
 *           type: string
 *         example: a1
 *     responses:
 *       204:
 *         description: Author deleted successfully. The response has no body.
 *       404:
 *         description: No author exists with the specified id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Author not found.
 *       409:
 *         description: The author cannot be deleted because books still reference the author.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Author cannot be deleted while books still reference the author.
 *       500:
 *         description: An unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unable to delete author.
 */
router.delete('/authors/:id', deleteAuthor);

export default router;