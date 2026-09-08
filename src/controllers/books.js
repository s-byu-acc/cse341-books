import { getAllBooks, getBookById } from "../models/books.js";

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch(error) {
        console.log("Error in GET /books:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    };
};

const getBookByIdHandler = async (req, res) => {
    try {
        const requestedId = req.params.id
        const book = await getBookById(requestedId);
        
        if (book) {
            return res.status(200).json(book);
        } else {
            return res.status(404).json({ message: "Book not found" })
        }
    } catch(error) {
        console.log("GET /books/:id failed:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    };
};

export { getBooksHandler, getBookByIdHandler };